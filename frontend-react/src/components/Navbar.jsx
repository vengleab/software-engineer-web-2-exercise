import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav class="max-w-md mx-auto mb-6 bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2 flex justify-around shadow-lg">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex-1 text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition ${
            isActive
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`
        }
      >
        📚 Course Tasks
      </NavLink>
      <NavLink
        to="/server-info"
        className={({ isActive }) =>
          `flex-1 text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition ${
            isActive
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`
        }
      >
        ⚙️ Server Info
      </NavLink>
    </nav>
  );
}
