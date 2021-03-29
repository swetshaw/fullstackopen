import React from "react";
import Display from "./Display";

const Country = (props) => {
  var filteredCountries = props.countryList;
  console.log(props.filter);
  if (props.filter) {
    filteredCountries = props.countryList.filter((country_) =>
      country_.name.toLowerCase().includes(props.filter.toLowerCase())
    );
  }

  if (filteredCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }

  if (filteredCountries.length === 1) {
    return <Display filteredCountries={filteredCountries} />;
  }

  return (
    <div>
      {filteredCountries.map((country) => {
        return (
          <div>
            <p key={country.numericCode}>
              {country.name}{" "}
              <button onClick={props.handleClick} country={country.name}>
                show
              </button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Country;
