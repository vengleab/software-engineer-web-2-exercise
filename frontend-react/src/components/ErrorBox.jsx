import React from 'react';

export default function ErrorBox({ message }) {
  if (!message) return null;
  return (
    <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-xl text-sm transition animate-fadeIn">
      {message}
    </div>
  );
}
