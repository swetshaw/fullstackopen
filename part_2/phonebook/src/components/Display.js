import React from "react";
import Contact from "./Contact";

const Display = (props) => {
  var filteredNames = props.persons;
  if (props.showFilter) {
    filteredNames = props.persons.filter((person) =>
      person.name.toLowerCase().includes(props.showFilter.toLowerCase())
    );
  }

  return (
    <div>
      {filteredNames.map((person) => (
        <Contact
          key={person.id}
          name={person.name}
          number={person.number}
          id = {person.id}
          handleDelete = {props.handleDelete}
        ></Contact>
        
      ))}
    </div>
  );
};

export default Display;
