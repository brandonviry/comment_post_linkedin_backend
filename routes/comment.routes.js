const express = require('express');
const { generateComment } = require('../services/openrouter.service');

const router = express.Router();

router.post('/generate-comment', async (req, res, next) => {
  try {
    const { text, imageUrls, apiKey } = req.body;
    const result = await generateComment(text, imageUrls, apiKey);
    res.json(result);
  } catch (error) {
    next(error); // Pass errors to the centralized error handler
  }
});

module.exports = router;
