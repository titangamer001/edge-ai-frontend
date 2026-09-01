import React from 'react';
import { Database, Server, Cpu, Globe, ArrowRight, ArrowDown } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">System Architecture</h1>
        <p className="text-slate-400 mt-1">Data flow from Edge sensors to monitoring dashboard</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg flex-1 overflow-y-auto p-12 flex flex-col items-center">
        
        {/* Layer 1: Sensors */}
        <div className="flex flex-col items-center mb-8">
          <div className="px-8 py-4 bg-emerald-950 border border-emerald-800 rounded-lg flex items-center gap-4 min-w-[300px] justify-center">
            <Globe className="text-emerald-400" size={32}/>
            <div className="text-center">
              <h3 className="text-white font-medium">IoT Edge Devices</h3>
              <p className="text-xs text-slate-400">Sensors, Nodes, Gateways</p>
            </div>
          </div>
          <ArrowDown className="text-slate-600 mt-4" size={24}/>
        </div>

        {/* Layer 2: Comms */}
        <div className="flex flex-col items-center mb-8">
          <div className="px-8 py-4 bg-blue-900 border border-blue-800 rounded-lg flex items-center gap-4 min-w-[300px] justify-center">
            <Server className="text-blue-400" size={32}/>
            <div className="text-center">
              <h3 className="text-white font-medium">MQTT Broker</h3>
              <p className="text-xs text-slate-400">High-Frequency Telemetry Pub/Sub</p>
            </div>
          </div>
          <ArrowDown className="text-slate-600 mt-4" size={24}/>
        </div>

        {/* Layer 3: Processing */}
        <div className="flex flex-col items-center mb-8">
          <div className="px-8 py-4 bg-purple-950 border border-purple-800 rounded-lg flex items-center gap-4 min-w-[400px] justify-center">
            <Cpu className="text-purple-400" size={32}/>
            <div className="text-center">
              <h3 className="text-white font-medium">FastAPI Backend</h3>
              <p className="text-xs text-slate-400">Real-time Data Stream Processing</p>
            </div>
          </div>
          <div className="flex gap-16 mt-4">
            <div className="flex flex-col items-center">
              <ArrowDown className="text-slate-600 mb-4" size={24}/>
              <div className="px-6 py-3 bg-amber-950 border border-amber-800 rounded-lg flex items-center gap-3">
                <Database className="text-amber-400" size={24}/>
                <div className="text-center">
                  <h3 className="text-white font-medium text-sm">Storage Layer</h3>
                  <p className="text-xs text-slate-400">SQLite / Postgres</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <ArrowDown className="text-slate-600 mb-4" size={24}/>
              <div className="px-6 py-3 bg-indigo-950 border border-indigo-800 rounded-lg flex items-center gap-3">
                <Globe className="text-indigo-400" size={24}/>
                <div className="text-center">
                  <h3 className="text-white font-medium text-sm">React Dashboard</h3>
                  <p className="text-xs text-slate-400">Live Visualization (WebSockets)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
