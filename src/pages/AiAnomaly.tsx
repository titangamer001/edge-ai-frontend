import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Cpu, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AiAnomaly() {
  const { telemetry } = useAppContext();
  const nodes = Object.values(telemetry);
  
  const anomalousNodes = nodes.filter(n => n.is_anomaly);
  const highestScore = nodes.length > 0 ? Math.max(...nodes.map(n => n.anomaly_score)) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-white">AI Anomaly Detection</h1>
          <p className="text-slate-400 mt-1">Isolation Forest ML analysis on Edge Telemetry</p>
        </div>
        <div className="px-4 py-2 bg-purple-950 border border-purple-800 rounded-lg flex items-center gap-2">
          <Cpu className="text-purple-400" size={20} />
          <span className="text-purple-400 font-medium">Model Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg flex flex-col items-center justify-center text-center">
          <span className="text-slate-400 text-sm mb-2">Current System Anomaly Risk</span>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="neutral-800" strokeWidth="3" />
              <path strokeDasharray={`${highestScore * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={highestScore > 0.6 ? "#ef4444" : highestScore > 0.3 ? "#f59e0b" : "#10b981"} strokeWidth="3" />
            </svg>
            <div className="absolute text-2xl font-bold text-white">{(highestScore * 100).toFixed(0)}%</div>
          </div>
        </div>

        <div className="col-span-2 bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
          <h3 className="font-semibold text-slate-200 mb-4">Anomalous Nodes</h3>
          <div className="space-y-3">
            {anomalousNodes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-emerald-500">
                <CheckCircle2 size={48} className="mb-4 opacity-50" />
                <p>No anomalous behavior detected. Network is stable.</p>
              </div>
            ) : (
              anomalousNodes.map(node => (
                <div key={node.device_id} className="flex items-center justify-between p-4 bg-red-950 border border-red-800 rounded-lg">
                  <div className="flex items-center gap-4">
                    <ShieldAlert className="text-red-500" size={24} />
                    <div>
                      <h4 className="text-white font-medium">{node.device_id}</h4>
                      <p className="text-sm text-slate-400">Score: {node.anomaly_score.toFixed(3)} | Latency: {node.latency.toFixed(0)}ms | Loss: {node.packet_loss.toFixed(1)}%</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-900 text-red-400 text-xs font-bold rounded uppercase">Action Required</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
