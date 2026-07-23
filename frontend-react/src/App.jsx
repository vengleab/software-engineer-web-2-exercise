import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TasksPage from './pages/TasksPage';
import ServerInfoPage from './pages/ServerInfoPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="p-4 sm:p-10 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/server-info" element={<ServerInfoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
