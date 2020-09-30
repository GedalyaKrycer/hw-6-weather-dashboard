import React, { useState, useRef } from 'react';
import SearchBar from './components/SearchBar';
import CurrentTemp from './components/CurrentTemp';
import FutureDayForecast from './components/FutureDayForecast';
// import LocationHistory from './components/LocationHistory';
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
  const [futureForecast, setFutureForecast] = useState();

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

  // START Process Forcast Array ----------------------------------|

  // Holds the 5 forecast data objects from the API that we want to display.
  const forecastResultsArray = []

  // Holds the rendered components that have the 5 forecast object data
  const forecastCardRender = []

  // Filters the 40 objects to just 5, one for each day.
  function processForecast(event) {
    for (let i = 2; i < 35; i += 8) {
      forecastResultsArray.push(event[i]);
    }

    // Takes the 5 objects and creates 5 components with props
    forecastResultsArray.forEach((e) => {
      forecastCardRender.push(
        <FutureDayForecast
          displayFutureForecast={displayFutureForecast}
          key={e.dt}
          icon={e.weather[0].icon}
          description={e.weather[0].description}
          date={timeConverter(e.dt)}
          temperature={Math.floor(e.main.temp)}
          humidity={Math.floor(e.main.humidity)}
        />
      
      );
    });

    // Sets the 5 components to state so they can be rendered on the page
    setFutureForecast(forecastCardRender)

    // Lets the page know to show certain JSX elements 
    setDisplayFutureForecast(true);
  }
  // END Process Forcast Array ----------------------------------|


  // START API Calls ---------------------------------------|
  const submitSearch = (event) => {
    event.preventDefault();

    // Unsplash Image API
    const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${searchValue.current.value}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`;

    axios.get(unsplashUrl)
      .then((res) => {
        
        // Saves response of urls into an array 
        const imageArray = res.data.results;

        // Selects a random image from array
        const randomImage = imageArray[Math.floor(Math.random()*imageArray.length)];

        // Set state to the random image 
        setUnsplashResult(randomImage.urls.regular);

        // Do not display front end error message
        setApiErr(false);
      })
      .catch((err) => {

         // Display front end error message
        setApiErr(true);
        console.log(`Unsplash Error: ${err}`);
      });

    // Open Weather API 
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.current.value}&appid=${process.env.REACT_APP_OW_KEY}&units=imperial`;

    axios.get(openWeatherUrl)
      .then((res) => {

        // Sets Weather Data
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

        // Do not display front end error message
        setApiErr(false);

        // Lets JSX know to display elements
        setDisplayCurrentForecast(true);

        // Turns off welcome message
        setPreContent(false);

      })
      .catch((err) => {

         // Display front end error message
        setApiErr(true);
        console.log(`Open Weather Error: ${err}`);
      });


    // 5 Day Forcast Weather API 
    const openWeatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue.current.value}&appid=${process.env.REACT_APP_OW_KEY}&units=imperial`;

    axios.get(openWeatherForecastUrl)
      .then((res) => {
        let futureForecastArray = res.data.list;

        // Submits data to a helper function so that we can pull out only five objects and create JSX cards out of them.
        processForecast(futureForecastArray)

        // Do not display front end error message
        setApiErr(false);

      })
      .catch((err) => {

        // Display front end error message
        setApiErr(true);
        console.log(`Open Weather Error: ${err}`);
      });

  }

  // END API Calls ---------------------------------------|



  return (
    <>
      <main className="columns is-desktop g__main-wrapper">
        <section className="column g__sidebar-container">
          <SidebarWrapper>
            {/* Below is a future feature */}
            {/* <LocationHistory /> */}
          </SidebarWrapper>

        </section>
        <section className="column g__results-container container">
          <SearchBar
            searchValue={searchValue}
            submitSearch={submitSearch}
          />

          {!apiErr ? (null) : <SearchErrorMessage />}

          {/* Welcome message */}
          {!preContent ? (null) : <PreContentMessage />}

          <CurrentTemp
            unsplashResult={unsplashResult}
            displayCurrentForecast={displayCurrentForecast}
            openWeatherResults={openWeatherResults}
          />
          
          {displayFutureForecast ? <h4>5 Day Forecast</h4> : null}
          <div className="columns forecast__main">
            {/* This generates 5 forecast cards */}
            {futureForecast}
          </div>

       
        </section>
      </main>
    </>
  );
}

export default App;
