import React from 'react';
import SearchBar from './components/SearchBar';
import CurrentTemp from './components/CurrentTemp';
import FiveDayForecast from './components/FiveDayForecast';
import LocationHistory from './components/LocationHistory';
import SidebarWrapper from './components/SidebarWrapper';

function App() {
  return (
    <>
      <main className="columns g__main-wrapper">
        <section className="column g__sidebar-container">
          <SidebarWrapper>
            <LocationHistory />
          </SidebarWrapper>

        </section>
        <section className="column g__results-container">
          <SearchBar />
          <CurrentTemp />
          <FiveDayForecast />
        </section>
      </main>
    </>
  );
}

export default App;
