import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function NetworkMonitor() {
  const { history } = useAppContext();

  const chartData = useMemo(() => {
    const map = new Map();
    history.forEach(h => {
      const time = new Date(h.timestamp * 1000).toLocaleTimeString();
      if (!map.has(time)) map.set(time, { time, latency: 0, loss: 0, count: 0 });
      const entry = map.get(time);
      entry.latency += h.latency;
      entry.loss += h.packet_loss;
      entry.count += 1;
    });
    return Array.from(map.values()).map(v => ({ 
      time: v.time, 
      avgLatency: v.latency / v.count,
      avgLoss: v.loss / v.count 
    })).slice(-30);
  }, [history]);

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-white">Network Monitor</h1>
        <p className="text-slate-400 mt-1">Real-time edge infrastructure metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg h-80 flex flex-col">
          <h3 className="font-semibold text-slate-200 mb-4">Average Latency (ms)</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="neutral-800" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 12}} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: 'neutral-800', color: '#fff'}} />
                <Area type="monotone" dataKey="avgLatency" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLat)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg h-80 flex flex-col">
          <h3 className="font-semibold text-slate-200 mb-4">Average Packet Loss (%)</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="neutral-800" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 12}} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: 'neutral-800', color: '#fff'}} />
                <Area type="monotone" dataKey="avgLoss" stroke="#f59e0b" fillOpacity={1} fill="url(#colorLoss)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
