import React from 'react';
import './style.css';

function ThreeDayForecast() {
    return (
        <div>
            <h4>3 Day Forecast</h4>
            <div className="columns forecast__main">
                <div className="column">
                    <div className="forecast__container">
                        <div className="forecast__header">
                            <h5>Sep / 25 / 2020</h5>
                        </div>
                        <div className="forecast__body">
                            <img
                                src="https://openweathermap.org/img/wn/01d.png"
                                alt="Weather status icon"
                                className="g__temp-status-img" />
                            <p>Clear Sky</p>

                            <div className="forecast__meta-container">
                                <h3 className="g__details-num">61<sup className="g__details-metric">°F</sup></h3>
                                <p className="g__details-label">Temperature</p>
                            </div>

                            <div className="forecast__meta-container">
                                <h3 className="g__details-num">20<sup className="g__details-metric">%</sup></h3>
                                <p className="g__details-label">Humidity</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="column">
                    <div className="forecast__container">
                        <div className="forecast__header">
                            <h5>Sep / 25 / 2020</h5>
                        </div>
                        <div className="forecast__body">
                            <img
                                src="https://openweathermap.org/img/wn/01d.png"
                                alt="Weather status icon"
                                className="g__temp-status-img" />
                            <p>Clear Sky</p>

                            <div className="forecast__meta-container">
                                <h3 className="g__details-num">61<sup className="g__details-metric">°F</sup></h3>
                                <p className="g__details-label">Temperature</p>
                            </div>

                            <div className="forecast__meta-container">
                                <h3 className="g__details-num">20<sup className="g__details-metric">%</sup></h3>
                                <p className="g__details-label">Humidity</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="column">
                    <div className="forecast__container">
                        <div className="forecast__header">
                            <h5>Sep / 25 / 2020</h5>
                        </div>
                        <div className="forecast__body">
                            <img
                                src="https://openweathermap.org/img/wn/01d.png"
                                alt="Weather status icon"
                                className="g__temp-status-img" />
                            <p>Clear Sky</p>

                            <div className="forecast__meta-container">
                                <h3 className="g__details-num">61<sup className="g__details-metric">°F</sup></h3>
                                <p className="g__details-label">Temperature</p>
                            </div>

                            <div className="forecast__meta-container">
                                <h3 className="g__details-num">20<sup className="g__details-metric">%</sup></h3>
                                <p className="g__details-label">Humidity</p>
                            </div>
                        </div>

                    </div>
                </div>
                




            </div>
        </div>
    )
}

export default ThreeDayForecast;
