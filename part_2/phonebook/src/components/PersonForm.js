import React from "react";

const PersonForm = (props) => {
  return (
    <div>
      <form>
        <div>
          name: <input onChange={props.updateNewName} value={props.newName} />
        </div>
        <div>
          number{" "}
          <input
            onChange={props.updateNewNumber}
            value={props.newNumber}
          ></input>
        </div>
        <div>
          <button type="submit" onClick={props.handleClick}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
