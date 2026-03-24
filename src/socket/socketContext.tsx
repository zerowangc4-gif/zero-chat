import { store } from "@/store";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { SocketClient } from "./socketClient";
import { InsertChatMessages, SyncMessageStatus } from "@/features";

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
      if (status) {
        store.dispatch(InsertChatMessages());
        store.dispatch(SyncMessageStatus());
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
