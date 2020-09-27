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

  // Stores the Name from Open Weather
  const [oWName, setOWName] = useState();

  // Stores the Icon from Open Weather
  const [oWIcon, setOWIcon] = useState();

  // Stores the "dt" UNIX Code from Open Weather
  const [oWDateTime, setDateTime] = useState();

  // Stores the Icon Description from Open Weather
  const [oWIconDescription, setOWIconDescription] = useState();

  const [displayForecast, setDisplayForecast] = useState(false);
  const [apiErr, setApiErr] = useState(false);


  const submitSearch = (event) => {
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
        console.log(err);
      });

    // Open Weather API 
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.current.value}&appid=${process.env.REACT_APP_OW_KEY}&units=imperial`;

    axios.get(openWeatherUrl)
      .then((res) => {
        setOWName(res.data.name);
        setOWIcon(res.data.weather[0].icon);
        setOWIconDescription(res.data.weather[0].description);
        setDateTime(res.data.dt);
        setApiErr(false);
        setDisplayForecast(true);
        console.log(res.data);
      })
      .catch((err) => {
        setApiErr(true);
        console.log(err);
      });

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
            oWName={oWName}
            oWIcon={oWIcon}
            oWIconDescription={oWIconDescription}
            oWDateTime={oWDateTime}
          />
          <ThreeDayForecast />
        </section>
      </main>
    </>
  );
}

export default App;
