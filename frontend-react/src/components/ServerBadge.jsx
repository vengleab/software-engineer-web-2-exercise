import React from 'react';

export default function ServerBadge({ serverName }) {
  const isAvailable = Boolean(serverName);

  return (
    <div className="bg-slate-900 border border-indigo-500/30 px-3 py-2 rounded-xl text-right">
      <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
        Server Name
      </span>
      <span
        className={`text-lg font-mono font-bold ${
          isAvailable ? 'text-emerald-400' : 'text-amber-400'
        }`}
      >
        {serverName || 'Unavailable'}
      </span>
    </div>
  );
}
