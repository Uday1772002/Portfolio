const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },
    image: {
      type: String,
      required: [true, "Project image is required"],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [30, "Tag cannot exceed 30 characters"],
      },
    ],
    technologies: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Technology name cannot exceed 50 characters"],
      },
    ],
    features: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Feature description cannot exceed 200 characters"],
      },
    ],
    liveUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },
    githubUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },
    status: {
      type: String,
      enum: ["planning", "in-progress", "completed", "on-hold", "archived"],
      default: "completed",
    },
    category: {
      type: String,
      required: [true, "Project category is required"],
      enum: [
        "Web Application",
        "Mobile Application",
        "Desktop Application",
        "API",
        "Library",
        "Tool",
        "Game",
        "Educational Platform",
        "HRMS System",
        "Social Platform",
        "Other",
      ],
      default: "Other",
    },
    priority: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    startDate: {
      type: Date,
    },
    completionDate: {
      type: Date,
    },
    estimatedHours: {
      type: Number,
      min: 0,
    },
    actualHours: {
      type: Number,
      min: 0,
    },
    challenges: [
      {
        type: String,
        trim: true,
        maxlength: [300, "Challenge description cannot exceed 300 characters"],
      },
    ],
    solutions: [
      {
        type: String,
        trim: true,
        maxlength: [300, "Solution description cannot exceed 300 characters"],
      },
    ],
    metrics: {
      usersReached: Number,
      performanceImprovement: String,
      costReduction: String,
      efficiencyGain: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for project duration
projectSchema.virtual("duration").get(function () {
  if (this.startDate && this.completionDate) {
    const diffTime = Math.abs(this.completionDate - this.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return null;
});

// Virtual for project status color
projectSchema.virtual("statusColor").get(function () {
  const statusColors = {
    planning: "blue",
    "in-progress": "yellow",
    completed: "green",
    "on-hold": "orange",
    archived: "gray",
  };
  return statusColors[this.status] || "gray";
});

// Indexes for better query performance
projectSchema.index({ title: "text", description: "text", tags: "text" });
projectSchema.index({ status: 1, isFeatured: 1, priority: -1 });
projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ completionDate: -1 });

// Pre-save middleware
projectSchema.pre("save", function (next) {
  // Generate short description if not provided
  if (!this.shortDescription && this.description) {
    this.shortDescription =
      this.description.substring(0, 200) +
      (this.description.length > 200 ? "..." : "");
  }
  next();
});

// Static method to get project statistics
projectSchema.statics.getStats = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalProjects: { $sum: 1 },
        completedProjects: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
        },
        inProgressProjects: {
          $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] },
        },
        featuredProjects: {
          $sum: { $cond: ["$isFeatured", 1, 0] },
        },
        totalViews: { $sum: "$views" },
        totalLikes: { $sum: "$likes" },
      },
    },
  ]);

  return (
    stats[0] || {
      totalProjects: 0,
      completedProjects: 0,
      inProgressProjects: 0,
      featuredProjects: 0,
      totalViews: 0,
      totalLikes: 0,
    }
  );
};

// Static method to get projects by category
projectSchema.statics.getByCategory = async function (category) {
  return this.find({ category, isPublic: true }).sort({
    priority: -1,
    completionDate: -1,
  });
};

// Static method to get featured projects
projectSchema.statics.getFeatured = async function (limit = 6) {
  return this.find({ isFeatured: true, isPublic: true })
    .sort({ priority: -1, completionDate: -1 })
    .limit(limit);
};

// Instance method to increment views
projectSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

// Instance method to toggle like
projectSchema.methods.toggleLike = function () {
  this.likes += 1;
  return this.save();
};

module.exports = mongoose.model("Project", projectSchema);
