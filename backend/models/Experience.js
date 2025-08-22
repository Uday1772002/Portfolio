const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  position: {
    type: String,
    required: [true, 'Position title is required'],
    trim: true,
    maxlength: [100, 'Position title cannot exceed 100 characters']
  },
  duration: {
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date
    },
    isCurrent: {
      type: Boolean,
      default: false
    }
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  workType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
    default: 'Full-time'
  },
  achievements: [{
    type: String,
    required: [true, 'Achievement description is required'],
    trim: true,
    maxlength: [500, 'Achievement description cannot exceed 500 characters']
  }],
  technologies: [{
    type: String,
    trim: true,
    maxlength: [50, 'Technology name cannot exceed 50 characters']
  }],
  companyDescription: {
    type: String,
    trim: true,
    maxlength: [500, 'Company description cannot exceed 500 characters']
  },
  impact: {
    userEngagement: String,
    dailyConversations: String,
    platformAdoption: String,
    releaseCycles: String,
    operationalEfficiency: String,
    responseTime: String,
    cloudCosts: String,
    postDeploymentDefects: String,
    studentsReached: String,
    solutionsProcessed: String,
    learningTimeReduction: String,
    accuracyTracking: String
  },
  highlights: [{
    type: String,
    trim: true,
    maxlength: [200, 'Highlight description cannot exceed 200 characters']
  }],
  responsibilities: [{
    type: String,
    trim: true,
    maxlength: [300, 'Responsibility description cannot exceed 300 characters']
  }],
  teamSize: {
    type: Number,
    min: 1
  },
  projectBudget: {
    type: Number,
    min: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  skills: [{
    type: String,
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    expiryDate: Date,
    isExpired: Boolean
  }],
  references: [{
    name: String,
    position: String,
    email: String,
    phone: String,
    relationship: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted duration
experienceSchema.virtual('formattedDuration').get(function() {
  if (this.duration.isCurrent) {
    return `${this.formatDate(this.duration.startDate)} - Present`;
  }
  if (this.duration.endDate) {
    return `${this.formatDate(this.duration.startDate)} - ${this.formatDate(this.duration.endDate)}`;
  }
  return this.formatDate(this.duration.startDate);
});

// Virtual for duration in months
experienceSchema.virtual('durationMonths').get(function() {
  const endDate = this.duration.isCurrent ? new Date() : this.duration.endDate;
  if (!endDate) return null;
  
  const startDate = this.duration.startDate;
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                 (endDate.getMonth() - startDate.getMonth());
  return Math.max(0, months);
});

// Virtual for duration in years
experienceSchema.virtual('durationYears').get(function() {
  const months = this.durationMonths;
  if (months === null) return null;
  return (months / 12).toFixed(1);
});

// Helper method to format date
experienceSchema.methods.formatDate = function(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
};

// Indexes for better query performance
experienceSchema.index({ company: 1, 'duration.startDate': -1 });
experienceSchema.index({ position: 1, 'duration.startDate': -1 });
experienceSchema.index({ technologies: 1 });
experienceSchema.index({ isPublic: 1, priority: -1 });
experienceSchema.index({ 'duration.isCurrent': 1, 'duration.startDate': -1 });

// Pre-save middleware
experienceSchema.pre('save', function(next) {
  // Set isCurrent to true if no end date
  if (!this.duration.endDate) {
    this.duration.isCurrent = true;
  }
  
  // Check if certifications are expired
  if (this.certifications) {
    this.certifications.forEach(cert => {
      if (cert.expiryDate) {
        cert.isExpired = new Date() > cert.expiryDate;
      }
    });
  }
  
  next();
});

// Static method to get experience statistics
experienceSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalExperiences: { $sum: 1 },
        currentPositions: {
          $sum: { $cond: ['$duration.isCurrent', 1, 0] }
        },
        totalTechnologies: {
          $addToSet: '$technologies'
        },
        totalSkills: {
          $addToSet: '$skills'
        },
        averageDuration: {
          $avg: {
            $cond: [
              '$duration.isCurrent',
              { $divide: [{ $subtract: [new Date(), '$duration.startDate'] }, 1000 * 60 * 60 * 24 * 30] },
              { $divide: [{ $subtract: ['$duration.endDate', '$duration.startDate'] }, 1000 * 60 * 60 * 24 * 30] }
            ]
          }
        }
      }
    }
  ]);
  
  if (stats[0]) {
    stats[0].totalTechnologies = [...new Set(stats[0].totalTechnologies.flat())].length;
    stats[0].totalSkills = [...new Set(stats[0].totalSkills.flat())].length;
    stats[0].averageDuration = Math.round(stats[0].averageDuration);
  }
  
  return stats[0] || {
    totalExperiences: 0,
    currentPositions: 0,
    totalTechnologies: 0,
    totalSkills: 0,
    averageDuration: 0
  };
};

// Static method to get current positions
experienceSchema.statics.getCurrentPositions = async function() {
  return this.find({ 'duration.isCurrent': true, isPublic: true })
    .sort({ priority: -1, 'duration.startDate': -1 });
};

// Static method to get experience by company
experienceSchema.statics.getByCompany = async function(company) {
  return this.find({ 
    company: { $regex: company, $options: 'i' }, 
    isPublic: true 
  }).sort({ 'duration.startDate': -1 });
};

// Instance method to calculate total impact
experienceSchema.methods.getTotalImpact = function() {
  const impact = this.impact || {};
  return Object.values(impact).filter(value => value).length;
};

module.exports = mongoose.model('Experience', experienceSchema);
