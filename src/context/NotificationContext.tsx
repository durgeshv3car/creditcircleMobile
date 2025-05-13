// import React, { createContext, useContext, useState } from 'react';

// type Notification = {
//   id: string;
//   title: string;
//   description: string;
//   image?: string;
//   time: string;
// };

// type NotificationContextType = {
//   notifications: Notification[];
//   setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
// };

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   return (
//     <NotificationContext.Provider value={{ notifications, setNotifications }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = () => {
//   const context = useContext(NotificationContext);
//   if (!context) {
//     throw new Error('useNotifications must be used within a NotificationProvider');
//   }
//   return context;
// };

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Notification {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  isRead: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}


interface NotificationContextType {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  markAsRead: (id: string) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem('notifications');
      if (saved) setNotifications(JSON.parse(saved));
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  return (
    <NotificationContext.Provider 
    // value={{ notifications, setNotifications }}
    value={{ notifications, setNotifications, markAsRead, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

