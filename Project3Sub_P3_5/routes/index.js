const express = require('express');
const router = express.Router();

// Import the POST route handler
const postHandler = require('../controllers/postHandler');

// POST endpoint
router.post('/', postHandler);

module.exports = router;
