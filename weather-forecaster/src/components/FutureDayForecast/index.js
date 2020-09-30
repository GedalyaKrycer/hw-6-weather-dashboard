import React from 'react';
import './style.css';

function FutureDayForecast({
    icon,
    description,
    date,
    temperature,
    humidity
}) {

    return (
            
                <div className="column">
                    <div className="forecast__container">
                        <div className="forecast__header">
                            <h5>{date}</h5>
                        </div>
                        <div className="forecast__body">
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}.png`}
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




    )
}

export default FutureDayForecast;
