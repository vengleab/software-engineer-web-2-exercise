# PM2 Management Guide

This document explains how to run, monitor, and stop the 3 backend services using **PM2** process manager.

---

## 🚀 Quick Start Commands

### 1. Start Services

To start all 3 backend services (running on ports **3001**, **3002**, and **3003**):

```bash
# Using PM2 directly from root directory
pm2 start ecosystem.config.js
```

Or using `npm` from the `backend` directory:
```bash
cd backend
npm run pm2:start
```

---

### 2. Stop Services

To stop all running services:

```bash
# Stop all services configured in ecosystem.config.js
pm2 stop ecosystem.config.js

# Or stop all PM2 processes
pm2 stop all
```

Or using `npm` from the `backend` directory:
```bash
cd backend
npm run pm2:stop
```

---

## 📊 Status & Monitoring

### Check Process Status
To list all active PM2 services and their status (online, CPU, memory):
```bash
pm2 status
# OR
pm2 list
```

Or via npm:
```bash
cd backend
npm run pm2:status
```

### View Real-Time Logs
To view real-time logs for all services:
```bash
pm2 logs
```

To view logs for a specific service (e.g. port 3001):
```bash
pm2 logs backend-service-3001
```

To flush/clear log files:
```bash
pm2 flush
```

---

## 🔄 Restart & Delete Services

### Restart Services
To restart all 3 services:
```bash
pm2 restart ecosystem.config.js
```

Or using npm:
```bash
cd backend
npm run pm2:restart
```

### Delete / Remove Services from PM2 List
To stop and remove the processes from PM2:
```bash
pm2 delete ecosystem.config.js
# OR
pm2 delete all
```

---

## ⚙️ Configuration Details

The PM2 ecosystem file is located at [`ecosystem.config.js`](./ecosystem.config.js):

- **backend-service-3001**: Running on `http://localhost:3001`
- **backend-service-3002**: Running on `http://localhost:3002`
- **backend-service-3003**: Running on `http://localhost:3003`

Each backend instance serves the API endpoint `/api/port` which returns the specific server port executing the request.
