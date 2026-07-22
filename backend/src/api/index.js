const express = require('express');
const router = express.Router();

// In-memory variable for tasks
let tasks = [];

// Get server port & name details
router.get('/port', (req, res) => {
    const port = process.env.PORT || req.socket.localPort || 3000;
    const serverName = `Server-${port}`;
    res.json({
        port: Number(port),
        serverName,
        server: serverName,
        message: `Request served by ${serverName}`,
        timestamp: new Date().toISOString()
    });
});

router.get('/server-port', (req, res) => {
    const port = process.env.PORT || req.socket.localPort || 3000;
    const serverName = `Server-${port}`;
    res.json({ port: Number(port), serverName, server: serverName });
});

// Get all tasks
router.get('/tasks', (req, res) => {
    const port = process.env.PORT || req.socket.localPort || 3000;
    const serverName = `Server-${port}`;
    res.json({
        tasks,
        port: Number(port),
        serverName,
        server: serverName
    });
});

// Update all tasks
router.put('/tasks', (req, res) => {
    const port = process.env.PORT || req.socket.localPort || 3000;
    const serverName = `Server-${port}`;
    if (Array.isArray(req.body.tasks)) {
        tasks = req.body.tasks;
        res.json({ message: 'Tasks updated successfully', tasks, port: Number(port), serverName, server: serverName });
    } else {
        res.status(400).json({ error: 'Invalid tasks format', port: Number(port), serverName, server: serverName });
    }
});

module.exports = router;


