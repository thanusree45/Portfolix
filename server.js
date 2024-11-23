const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

require("dotenv").config();

/* MongoDB connection */
const dbConfig = require("./config/dbConfig");

/* Routes */
const portfolioRoute = require("./routes/portfolioRoute");

app.use( cors()); // Apply CORS middleware
app.use(express.json());

/* API Routes */
app.use("/api/portfolio", portfolioRoute);

// Serve static files from the React app
const clientBuildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(clientBuildPath));

// Catch-all route to serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
