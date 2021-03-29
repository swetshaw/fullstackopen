import React from "react";

const Find = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <input value={props.country} onChange={props.onChange}></input>
    </div>
  );
};

export default Find;
