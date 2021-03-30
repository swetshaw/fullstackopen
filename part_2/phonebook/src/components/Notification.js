import React from "react";

const Notification = ({ message, errorMsg }) => {
  if (message === null  && errorMsg === null) {
    return null;
  }
  if (errorMsg){
      return(
          <div className="error"> {errorMsg}</div>
      )
  }

  return <div className="statusNotification">{message}</div>;
};

export default Notification;
