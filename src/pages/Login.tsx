import React, { useEffect, useState } from 'react';

export default function Login() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    fetch(`${apiUrl}/api/auth/discord/url`)
      .then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(console.error);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="flex flex-col items-center bg-neutral-900 border border-neutral-800 rounded-lg p-10 max-w-sm w-full text-center shadow-xl">
        <img src="/logo.png" alt="Edge AI Logo" className="w-24 h-24 mb-6 object-contain" style={{ filter: 'invert(1) hue-rotate(180deg)', mixBlendMode: 'screen' }} />
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-slate-400 mb-8 text-sm">Authenticate to access the Network Operations Center.</p>
        
        {url ? (
          <a href={url} className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-medium transition-colors flex items-center justify-center gap-3">
            <svg width="24" height="24" viewBox="0 0 127.14 96.36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M107.7 8.07A105.15 105.15 0 0081.47 0a72.06 72.06 0 00-3.36 6.83 97.68 97.68 0 00-29.08 0 72.37 72.37 0 00-3.36-6.83 105.15 105.15 0 00-26.23 8.07C3.55 31.89-1.58 55.06.4 78.02a105.73 105.73 0 0032.15 16.15 77.7 77.7 0 006.89-11.11 68.42 68.42 0 01-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0064.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 01-10.87 5.19 77 77 0 006.89 11.1 105.25 105.25 0 0032.19-16.14c2.2-25.07-3.83-47.53-28.74-69.96zM42.68 64.92c-5.7 0-10.37-5.23-10.37-11.64s4.58-11.65 10.37-11.65c5.8 0 10.45 5.27 10.37 11.65 0 6.41-4.58 11.64-10.37 11.64zm41.77 0c-5.7 0-10.37-5.23-10.37-11.64s4.58-11.65 10.37-11.65c5.8 0 10.45 5.27 10.37 11.65 0 6.41-4.57 11.64-10.37 11.64z"/>
            </svg>
            Login with Discord
          </a>
        ) : (
          <div className="w-full py-3 px-4 bg-neutral-800 text-slate-400 rounded-md font-medium flex justify-center items-center">
            <span className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
          </div>
        )}
      </div>
    </div>
  );
}
