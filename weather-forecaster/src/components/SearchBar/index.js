import React from 'react';
import './style.css';
import { FaGithub } from 'react-icons/fa';

function SearchBar() {
    return (
        <header className="search-bar__header">
            <div className="columns">
                <div className="column is-8">
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input id="citySearch" className="input" type="text" placeholder="Search a location…" />
                        </div>
                        <div className="control">
                            <button id="citySubmit" type="submit" className="button g__full-percent-height search-bar__btn">
                                Search
                        </button>
                        </div>
                    </div>
                </div>
                <div className="column search-bar__github-container">
                    <a
                        href="https://github.com/GedalyaKrycer/weather-forecaster"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="search-bar__github">
                        <FaGithub />
                        View Repo
                    </a>
                </div>
            </div>

        </header>
    );
}

export default SearchBar;
