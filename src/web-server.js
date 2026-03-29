const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
// Serve the parent directory where index.html is located
app.use(express.static(path.join(__dirname, '..')));

// In-memory variable for tasks
let tasks = [];

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Update all tasks
app.put('/api/tasks', (req, res) => {
    if (Array.isArray(req.body.tasks)) {
        tasks = req.body.tasks;
        res.json({ message: 'Tasks updated successfully', tasks });
    } else {
        res.status(400).json({ error: 'Invalid tasks format' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
