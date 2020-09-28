import React from 'react';
import './style.css';


function CurrentTemp({
    unsplashResult,
    displayForecast,
    openWeatherResults
}) {





    // This adds styling for a API generated background image
    const containerStyling = {
        borderRadius: "5px",
        backgroundImage: `linear-gradient(0deg, rgba(98, 4, 126, 0.95), rgba(233, 146, 6, 0.95)), url(${unsplashResult})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        boxShadow: "0px 2px 4px rgb(0 0 0 / 0.25)"
    }

    // If there is no data this does not display the current temp code.
    if (displayForecast === false) {
        return null;
    }


    return (
        <div
            className="current-temp__container"
            style={containerStyling}>
            <div className="current-temp__header">

                <h2>{openWeatherResults.name}</h2>

                <div className="current-temp__meta">
                    <p className="current-temp__meta-date">{openWeatherResults.date}</p>
                    <div className="current-temp__meta-status">
                        {!openWeatherResults.icon ? null : <img src={`https://openweathermap.org/img/wn/${openWeatherResults.icon}.png`} alt="Weather status icon"
                            className="g__temp-status-img" />}

                        <p>{openWeatherResults.description}</p>
                    </div>
                </div>
            </div>
            <div className="columns current-temp__details-container">
                <div className="column">
                    <h3 className="g__details-num">{openWeatherResults.temperature}<sup className="g__details-metric">°F</sup></h3>
                    <p className="g__details-label">Temperature</p>
                </div>
                <div className="column">
                    <h3 className="g__details-num">{openWeatherResults.maxTemperature}<sup className="g__details-metric">°F</sup></h3>
                    <p className="g__details-label">High</p>
                </div>
                <div className="column">
                    <h3 className="g__details-num">{openWeatherResults.minTemperature}<sup className="g__details-metric">°F</sup></h3>
                    <p className="g__details-label">Low</p>
                </div>
                <div className="column">
                    <h3 className="g__details-num">{openWeatherResults.humidity}<sup className="g__details-metric">%</sup></h3>
                    <p className="g__details-label">Humidity</p>
                </div>
                <div className="column">
                    <h3 className="g__details-num">{openWeatherResults.windSpeed}<sup className="g__details-metric">MPH</sup></h3>
                    <p className="g__details-label">Wind Speed</p>
                </div>


            </div>

        </div>
    )
}

export default CurrentTemp;
