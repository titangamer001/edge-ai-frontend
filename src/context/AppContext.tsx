import React, { createContext, useContext, useEffect, useState } from 'react';

type TelemetryData = {
  device_id: string;
  latency: number;
  packet_loss: number;
  bandwidth: number;
  health_score?: number;
  timestamp: number;
  proxy_mode?: boolean;
  reporter?: string;
};

type AlertData = {
  device_id: string;
  severity: string;
  message: string;
  timestamp: number;
};

interface AppContextType {
  telemetry: Record<string, TelemetryData>;
  history: TelemetryData[];
  alerts: AlertData[];
  connected: boolean;
}

const AppContext = createContext<AppContextType>({ telemetry: {}, history: [], alerts: [], connected: false });

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [telemetry, setTelemetry] = useState<Record<string, TelemetryData>>({});
  const [history, setHistory] = useState<TelemetryData[]>([]);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let ws: WebSocket;
    
    const connect = () => {
      // Force local WebSocket if running on localhost to avoid connecting to broken cloud backend
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const wsUrl = isLocal ? 'ws://127.0.0.1:8000/ws/stream' : (import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8000/ws/stream');
      
      console.log("Connecting to WebSocket:", wsUrl);
      ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log("WebSocket Connected!");
        setConnected(true);
      };
      
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === 'telemetry') {
          const data = msg.data as TelemetryData;
          setTelemetry(prev => ({ ...prev, [data.device_id]: data }));
          setHistory(prev => {
            const newHistory = [...prev, data];
            if (newHistory.length > 500) newHistory.shift();
            return newHistory;
          });
        } else if (msg.type === 'alert') {
          setAlerts(prev => [msg.data, ...prev].slice(0, 100));
        }
      };
      
      ws.onclose = () => {
        console.log("WebSocket Disconnected. Reconnecting...");
        setConnected(false);
        setTimeout(connect, 3000);
      };
    };
    
    connect();
    
    return () => {
      if (ws) ws.close();
    };
  }, []);

  return (
    <AppContext.Provider value={{ telemetry, history, alerts, connected }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
