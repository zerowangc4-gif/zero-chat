import React, { createContext, useContext, useEffect, useState } from "react";
import { SocketManager } from "./manager";

interface SocketContextType {
  isConnected: boolean;
}
interface SocketProviderType {
  token: string;
  children: React.ReactNode;
}
const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider(props: SocketProviderType) {
  const { children, token } = props;
  const manager = SocketManager.getInstance();
  const [isConnected, setIsConnected] = useState(manager.isConnected);

  useEffect(() => {
    manager.subscribeStatus(status => {
      setIsConnected(status);
    });

    if (token) {
      manager.connect();
    } else {
      manager.disconnect();
    }
    return () => {
      manager.subscribeStatus(null);
    };
  }, [manager, token]);

  return <SocketContext.Provider value={{ isConnected }}>{children}</SocketContext.Provider>;
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
