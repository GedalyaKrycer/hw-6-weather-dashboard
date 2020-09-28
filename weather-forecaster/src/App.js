import React, { useState, useRef } from 'react';
import SearchBar from './components/SearchBar';
import CurrentTemp from './components/CurrentTemp';
import FutureDayForecast from './components/FutureDayForecast';
import LocationHistory from './components/LocationHistory';
import SidebarWrapper from './components/SidebarWrapper';
import SearchErrorMessage from './components/SearchErrorMessage';
import PreContentMessage from './components/PreContentMessage';
import axios from 'axios';

function App() {

  // Stores the input from search
  const searchValue = useRef()

  // Stores url from Unsplash
  const [unsplashResult, setUnsplashResult] = useState();

  // Stores an object of data from Open Weather
  const [openWeatherResults, setOpenWeatherResults] = useState({});

  // Stores an Array of data from Open Weather
  const [openWeatherForecastResults, setOpenWeatherForecastResults] = useState([]);

  // Stores boolean if the current forecast should display
  const [displayCurrentForecast, setDisplayCurrentForecast] = useState(false);

  // Stores boolean if the future forecast should display
  const [displayFutureForecast, setDisplayFutureForecast] = useState(false);

  // Stores boolean if the pre content message should display
  const [preContent, setPreContent] = useState(true);



  // Stores boolean for if there is an API error. If so it triggers a front end alert
  const [apiErr, setApiErr] = useState(false);


  // Converts the Open Weather time unix code into a readable date
  function timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const time = month + ' / ' + date + ' / ' + year;
    return time;
  };


  const submitSearch = async (event) => {
    event.preventDefault();

    // Unsplash Image API
    const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${searchValue.current.value}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`;

    axios.get(unsplashUrl)
      .then((res) => {
        setUnsplashResult(res.data.results[0].urls.regular);
        setApiErr(false);
      })
      .catch((err) => {
        setApiErr(true);
        console.log(`Unsplash Error: ${err}`);
      });

    // Open Weather API 
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.current.value}&appid=${process.env.REACT_APP_OW_KEY}&units=imperial`;

    axios.get(openWeatherUrl)
      .then((res) => {
        // Gets Weather Data
        setOpenWeatherResults({
          name: res.data.name,
          icon: res.data.weather[0].icon,
          description: res.data.weather[0].description,
          date: timeConverter(res.data.dt),
          temperature: Math.floor(res.data.main.temp),
          maxTemperature: Math.floor(res.data.main.temp_max),
          minTemperature: Math.floor(res.data.main.temp_min),
          humidity: Math.floor(res.data.main.humidity),
          windSpeed: Math.floor(res.data.wind.speed),
          latitude: res.data.coord.lat,
          longitude: res.data.coord.lon,

        })

        setApiErr(false);
        setDisplayCurrentForecast(true);
        setPreContent(false);

      })
      .catch((err) => {
        setApiErr(true);
        console.log(`Open Weather Error: ${err}`);
      });


    // 5 Day Forcast Weather API 
    const openWeatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue.current.value}&appid=${process.env.REACT_APP_OW_KEY}&units=imperial`;

    axios.get(openWeatherForecastUrl)
      .then((res) => {

        for (let futureForecastArray = 2; futureForecastArray < 35; futureForecastArray += 8) {
          console.log(res.data.list[futureForecastArray])

          setOpenWeatherForecastResults(...openWeatherForecastResults, {
            icon: res.data.list[futureForecastArray].weather[0].icon,
            description: res.data.list[futureForecastArray].weather[0].description,
            date: timeConverter(res.data.list[futureForecastArray].dt),
            temperature: Math.floor(res.data.list[futureForecastArray].main.temp),
            humidity: Math.floor(res.data.list[futureForecastArray].main.humidity)
          })

          // setOpenWeatherForecastResults([futureForecastArray])


        }

        setApiErr(false);
        setDisplayFutureForecast(true);

      })
      .catch((err) => {
        setApiErr(true);
        console.log(`Open Weather Error: ${err}`);
      });


  }

  const testArray = [];

  console.log("openWeatherForecastResults")
  console.log(openWeatherForecastResults)

  return (
    <>
      <main className="columns is-desktop g__main-wrapper">
        <section className="column g__sidebar-container">
          <SidebarWrapper>
            <LocationHistory />
          </SidebarWrapper>

        </section>
        <section className="column g__results-container container">
          <SearchBar
            searchValue={searchValue}
            submitSearch={submitSearch}
          />

          {!apiErr ? (null) : <SearchErrorMessage />}

          {!preContent ? (null) : <PreContentMessage />}

          <CurrentTemp
            unsplashResult={unsplashResult}
            displayCurrentForecast={displayCurrentForecast}
            openWeatherResults={openWeatherResults}
          />

          {/* This generates 5 forecast cards */}
          {/* {openWeatherForecastResults.map((e) => 
            <FutureDayForecast
              displayFutureForecast={displayFutureForecast}
              key={e.dt}
              icon={e.icon}
              description={e.description}
              date={e.dt}
              temperature={e.temperature}
              humidity={e.humidity}
            />
          )} */}

        </section>
      </main>
    </>
  );
}

export default App;
