import React, { useState, useEffect } from 'react';
import ServerBadge from '../components/ServerBadge';
import ErrorBox from '../components/ErrorBox';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [serverName, setServerName] = useState('Loading...');
  const [taskInput, setTaskInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearError = () => setErrorMessage('');
  const showError = (msg) => setErrorMessage(msg);

  const loadTasks = async () => {
    clearError();
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();

      const taskList = Array.isArray(data) ? data : data.tasks || [];
      setTasks(taskList);
      if (data.serverName) {
        setServerName(data.serverName);
      } else {
        setServerName(null);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      showError('Failed to load tasks from backend.');
      setServerName(null);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (updatedTasks) => {
    const response = await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tasks: updatedTasks }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  };

  const handleAddTask = async (e) => {
    if (e) e.preventDefault();
    clearError();
    const text = taskInput.trim();
    if (!text) return;

    const updatedTasks = [...tasks, text];

    try {
      const result = await saveTasks(updatedTasks);
      if (result && result.serverName) {
        setServerName(result.serverName);
      }
      setTasks(updatedTasks);
      setTaskInput('');
    } catch (error) {
      console.error('Backend error: Record not added.', error);
      showError('Failed to add task: Backend server error or unreachable.');
    }
  };

  const handleRemoveTask = async (indexToRemove) => {
    clearError();
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);

    try {
      const result = await saveTasks(updatedTasks);
      if (result && result.serverName) {
        setServerName(result.serverName);
      }
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Backend error: Record not removed.', error);
      showError('Failed to remove task: Backend server error or unreachable.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl space-y-6">
      {/* Header & Server Port Info */}
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">📚 Course Tasks</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            PM2 Backend Request Tracker
          </p>
        </div>
        <ServerBadge serverName={serverName} />
      </div>

      <ErrorBox message={errorMessage} />

      {/* Task Input Form */}
      <form onSubmit={handleAddTask} className="space-y-3">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="New task (e.g. Grade ASB2 assignments)"
          className="border border-slate-600 bg-slate-900 text-white p-3 w-full rounded-xl focus:outline-none focus:border-indigo-500 placeholder-slate-500 text-sm"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-semibold w-full transition shadow-lg shadow-indigo-600/30 text-sm active:scale-[0.99]"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border-l-4 border-indigo-500 border-t border-r border-b border-slate-700/60 shadow-sm text-sm"
          >
            <span className="text-slate-100 font-medium">{task}</span>
            <button
              onClick={() => handleRemoveTask(index)}
              className="text-red-400 hover:text-red-300 text-xs font-medium px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition"
            >
              Done
            </button>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="text-center py-6 text-slate-500 text-sm italic bg-slate-900/40 rounded-xl border border-dashed border-slate-700/50">
            No active course tasks. Add one above!
          </li>
        )}
      </ul>
    </div>
  );
}
