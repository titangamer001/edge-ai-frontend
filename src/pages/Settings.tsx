import React from 'react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Platform Settings</h1>
        <p className="text-slate-400 mt-1">Configure threshold limits and simulation behaviors</p>
      </div>

      <div className="space-y-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-white mb-4 border-b border-neutral-800 pb-2">Network Alert Thresholds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Warning Latency (ms)</label>
              <input type="number" defaultValue={100} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Critical Latency (ms)</label>
              <input type="number" defaultValue={250} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Warning Packet Loss (%)</label>
              <input type="number" defaultValue={5} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Critical Packet Loss (%)</label>
              <input type="number" defaultValue={15} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white outline-none focus:border-blue-500" />
            </div>
          </div>
          <button className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors">Save Thresholds</button>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-white mb-4 border-b border-neutral-800 pb-2">System Integrations</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-md border border-neutral-800">
              <div>
                <p className="font-medium text-white">MQTT Broker</p>
                <p className="text-sm text-slate-400">broker.emqx.io:1883</p>
              </div>
              <span className="px-3 py-1 bg-emerald-900 text-emerald-400 text-xs font-medium rounded-full">Connected</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-md border border-neutral-800">
              <div>
                <p className="font-medium text-white">Grafana Sync</p>
                <p className="text-sm text-slate-400">Time-series metric push</p>
              </div>
              <span className="px-3 py-1 bg-neutral-700 text-slate-400 text-xs font-medium rounded-full">Unconfigured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
