const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const apiRouter = require('./api');

app.use(cors());
app.use(express.json());
// Serve the parent directory where index.html is located

// Mount API router
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
