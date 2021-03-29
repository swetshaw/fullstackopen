import React from "react";
import Weather from "./Weather";

const Display = (props) => {
  return (
    <div>
      <h1>{props.filteredCountries[0].name}</h1>
      <p>Capital : {props.filteredCountries[0].capital}</p>
      <p>Population : {props.filteredCountries[0].population}</p>
      <h2>Languages</h2>
      <ul>
        {props.filteredCountries[0].languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>

      <img
        src={props.filteredCountries[0].flag}
        style={{ height: 250, width: 250, marginLeft: 20 }}
        alt="flag"
      ></img>
      <Weather capital={props.filteredCountries[0].capital} />
    </div>
  );
};

export default Display;
