import React from 'react';
import './style.css';

function CurrentTemp() {
    return (
        <div className="current-temp__container">
            <div className="current-temp__header">

                <h2>Las Vegas</h2>
                <div className="current-temp__meta">
                    <p className="current-temp__meta-date">Sep / 23 / 2020</p>
                    <div className="current-temp__meta-status">
                        <img src="https://openweathermap.org/img/wn/01d.png" alt="Weather status icon" />
                        <p>Clear Sky</p>
                    </div>
                </div>
            </div>
            <div className="columns current-temp__details-container">
                <div className="column">
                    <h3>97<sup className="current-temp__details-metric">°F</sup></h3>
                    <p className="current-temp__details-label">Temperature</p>
                </div>
                <div className="column">
                    <h3>10<sup className="current-temp__details-metric">%</sup></h3>
                    <p className="current-temp__details-label">Humidity</p>
                </div>
                <div className="column">
                    <h3>8<sup className="current-temp__details-metric">MPH</sup></h3>
                    <p className="current-temp__details-label">Wind Speed</p>
                </div>
                <div className="column">
                    <h3>7.28</h3>
                    <p className="current-temp__details-label">UV Index</p>
                </div>

            </div>

        </div>
    )
}

export default CurrentTemp;
