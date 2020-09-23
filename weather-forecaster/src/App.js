import React from 'react';
import SearchBar from './components/SearchBar';
import CurrentTemp from './components/CurrentTemp';
import FiveDayForecast from './components/FiveDayForecast';
import LocationHistory from './components/LocationHistory';
import MainWrapper from './components/MainWrapper';

function App() {
  return (
    <>
      <SearchBar />
      <MainWrapper>
        <CurrentTemp />
        <FiveDayForecast />
        <LocationHistory />
      </MainWrapper>
    </>
  );
}

export default App;
