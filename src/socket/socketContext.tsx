import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { SocketClient } from "./socketClient";
import { MessageService } from "./messageService";
import { url } from "./events";

const SocketContext = createContext(null);

interface Props {
  token: string;
  children: React.ReactNode;
}

export function SocketProvider({ children, token }: Props) {
  const client = useMemo(() => SocketClient.getInstance(), []);
  const [isConnected, setIsConnected] = useState(() => client.isConnected);

  useEffect(() => {
    client.subscribeStatus(status => {
      setIsConnected(status);
      const service = MessageService.getInstance();
      if (status) {
        service.startHeartbeat();
      } else {
        service.stopHeartbeat();
      }
    });

    if (token) {
      client.connect(token, url);
    } else {
      client.disconnect();
    }
    return () => {
      client.subscribeStatus(null);
    };
  }, [client, token]);

  const value = useMemo(() => ({ isConnected }), [isConnected]);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};
