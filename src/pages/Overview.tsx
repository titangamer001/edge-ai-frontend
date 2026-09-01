import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Activity, Server, AlertTriangle, CloudOff } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Overview() {
  const { telemetry, history, alerts } = useAppContext();
  
  const nodes = Object.values(telemetry);
  const total = nodes.length;
  const proxyNodes = nodes.filter(n => n.proxy_mode);
  const online = nodes.filter(n => n.health_score !== undefined && n.health_score > 20).length;
  
  const avgLatency = total ? nodes.reduce((a, b) => a + b.latency, 0) / total : 0;
  const avgLoss = total ? nodes.reduce((a, b) => a + b.packet_loss, 0) / total : 0;
  
  const activeAlerts = alerts.filter(a => a.severity === 'critical' || a.severity === 'high').length;

  const chartData = useMemo(() => {
    // Group history by 5 second intervals to show trend
    const map = new Map();
    history.forEach(h => {
      const time = new Date(h.timestamp * 1000).toLocaleTimeString();
      if (!map.has(time)) map.set(time, { time, latency: 0, count: 0 });
      const entry = map.get(time);
      entry.latency += h.latency;
      entry.count += 1;
    });
    return Array.from(map.values()).map(v => ({ time: v.time, avgLatency: v.latency / v.count })).slice(-20);
  }, [history]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-white">Platform Overview</h1>
          <p className="text-slate-400 mt-1">Real-time edge infrastructure status</p>
        </div>
      </div>

      {/* Edge AI Intervention Banner */}
      {proxyNodes.length > 0 && (
        <div className="bg-amber-950/50 border border-amber-500/50 p-4 rounded-lg flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className="animate-pulse bg-amber-500/20 p-2 rounded-full">
              <Server className="text-amber-500" size={24} />
            </div>
            <div>
              <h3 className="text-amber-500 font-bold text-lg">EDGE AI INTERVENTION ACTIVE</h3>
              <p className="text-slate-300 text-sm">IoT Node failure detected via P2P Mesh. Edge AI is actively recovering and transferring historical data from the Database to the User.</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-amber-500/70 font-mono mb-1">DATA TRANSFER ROUTE</span>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              [DB] <span className="text-amber-500">→</span> [EDGE AI PROXY] <span className="text-amber-500">→</span> [USER DASHBOARD]
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Active IoT Devices</p>
            <p className="text-3xl font-bold text-white tabular-nums">{online - proxyNodes.length} <span className="text-base font-normal text-slate-500">/ {total || 8}</span></p>
          </div>
          <div className="p-3 bg-blue-900 rounded-lg text-blue-400"><Activity size={24} /></div>
        </div>

        <div className={`bg-neutral-900 border p-5 rounded-lg flex items-start justify-between ${proxyNodes.length > 0 ? 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-neutral-800'}`}>
          <div>
            <p className="text-sm text-slate-400 mb-1">Edge AI Proxies</p>
            <p className={`text-3xl font-bold tabular-nums ${proxyNodes.length > 0 ? 'text-amber-500' : 'text-slate-600'}`}>{proxyNodes.length}</p>
          </div>
          <div className={`p-3 rounded-lg ${proxyNodes.length > 0 ? 'bg-amber-950 text-amber-500' : 'bg-neutral-800 text-slate-600'}`}><Server size={24} /></div>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Avg Latency</p>
            <p className="text-3xl font-bold text-white tabular-nums inline-block w-24">{avgLatency.toFixed(1)} <span className="text-base font-normal text-slate-500">ms</span></p>
          </div>
          <div className="p-3 bg-emerald-950 rounded-lg text-emerald-400"><Activity size={24} /></div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Avg Packet Loss</p>
            <p className="text-3xl font-bold text-white tabular-nums inline-block w-24">{avgLoss.toFixed(2)} <span className="text-base font-normal text-slate-500">%</span></p>
          </div>
          <div className="p-3 bg-indigo-950 rounded-lg text-indigo-400"><CloudOff size={24} /></div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Critical Alerts</p>
            <p className="text-3xl font-bold text-red-500 tabular-nums">{activeAlerts}</p>
          </div>
          <div className="p-3 bg-red-950 rounded-lg text-red-400"><AlertTriangle size={24} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 p-5 rounded-lg h-96 flex flex-col">
          <h3 className="font-semibold text-slate-200 mb-4">Live Network Latency Trend</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="neutral-800" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 12}} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: 'neutral-800'}} formatter={(value: number) => [`${value.toFixed(1)} ms`, 'Avg Latency']} />
                <Line type="monotone" dataKey="avgLatency" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg h-96 overflow-hidden flex flex-col">
          <h3 className="font-semibold text-slate-200 mb-4">Recent Alerts</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {alerts.length === 0 ? (
              <p className="text-slate-500 text-sm text-center mt-10">No recent alerts.</p>
            ) : (
              alerts.slice(0, 8).map((a, i) => (
                <div key={i} className="p-3 rounded-md bg-neutral-800 border border-neutral-700">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${a.severity === 'critical' ? 'bg-red-900 text-red-400' : 'bg-amber-900 text-amber-400'}`}>
                      {a.severity}
                    </span>
                    <span className="text-xs text-slate-500">{new Date(a.timestamp * 1000).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm text-slate-300">{a.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
