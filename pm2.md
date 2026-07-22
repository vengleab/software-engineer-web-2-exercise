# PM2 Management Guide

This document explains how to run, monitor, and stop the 3 backend services using **PM2** process manager, and configure Nginx upstream load balancing.

---

## 🚀 Quick Start Commands

### 1. Start Services

To start all 3 backend services (running on ports **3000**, **3001**, and **3002**):

```bash
cd backend
npm run pm2:start
# OR
pm2 start ecosystem.config.js
```

---

### 2. Stop Services

To stop all running services:

```bash
cd backend
npm run pm2:stop
# OR
pm2 stop ecosystem.config.js
```

---

## 📊 Status & Monitoring

### Check Process Status
```bash
cd backend
npm run pm2:status
# OR
pm2 status
```

### View Real-Time Logs
```bash
pm2 logs
```

---

## ⚙️ Configuration File

The single PM2 ecosystem configuration is located in the backend directory:
- [`backend/ecosystem.config.js`](./backend/ecosystem.config.js)

---

## 🌐 Nginx Upstream Configuration

Add the 3 PM2 backend ports (**3000**, **3001**, **3002**) to your Nginx configuration (`/etc/nginx/sites-available/web2-exercise.conf`):

```nginx
upstream pm2_backend_cluster {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    listen 82;

    root /var/www/html/web-se/frontend;
    index index.html;

    location /api {
        proxy_pass http://pm2_backend_cluster;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
