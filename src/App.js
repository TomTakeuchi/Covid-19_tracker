import React,{useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import InfoBox from './infoBox';
import './App.css';

function App() {

  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('worldwide');
  //https://disease.sh/v3/covid-19/countries

  useEffect(()=>{
    async function getCountriesData(){
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }
        ));
        setCountries(countries);
      })
    }
    getCountriesData();
  },[countries]);


  function onCountryChange(event){
    const countyCode = event.target.value;
    setCountry(countyCode);
  }
  


  return (
    <div className="app">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={onCountryChange}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app_stats">
        <InfoBox title="Coronavirus cases" cases={100} total={2000} />
        <InfoBox title="Recovered" cases={100} total={2000} />
        <InfoBox title="Deaths" cases={100} total={4000} />
      </div>


      {/* {Table} */}
      {/* {Graph} */}

      {/* {Map} */}

    </div>
  );
}

export default App;
