import React, { useState } from 'react';

export default function Disaster() {
  const [status, setStatus] = useState("System operational");

  const triggerDisaster = async (action: string) => {
    setStatus(`Executing disaster scenario: ${action}...`);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiUrl}/api/simulation/disaster/${action}`, { method: 'POST' });
      const data = await res.json();
      setStatus(data.status);
    } catch (e) {
      setStatus("Failed to communicate with API server.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Disaster Simulation</h1>
        <p className="text-slate-400 mt-2">Trigger simulated network degradation events to observe the response pipeline.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-white mb-4">Command Center Status</h2>
        <div className="p-4 bg-slate-900 rounded-md border border-slate-800 font-mono text-sm text-emerald-400">
          &gt; {status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-red-500 transition-colors">
          <div className="text-red-500 mb-3"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></div>
          <h3 className="text-lg font-medium text-white mb-2">Severe Latency Spike</h3>
          <p className="text-sm text-slate-400 mb-4">Simulates a sudden backhaul routing failure causing 150-400ms latency delays across all nodes.</p>
          <button onClick={() => triggerDisaster('latency_spike')} className="px-4 py-2 bg-red-950 text-red-500 hover:bg-red-900 border border-red-800 rounded-md text-sm font-medium transition-colors w-full">Execute Event</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-amber-500 transition-colors">
          <div className="text-amber-500 mb-3"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="m14 14-4 4-4-4"/></svg></div>
          <h3 className="text-lg font-medium text-white mb-2">Packet Drop Storm</h3>
          <p className="text-sm text-slate-400 mb-4">Simulates severe physical interference dropping 25-60% of all IoT telemetry packets at the edge gateway.</p>
          <button onClick={() => triggerDisaster('packet_drop')} className="px-4 py-2 bg-amber-950 text-amber-500 hover:bg-amber-900 border border-amber-800 rounded-md text-sm font-medium transition-colors w-full">Execute Event</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-purple-500 transition-colors">
          <div className="text-purple-500 mb-3"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
          <h3 className="text-lg font-medium text-white mb-2">DDoS Bandwidth Flood</h3>
          <p className="text-sm text-slate-400 mb-4">Simulates a compromised edge device flooding the network, choking throughput and latency.</p>
          <button onClick={() => triggerDisaster('ddos')} className="px-4 py-2 bg-purple-950 text-purple-500 hover:bg-purple-900 border border-purple-800 rounded-md text-sm font-medium transition-colors w-full">Execute Event</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-emerald-500 transition-colors">
          <div className="text-emerald-500 mb-3"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          <h3 className="text-lg font-medium text-white mb-2">Normalize Network (Recover)</h3>
          <p className="text-sm text-slate-400 mb-4">Clears all disaster conditions and returns the simulated edge environment to optimal baseline thresholds.</p>
          <button onClick={() => triggerDisaster('clear')} className="px-4 py-2 bg-emerald-950 text-emerald-500 hover:bg-emerald-900 border border-emerald-800 rounded-md text-sm font-medium transition-colors w-full">Execute Recovery</button>
        </div>
      </div>
    </div>
  );
}
