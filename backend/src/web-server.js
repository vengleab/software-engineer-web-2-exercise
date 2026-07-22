const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const apiRouter = require('./api');

app.use(cors());
app.use(express.json());

// Serve static frontend files so each backend port can also serve the web UI directly
app.use(express.static(path.join(__dirname, '../../frontend')));

// Mount API router
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

