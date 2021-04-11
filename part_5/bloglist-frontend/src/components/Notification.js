import React from 'react';

const Notification = (props) => {
  if (props.msg === null && props.errorMsg === null) {
    return null;
  } 
  else if(props.errorMsg){
      return (
        <div className="errorMsg">
          <h1>
            {props.errorMsg}
          </h1>
        </div>
      );
  }
    return (
      <div className="greenMsg">
        <h1>
          {props.msg}
        </h1>
      </div>
    );
  
};

export default Notification;
