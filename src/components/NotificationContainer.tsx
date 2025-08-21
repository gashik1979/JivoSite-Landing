import React, { useState, useCallback } from "react";
import Notification, { NotificationType } from "./Notification";

interface NotificationItem {
  id: number;
  message: string;
  type: NotificationType;
}

const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = useCallback((message: string, type: NotificationType = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {notifications.map((n) => (
        <Notification
          key={n.id}
          message={n.message}
          type={n.type}
          onClose={() => removeNotification(n.id)}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
