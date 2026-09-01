import React, { useEffect, useState } from 'react';

export default function AuthCallback() {
  const [error, setError] = useState('');
  const hasFetched = React.useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (!code) {
      setError('No authorization code found.');
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    
    fetch(`${apiUrl}/api/auth/discord/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    .then(res => {
      if (!res.ok) throw new Error('Authentication failed');
      return res.json();
    })
    .then(data => {
      if (data.token) {
        localStorage.setItem('edge_auth_token', data.token);
        window.location.href = '/';
      }
    })
    .catch(err => setError(err.message));
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="text-center">
        {error ? (
          <div className="text-red-500 mb-4 font-medium">{error}</div>
        ) : (
          <>
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Authenticating...</p>
          </>
        )}
        {error && <a href="/" className="text-indigo-500 hover:underline text-sm">Return to Login</a>}
      </div>
    </div>
  );
}
