import React from 'react';
import './style.css';

function SidebarWrapper({children}) {
    return (
        <div>
            
            <h1 className="side-bar__logo">
            <span className="sidebar__logo--one">React</span> 
            <span className="sidebar__logo--two">Weather</span>
            <span className="sidebar__logo--three">Forecast</span>
            </h1>

            {children}

        </div>
    )
}

export default SidebarWrapper;
