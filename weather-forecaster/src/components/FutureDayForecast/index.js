import React from 'react';
import './style.css';

function FutureDayForecast({
    displayFutureForecast,
    icon,
    description,
    date,
    temperature,
    humidity
}) {

    // If there is no data this does not display the current temp code.
    if (displayFutureForecast === false) {
        return null;
    }

    return (
        <div>
            <h4>3 Day Forecast</h4>
            <div className="columns forecast__main">
                <div className="column">
                    <div className="forecast__container">
                        <div className="forecast__header">
                            <h5>{date}</h5>
                        </div>
                        <div className="forecast__body">
                            <img
                                src={icon}
                                alt="Weather status icon"
                                className="g__temp-status-img" />
                            <p>{description}</p>

                            <div className="forecast__meta-container">
                                <h3 className="g__details-num">{temperature}<sup className="g__details-metric">°F</sup></h3>
                                <p className="g__details-label">Temperature</p>
                            </div>

                            <div className="forecast__meta-container">
                                <h3 className="g__details-num">{humidity}<sup className="g__details-metric">%</sup></h3>
                                <p className="g__details-label">Humidity</p>
                            </div>
                        </div>

                    </div>
                </div>



            </div>
        </div>
    )
}

export default FutureDayForecast;
