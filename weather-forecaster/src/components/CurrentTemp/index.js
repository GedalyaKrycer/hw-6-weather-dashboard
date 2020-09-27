import React from 'react';
import './style.css';

function CurrentTemp({
    unsplashResult,
    displayForecast,
    oWName,
    oWIcon,
    oWIconDescription,
    oWDateTime }) {

    
    // Converts the Open Weather time unix code into a readable date
    function timeConverter(UNIX_timestamp) {
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const time = month + ' / ' + date + ' / ' + year;
        return time;
    };


    // This adds styling for a API generated background image
    const containerStyling = {
        borderRadius: "5px",
        backgroundImage: `linear-gradient(0deg, rgba(98, 4, 126, 0.95), rgba(233, 146, 6, 0.95)), url(${unsplashResult})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        boxShadow: "0px 2px 4px rgb(0 0 0 / 0.25)"
    }



    return (
        <div
            className="current-temp__container"
            style={containerStyling}>
            <div className="current-temp__header">

                <h2>{oWName}</h2>
                <div className="current-temp__meta">
    <p className="current-temp__meta-date">{timeConverter(oWDateTime)}</p>
                    <div className="current-temp__meta-status">
                        <img src={`https://openweathermap.org/img/wn/${oWIcon}.png`} alt="Weather status icon"
                            className="g__temp-status-img" />
                        <p>{oWIconDescription}</p>
                    </div>
                </div>
            </div>
            <div className="columns current-temp__details-container">
                <div className="column">
                    <h3 className="g__details-num">97<sup className="g__details-metric">°F</sup></h3>
                    <p className="g__details-label">Temperature</p>
                </div>
                <div className="column">
                    <h3 className="g__details-num">10<sup className="g__details-metric">%</sup></h3>
                    <p className="g__details-label">Humidity</p>
                </div>
                <div className="column">
                    <h3 className="g__details-num">8<sup className="g__details-metric">MPH</sup></h3>
                    <p className="g__details-label">Wind Speed</p>
                </div>
                <div className="column">
                    <h3 className="g__details-num">7.28</h3>
                    <p className="g__details-label">UV Index</p>
                </div>

            </div>

        </div>
    )
}

export default CurrentTemp;
