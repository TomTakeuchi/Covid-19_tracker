import React,{Text,useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import InfoBox from './infoBox';
import './App.css';
import Table from "./Table";
import {sortData} from './util';
import LineGraph from './LineGraph';
import Map from './Map';
import 'leaflet/dist/leaflet.css';

function App() {

  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('worldwide');
  const [countryInfo,setTotalInfo] = useState({});
  const [tableData,setTableData]=useState([]);
  const [mapCenter, setmapCenter] = useState({lat:36,lng:120});
  const [mapZoom, setmapZoom] = useState(3);
  const [count, setCount] = useState(0);

  //https://disease.sh/v3/covid-19/countries api
  //https://disease.sh/v3/covid-19/countries/${countryCode} api for each country

  // https://covid19-japan-web-api.now.sh/api//v1/total
  //https://covid19-japan-web-api.now.sh/api//v1/prefectures
  　    console.log(mapCenter);

  

  useEffect(()=>{
    fetch('https://covid19-japan-web-api.now.sh/api//v1/total')
    .then((response)=>response.json())
    .then((data)=>{
      setTotalInfo(data);
    });//show worldwide cases at first
  },[])

  useEffect(()=>{
    async function getCountriesData(){
      await fetch("https://covid19-japan-web-api.now.sh/api//v1/prefectures")
      .then((response)=>response.json())
      .then((data)=>{
        const prefectures = data.map((prefecture)=>(
          {
            name:prefecture.name_ja,
            value:prefecture.cases
          }
        ));
        console.log(prefectures);
        
        const sortedData = sortData(data)
        setTableData(sortedData);
        setCountries(prefectures);
        
      });//set coutries for menuItem
    }
    getCountriesData(); 
  },[]);

  const onCountryChange =  async (event) => {  
    const countryCode = event.target.value;
    const url = countryCode === 'worldwide' ? 'https://covid19-japan-web-api.now.sh/api//v1/total' 
    : `https://covid19-japan-web-api.now.sh/api//v1/prefectures`;
    await fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
      setCountry(countryCode);
      setTotalInfo(data)//all data from the county response      
      console.log('start');
      setmapCenter({lat:data.countryInfo.lat, lng:data.countryInfo.lng});
      console.log('end');
      setmapZoom(4)
      console.log(mapCenter);
      console.log('12345');
    });   
  }    
  

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(prefecrture => (
                <MenuItem value={countries.name}>{prefecrture.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>

        <Map 
          center={mapCenter}
          zoom={mapZoom}
        />

      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
