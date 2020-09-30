import React, {useState} from 'react';
import './style.css';
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa'

function LocationHistory() {
    const [toggleAccordion, setToggleAccordion] = useState(true);

    // Handles button click for accordion
    const handleAccordion = () => {
        toggleAccordion ? setToggleAccordion(false) : setToggleAccordion(true);
        console.log("This ran")
    }
    return (
        <div className="location__container">
            <button onClick={handleAccordion} className="location__accordion">
                <h3 className="location__title">History</h3>
                <FaPlus className={toggleAccordion ? "location__toggle-icon-open" : "location__toggle-icon-close"} />
            </button>
            <div className={toggleAccordion ? "location__accordion-items-show" : "location__accordion-items-hide"}>
                <button className="location__item">
                    <FaMapMarkerAlt className="location__pin-icon" />
                    <p className="location__txt">Las Vegas</p>
                </button>
                <button className="location__item">
                    <FaMapMarkerAlt className="location__pin-icon" />
                    <p className="location__txt">Arizona</p>
                </button>
                <button className="location__item">
                    <FaMapMarkerAlt className="location__pin-icon" />
                    <p className="location__txt">New Jersey</p>
                </button>

            </div>

        </div>
    )
}

export default LocationHistory;
