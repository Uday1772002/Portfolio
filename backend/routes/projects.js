const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET /api/projects - Get all projects
router.get("/", async (req, res) => {
  try {
    const {
      category,
      status,
      technology,
      featured,
      limit = 20,
      page = 1,
    } = req.query;

    let query = { isPublic: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by technology
    if (technology) {
      query.technologies = { $regex: technology, $options: "i" };
    }

    // Filter by featured
    if (featured === "true") {
      query.isFeatured = true;
    }

    const projects = await Project.find(query)
      .sort({ priority: -1, completionDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      count: projects.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      projects,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch projects",
      message: error.message,
    });
  }
});

// GET /api/projects/featured - Get featured projects
router.get("/featured", async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    const projects = await Project.find({ isFeatured: true, isPublic: true })
      .sort({ priority: -1, completionDate: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch featured projects",
      message: error.message,
    });
  }
});

// GET /api/projects/categories - Get all project categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Project.distinct("category", { isPublic: true });
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch categories",
      message: error.message,
    });
  }
});

// GET /api/projects/technologies - Get all technologies used
router.get("/technologies", async (req, res) => {
  try {
    const technologies = await Project.distinct("technologies", {
      isPublic: true,
    });
    res.json({
      success: true,
      technologies,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch technologies",
      message: error.message,
    });
  }
});

// GET /api/projects/:id - Get project by ID
router.get("/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        error: "Project not found",
        message: `Project with ID ${projectId} does not exist`,
      });
    }

    // Increment view count
    await project.incrementViews();

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch project",
      message: error.message,
    });
  }
});

// GET /api/projects/stats - Get project statistics
router.get("/stats", async (req, res) => {
  try {
    const stats = await Project.getStats();
    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch project statistics",
      message: error.message,
    });
  }
});

// POST /api/projects - Create new project (Admin only)
router.post("/", async (req, res) => {
  try {
    const projectData = req.body;

    // Validate required fields
    if (!projectData.title || !projectData.description || !projectData.image) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Title, description, and image are required",
      });
    }

    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create project",
      message: error.message,
    });
  }
});

// PUT /api/projects/:id - Update project (Admin only)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({
        error: "Project not found",
        message: "Project does not exist",
      });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update project",
      message: error.message,
    });
  }
});

// DELETE /api/projects/:id - Delete project (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        error: "Project not found",
        message: "Project does not exist",
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete project",
      message: error.message,
    });
  }
});

// POST /api/projects/:id/like - Like a project
router.post("/:id/like", async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        error: "Project not found",
        message: "Project does not exist",
      });
    }

    await project.toggleLike();

    res.json({
      success: true,
      message: "Project liked successfully",
      likes: project.likes,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to like project",
      message: error.message,
    });
  }
});

module.exports = router;
