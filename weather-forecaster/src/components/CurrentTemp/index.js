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
            <div className="columns">
                <div className="column">
                    <h3>97°F</h3>
                    <p className="current-temp__label">Temperature</p>
                </div>
                <div className="column">
                    <h3>10%</h3>
                    <p className="current-temp__label">Humidity</p>
                </div>
                <div className="column">
                    <h3>8 MPH</h3>
                    <p className="current-temp__label">Temperature</p>
                </div>
                <div className="column">
                    <h3>7.28</h3>
                    <p className="current-temp__label">UV Index</p>
                </div>

            </div>

        </div>
    )
}

export default CurrentTemp;
