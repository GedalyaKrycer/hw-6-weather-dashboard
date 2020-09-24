import React from 'react';
import './style.css';

function SearchBar() {
    return (
        <header className="search-bar__header">
            <div className="columns">
                <div className="column">
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input id="citySearch" className="input" type="text" placeholder="Enter a location here…" />
                        </div>
                        <div className="control">
                            <button id="citySubmit" type="submit" className="button g__full-percent-height search-bar__btn">
                                Search
                        </button>
                        </div>
                    </div>
                </div>
                <div className="column is-one-fifth">
                    Github
                </div>
            </div>

        </header>
    );
}

export default SearchBar;
