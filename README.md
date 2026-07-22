# Nginx Exercise

Configure Nginx to serve the frontend and proxy API requests to the backend:

1. Serve the frontend static files on `http://localhost:82`.
   - The frontend files are located at `/home/ubuntu/Desktop/openclaw-demo/frontend`.
2. Reverse proxy requests from `http://localhost:82/api` to the backend.
   - The backend runs on `http://localhost:3000`.

---

## How to Run Locally

### 1. Run the Backend Server
Navigate to the `backend` directory, install dependencies, and start the server:
```bash
cd backend
npm install
npm start
```

### 2. Open Frontend in Browser
Simply open the `frontend/index.html` file directly in your web browser (e.g. double-click the file).
