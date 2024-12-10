const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const Record = require('./models/Record'); // Import the Record model
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/express-mongodb', { useNewUrlParser: true, useUnifiedTopology: true });

// POST endpoint to handle incoming data
app.post('/', async (req, res) => {
  try {
    const content = req.body.content;
    
    // Return content
    res.json({ content });
    
    // Write content to file
    fs.writeFileSync('data.txt', content);
    
    // Save record to MongoDB
    const record = new Record(req.body);
    await record.save();
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
