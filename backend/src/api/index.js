const express = require('express');
const router = express.Router();

// In-memory variable for tasks
let tasks = [];

// Get server port details
router.get('/port', (req, res) => {
    const port = process.env.PORT || req.socket.localPort || 3000;
    res.json({
        port: Number(port),
        message: `Server responding on port ${port}`,
        timestamp: new Date().toISOString()
    });
});

router.get('/server-port', (req, res) => {
    const port = process.env.PORT || req.socket.localPort || 3000;
    res.json({ port: Number(port) });
});

// Get all tasks
router.get('/tasks', (req, res) => {
    const port = process.env.PORT || req.socket.localPort || 3000;
    res.json({
        tasks,
        port: Number(port)
    });
});

// Update all tasks
router.put('/tasks', (req, res) => {
    const port = process.env.PORT || req.socket.localPort || 3000;
    if (Array.isArray(req.body.tasks)) {
        tasks = req.body.tasks;
        res.json({ message: 'Tasks updated successfully', tasks, port: Number(port) });
    } else {
        res.status(400).json({ error: 'Invalid tasks format', port: Number(port) });
    }
});

module.exports = router;

