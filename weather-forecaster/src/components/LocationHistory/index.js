import React from 'react';
import './style.css';
import { FaMapMarkerAlt } from 'react-icons/fa'

function LocationHistory() {
    return (
        <div className="location__container">
            <h3 className="location__title">History</h3>
            <button className="location__item">
                <FaMapMarkerAlt className="location__icon"/>
                <p className="location__txt">Las Vegas</p>
            </button>
            <button className="location__item">
                <FaMapMarkerAlt className="location__icon"/>
                <p className="location__txt">Arizona</p>
            </button>
            <button className="location__item">
                <FaMapMarkerAlt className="location__icon"/>
                <p className="location__txt">New Jersey</p>
            </button>
            
        </div>
    )
}

export default LocationHistory;
