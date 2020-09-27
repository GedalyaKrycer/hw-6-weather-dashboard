import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentTemp from './components/CurrentTemp';
import ThreeDayForecast from './components/ThreeDayForecast';
import LocationHistory from './components/LocationHistory';
import SidebarWrapper from './components/SidebarWrapper';
import axios from 'axios';

function App() {

  const searchValue = useRef()
  const [unsplashResult, setUnsplashResult] = useState();
  const [unsplashErr, setUnsplashErr] = useState(false);




  const submitSearch = (event) => {
    event.preventDefault();

    const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${searchValue.current.value}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`;

    axios.get(unsplashUrl)
      .then((res) => {
        setUnsplashResult(res.data.results[0].urls.regular);
        setUnsplashErr(false);
      })
      .catch((err) => {
        setUnsplashErr(true);
        console.log(err);
      });

    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue.current.value}&appid=${process.env.REACT_APP_OW_KEY}"&units=imperial"`;

    console.log(openWeatherUrl);


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
          {!unsplashErr ? (null) :
            (<div className="g__error-container">
              <h1 className="g__error-title">Uh oh 🤔</h1>
              <p className="g__error-msg">Please make sure your city or country is spelled correctly and then try your search again.</p>
            </div>)}
          <CurrentTemp unsplashResult={unsplashResult} />
          <ThreeDayForecast />
        </section>
      </main>
    </>
  );
}

export default App;
