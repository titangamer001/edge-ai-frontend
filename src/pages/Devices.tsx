import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function Devices() {
  const { telemetry } = useAppContext();
  const nodes = Object.values(telemetry);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">IoT Devices</h1>
        <p className="text-slate-400 mt-1">Live status of edge nodes and sensors</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-400 table-fixed">
            <thead className="text-xs text-slate-300 uppercase bg-[#0f172a] border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 w-48">Device ID</th>
                <th className="px-6 py-4 w-40">Status</th>
                <th className="px-6 py-4 w-32">Health</th>
                <th className="px-6 py-4 w-32 text-right">Latency (ms)</th>
                <th className="px-6 py-4 w-28 text-right">Loss (%)</th>
                <th className="px-6 py-4 w-40 text-right">Bandwidth (MB/s)</th>
                <th className="px-6 py-4 text-right">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {nodes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No active IoT devices.
                  </td>
                </tr>
              ) : (
                nodes.sort((a,b) => a.device_id.localeCompare(b.device_id)).map((node) => (
                  <tr key={node.device_id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                    <td className="px-6 py-4 font-medium text-white">{node.device_id}</td>
                    <td className="px-6 py-4">
                      {node.proxy_mode ? (
                        <div className="flex items-center gap-2 text-amber-500">
                          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                          <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/10 px-2 py-1 rounded">Proxy Active (DB Cache)</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span>Online</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-700 rounded-full h-1.5 w-16">
                          <div className={`h-1.5 rounded-full ${node.health_score! > 80 ? 'bg-emerald-500' : node.health_score! > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${node.health_score || 0}%` }}></div>
                        </div>
                        <span className="text-xs tabular-nums w-8 text-right">{node.health_score?.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 tabular-nums text-right">{node.latency.toFixed(1)}</td>
                    <td className="px-6 py-4 tabular-nums text-right">{node.packet_loss.toFixed(2)}</td>
                    <td className="px-6 py-4 tabular-nums text-right">{node.bandwidth.toFixed(2)}</td>
                    <td className="px-6 py-4 tabular-nums text-right">{new Date(node.timestamp * 1000).toLocaleTimeString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
