import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  viewerCount: number;
}

const SocketContext = createContext<SocketContextType>({ socket: null, viewerCount: 0 });

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within a SocketProvider');
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    // Determine the socket URL:
    // 1. Explicit VITE_SOCKET_URL
    // 2. VITE_API_URL stripped of /api
    // 3. Fallback to localhost:5000
    const apiBase = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    const socketUrl = import.meta.env.VITE_SOCKET_URL || apiBase;
    
    const newSocket = io(socketUrl, {
      transports: ['polling', 'websocket'], // Ensure both are supported
    });
    setSocket(newSocket);

    newSocket.on('updateViewerCount', (count: number) => {
      setViewerCount(count);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, viewerCount }}>
      {children}
    </SocketContext.Provider>
  );
};
