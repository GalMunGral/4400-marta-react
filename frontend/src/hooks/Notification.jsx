import { useContext } from "react";
import { NotificationContext } from "../contexts";

const useNotification = () => {
  const [notifications, setNotifications] = useContext(NotificationContext);

  return function notify(type, message) {
    setNotifications(notifications.concat({ type, message }));
  };
};

export default useNotification;
