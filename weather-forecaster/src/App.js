import React from 'react';
import SearchBar from './components/SearchBar';
import CurrentTemp from './components/CurrentTemp';
import ThreeDayForecast from './components/ThreeDayForecast';
import LocationHistory from './components/LocationHistory';
import SidebarWrapper from './components/SidebarWrapper';

function App() {
  return (
    <>
      <main className="columns is-desktop g__main-wrapper">
        <section className="column g__sidebar-container">
          <SidebarWrapper>
            <LocationHistory />
          </SidebarWrapper>

        </section>
        <section className="column g__results-container container">
          <SearchBar />
          <CurrentTemp />
          <ThreeDayForecast />
        </section>
      </main>
    </>
  );
}

export default App;
