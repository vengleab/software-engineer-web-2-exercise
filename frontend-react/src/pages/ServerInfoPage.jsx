import React, { useState, useEffect } from 'react';
import ErrorBox from '../components/ErrorBox';

export default function ServerInfoPage() {
  const [serverInfo, setServerInfo] = useState(null);
  const [taskCount, setTaskCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchServerDetails = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      // Fetch server port details
      const portRes = await fetch('/api/port');
      if (!portRes.ok) throw new Error(`HTTP error ${portRes.status}`);
      const portData = await portRes.json();
      setServerInfo(portData);

      // Fetch task count
      const tasksRes = await fetch('/api/tasks');
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        const list = Array.isArray(tasksData) ? tasksData : tasksData.tasks || [];
        setTaskCount(list.length);
      }
    } catch (err) {
      console.error('Failed to fetch server info:', err);
      setErrorMessage('Unable to connect to backend server at /api/port.');
      setServerInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServerDetails();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl space-y-6">
      {/* Header */}
      <div className="border-b border-slate-700 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">⚙️ Server Diagnostics</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Backend Port & PM2 Cluster Monitoring
          </p>
        </div>
        <button
          onClick={fetchServerDetails}
          className="text-xs font-semibold px-3 py-1.5 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white rounded-xl transition"
        >
          {loading ? 'Pinging...' : '🔄 Refresh'}
        </button>
      </div>

      <ErrorBox message={errorMessage} />

      {/* Info Card Grid */}
      <div className="space-y-4">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 space-y-3">
          <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
            <span className="text-slate-400">Connection Status</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded text-xs ${
                serverInfo
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              {serverInfo ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
            <span className="text-slate-400">Server Instance</span>
            <span className="font-mono text-emerald-400 font-bold">
              {serverInfo?.serverName || serverInfo?.server || 'N/A'}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
            <span className="text-slate-400">Target Port</span>
            <span className="font-mono text-indigo-300 font-bold">
              {serverInfo?.port || 'N/A'}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
            <span className="text-slate-400">Active Course Tasks</span>
            <span className="font-mono text-amber-400 font-bold">
              {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Last Response</span>
            <span className="text-xs text-slate-300 font-mono">
              {serverInfo?.timestamp
                ? new Date(serverInfo.timestamp).toLocaleTimeString()
                : 'N/A'}
            </span>
          </div>
        </div>

        {serverInfo?.message && (
          <div className="p-3 bg-indigo-950/40 border border-indigo-500/20 text-indigo-200 text-xs rounded-xl font-mono">
            💬 {serverInfo.message}
          </div>
        )}
      </div>
    </div>
  );
}
