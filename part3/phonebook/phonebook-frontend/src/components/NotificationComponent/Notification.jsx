/* eslint react/prop-types: 0 */

import "./Notification.css";

const Notification = ({ details }) => {
  if (details === null) return;

  const notificationTypeClass = `notification-${details.notificationType}`;
  const notificationClass = `notification ${notificationTypeClass}`;

  return <div className={notificationClass}>{details.notificationMessage}</div>;
};

export default Notification;
