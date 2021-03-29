import React from "react";

const Contact = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.number}{" "}
        <button
          onClick={() => {
            props.handleDelete(props.id, props.name);
          }}
        >
          delete
        </button>
      </p>
    </div>
  );
};

export default Contact;
