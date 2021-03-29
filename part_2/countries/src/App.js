import logo from "./logo.svg";
import "./App.css";
import Find from "./components/Find";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countryList, setCountryList] = useState([]);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClick = (event)=>{
    // setCountry(events.target)
    console.log(event.target.attributes.country.value);
    setFilter(event.target.attributes.country.value)
  }

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then((response) => {
      // console.log(response.data);
      setCountryList(response.data);
    });
  }, []);

  return (
    <div>
      <Find text={"Find Countries"} country={filter} onChange={handleChange} />
      <Country countryList={countryList} filter={filter} handleClick={handleClick}/>
      
    </div>
  );
};
export default App;
