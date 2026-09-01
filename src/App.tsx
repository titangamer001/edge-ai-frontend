import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { Activity, Server, AlertTriangle, CloudRain, LayoutDashboard, Settings as SettingsIcon, Network } from 'lucide-react';
import { AppProvider, useAppContext } from './context/AppContext';

// Placeholder Pages
import Overview from './pages/Overview';
import Devices from './pages/Devices';
import Alerts from './pages/Alerts';
import Disaster from './pages/Disaster';
import NetworkMonitor from './pages/NetworkMonitor';
import Architecture from './pages/Architecture';
import Settings from './pages/Settings';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('edge_auth_token');
  const path = window.location.pathname;
  if (!token && path !== '/auth/callback') {
    return <Login />;
  }
  return <>{children}</>;
};

const Sidebar = () => {
  const links = [
    { to: "/overview", icon: <LayoutDashboard size={20} />, label: "Overview" },
    { to: "/network", icon: <Activity size={20} />, label: "Network Monitor" },
    { to: "/devices", icon: <Server size={20} />, label: "IoT Devices" },
    { to: "/alerts", icon: <AlertTriangle size={20} />, label: "Alerts" },
    { to: "/disaster", icon: <CloudRain size={20} />, label: "Disaster Monitor" },
    { to: "/architecture", icon: <Network size={20} />, label: "System Architecture" },
    { to: "/settings", icon: <SettingsIcon size={20} />, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col h-full">
      <div className="p-6 flex items-center justify-center border-b border-neutral-800">
        <img src="/logo.png" alt="Edge AI Logo" className="h-8 object-contain" style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.2)', mixBlendMode: 'screen' }} />
      </div>
      <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({isActive}) => `flex items-center gap-3 px-6 py-3 mx-2 rounded-md transition-colors ${isActive ? 'bg-blue-900 text-blue-400 font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-neutral-800'}`}>
            {l.icon}
            <span className="text-sm">{l.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-neutral-800">
        <div className="bg-neutral-800 p-3 rounded-md">
          <div className="text-xs text-slate-400 mb-1">SYSTEM STATUS</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 "></div>
            <span className="text-sm text-emerald-400 font-medium">OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const { connected } = useAppContext();
  return (
    <header className="h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6 shrink-0">
      <h2 className="text-slate-200 font-medium tracking-wide">Network Operations Center</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 rounded-full border border-neutral-700">
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-500 ' : 'bg-red-500'}`}></div>
          <span className="text-xs text-slate-300 font-medium">{connected ? 'MQTT LIVE' : 'OFFLINE'}</span>
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-neutral-950 overflow-hidden text-slate-300">
    <Sidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      <main className="flex-1 overflow-y-auto p-6 relative">
        {children}
      </main>
    </div>
  </div>
);

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AuthGuard>
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/overview" replace />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/devices" element={<Devices />} />
                  <Route path="/network" element={<NetworkMonitor />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/disaster" element={<Disaster />} />
                  <Route path="/architecture" element={<Architecture />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </AppProvider>
  );
}
