import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentTemp from './components/CurrentTemp';
import ThreeDayForecast from './components/ThreeDayForecast';
import LocationHistory from './components/LocationHistory';
import SidebarWrapper from './components/SidebarWrapper';
import axios from 'axios';

function App() {

  // Stores the input from search
  const searchValue = useRef()

  // Stores url from Unsplash
  const [unsplashResult, setUnsplashResult] = useState();

  // Stores object of data from Unsplash
  const [openWeatherResults, setOpenWeatherResults] = useState({});


  const [displayForecast, setDisplayForecast] = useState(false);
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
        setDisplayForecast(true);

      })
      .catch((err) => {
        setApiErr(true);
        console.log(`Open Weather Error: ${err}`);
      });

    // if (oWHLongitude && oWHLatitude) {
    //   // UV Index Open Weather API 
    //   const openWeatherUVIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${oWHLatitude}&lon=${oWHLongitude}&appid=${process.env.REACT_APP_OW_KEY}`;

    //   axios.get(openWeatherUVIndexUrl)
    //     .then((res) => {
    //       setOWUVIndex(res.data.uv.value);

    //       setApiErr(false);
    //     })
    //     .catch((err) => {
    //       setApiErr(true);
    //       console.log(`Open Weather UV Error: ${err}`);
    //     });
    // }


  }

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

          {/* Error State Message */}
          {!apiErr ? (null) :
            (<div className="g__error-container">
              <h1 className="g__error-title">Uh oh <span role="img" aria-label="Thinking">🤔</span></h1>
              <p className="g__error-msg">Please make sure your city or country is spelled correctly and then try your search again.</p>
            </div>)}
          <CurrentTemp
            unsplashResult={unsplashResult}
            displayForecast={displayForecast}
            openWeatherResults={openWeatherResults}
          />
          <ThreeDayForecast />
        </section>
      </main>
    </>
  );
}

export default App;
