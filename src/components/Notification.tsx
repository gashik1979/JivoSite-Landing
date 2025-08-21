import React, { useEffect } from "react";

export type NotificationType = "success" | "error" | "info";

interface NotificationProps {
  message: string;
  type?: NotificationType;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "info",
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded shadow-lg mb-2 animate-fade-in`}
      style={{ minWidth: "250px" }}
    >
      {message}
    </div>
  );
};

export default Notification;
