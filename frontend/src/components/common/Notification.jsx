import React, { useEffect } from "react";

const Notification = ({ notifications, setNotifications }) => {
  useEffect(() => {
    if (notifications.length) {
      setTimeout(() => setNotifications(notifications.slice(1)), 2000);
    }
  });

  if (!notifications.length) {
    return <div className="notification hidden has-text-weight-bold" />;
  }

  const current = notifications[0];
  const classes = ["notification", "has-text-weight-bold", "is-light"];
  switch (current.type) {
    case "INFO":
      classes.push("is-primary");
      break;
    case "ERROR":
      classes.push("is-danger");
      break;
  }
  return <div className={classes.join(" ")}>{current.message}</div>;
};

export default Notification;
