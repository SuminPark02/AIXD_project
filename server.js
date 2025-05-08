const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the public directory
app.use(express.static('public'));

// Serve the model files
app.use('/api/model', express.static(path.join(__dirname, 'model')));

// API endpoint to get model info
app.get('/api/model/info', (req, res) => {
  res.json({
    name: 'job-matching-model',
    version: '1.0.0',
    inputShape: [10],
    outputShape: [1]
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 