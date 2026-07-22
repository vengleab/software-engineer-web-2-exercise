const express = require('express');
const router = express.Router();

// In-memory variable for tasks
let tasks = [];

// Get all tasks
router.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update all tasks
router.put('/tasks', (req, res) => {
    if (Array.isArray(req.body.tasks)) {
        tasks = req.body.tasks;
        res.json({ message: 'Tasks updated successfully', tasks });
    } else {
        res.status(400).json({ error: 'Invalid tasks format' });
    }
});

module.exports = router;
