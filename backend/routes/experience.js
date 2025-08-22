const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// GET /api/experience - Get all work experiences
router.get('/', async (req, res) => {
  try {
    const { company, position, technology, current, limit = 20, page = 1 } = req.query;
    
    let query = { isPublic: true };
    
    // Filter by company
    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }
    
    // Filter by position
    if (position) {
      query.position = { $regex: position, $options: 'i' };
    }
    
    // Filter by technology
    if (technology) {
      query.technologies = { $regex: technology, $options: 'i' };
    }
    
    // Filter by current positions
    if (current === 'true') {
      query['duration.isCurrent'] = true;
    }
    
    const experiences = await Experience.find(query)
      .sort({ priority: -1, 'duration.startDate': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Experience.countDocuments(query);
    
    res.json({
      success: true,
      count: experiences.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      experiences
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch experiences',
      message: error.message
    });
  }
});

// GET /api/experience/:id - Get experience by ID
router.get('/:id', async (req, res) => {
  try {
    const experienceId = req.params.id;
    const experience = await Experience.findById(experienceId);
    
    if (!experience) {
      return res.status(404).json({
        error: 'Experience not found',
        message: `Experience with ID ${experienceId} does not exist`
      });
    }
    
    res.json({
      success: true,
      experience
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch experience',
      message: error.message
    });
  }
});

// GET /api/experience/companies - Get all companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await Experience.aggregate([
      { $match: { isPublic: true } },
      {
        $group: {
          _id: '$company',
          positions: { $addToSet: '$position' },
          totalExperiences: { $sum: 1 }
        }
      },
      {
        $project: {
          company: '$_id',
          positions: 1,
          totalExperiences: 1,
          _id: 0
        }
      },
      { $sort: { company: 1 } }
    ]);
    
    res.json({
      success: true,
      companies
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch companies',
      message: error.message
    });
  }
});

// GET /api/experience/technologies - Get all technologies used
router.get('/technologies', async (req, res) => {
  try {
    const technologies = await Experience.distinct('technologies', { isPublic: true });
    res.json({
      success: true,
      technologies
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch technologies',
      message: error.message
    });
  }
});

// GET /api/experience/summary - Get experience summary
router.get('/summary', async (req, res) => {
  try {
    const stats = await Experience.getStats();
    res.json({
      success: true,
      summary: stats
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch experience summary',
      message: error.message
    });
  }
});

// GET /api/experience/current - Get current positions
router.get('/current', async (req, res) => {
  try {
    const experiences = await Experience.getCurrentPositions();
    res.json({
      success: true,
      count: experiences.length,
      experiences
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch current positions',
      message: error.message
    });
  }
});

// GET /api/experience/by-company/:company - Get experiences by company
router.get('/by-company/:company', async (req, res) => {
  try {
    const { company } = req.params;
    const experiences = await Experience.getByCompany(company);
    
    res.json({
      success: true,
      company,
      count: experiences.length,
      experiences
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch experiences by company',
      message: error.message
    });
  }
});

// POST /api/experience - Create new experience (Admin only)
router.post('/', async (req, res) => {
  try {
    const experienceData = req.body;
    
    // Validate required fields
    if (!experienceData.company || !experienceData.position || !experienceData.duration?.startDate) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Company, position, and start date are required'
      });
    }
    
    const experience = new Experience(experienceData);
    await experience.save();
    
    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      experience
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create experience',
      message: error.message
    });
  }
});

// PUT /api/experience/:id - Update experience (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const experience = await Experience.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!experience) {
      return res.status(404).json({
        error: 'Experience not found',
        message: 'Experience does not exist'
      });
    }
    
    res.json({
      success: true,
      message: 'Experience updated successfully',
      experience
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update experience',
      message: error.message
    });
  }
});

// DELETE /api/experience/:id - Delete experience (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findByIdAndDelete(id);
    
    if (!experience) {
      return res.status(404).json({
        error: 'Experience not found',
        message: 'Experience does not exist'
      });
    }
    
    res.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete experience',
      message: error.message
    });
  }
});

module.exports = router;
