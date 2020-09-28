import React from 'react';
import './style.css';

function SearchErrorMessage() {

    return (
        <div className="search-error__container">
            <h1 className="search-error__title">Uh oh <span role="img" aria-label="Thinking">🤔</span></h1>
            <p className="search-error__msg">Please make sure your city or country is spelled correctly and then try your search again.</p>
        </div>
    )
}

export default SearchErrorMessage;
