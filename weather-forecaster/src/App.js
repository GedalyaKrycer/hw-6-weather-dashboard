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




  const submitSearch = (event) => {
    event.preventDefault()

    const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${searchValue.current.value}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`;

    axios.get(unsplashUrl)
      .then((res) => {
        setUnsplashResult(res.data.results[0].urls.regular)
      })

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
          <CurrentTemp unsplashResult={unsplashResult} />
          <ThreeDayForecast />
        </section>
      </main>
    </>
  );
}

export default App;
