'use client'

import { receiveNotification } from '@/lib/features/notifications';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Toast from '@/ui/Toast';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const userId = useAppSelector(state => state.user?.id)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!userId) return;

    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('receive-notification-' + userId, (notification: NotificationProps) => {
      dispatch(receiveNotification(notification))
      if (notification.type == 'review' && document.location.pathname == '/reviews/' + notification.id) return;
      Toast(notification.content, 'info')
    })

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  // if (!socket) {
  //   throw new Error('useSocket must be used within a SocketProvider');
  // }
  return socket;
};
