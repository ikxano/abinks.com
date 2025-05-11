require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, './')));

// API endpoint to securely provide the Google Script URL
app.get('/api/config', (req, res) => {
  res.json({
    formSubmitUrl: process.env.GOOGLE_SCRIPT_URL
  });
});

// Route all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 