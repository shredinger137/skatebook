import React from 'react';
import '../css/header.css'

var Header = (props) => {
    return (
        <>
            <div className="menuWrapper">
                <div className="menuSubWrapper" id="mobileMenuWrapper">
                    <ul className="menuList">
                        <li><a href="/leagues">Leagues</a></li>
                        <li><a href="/events">Events</a></li>
                    </ul>
                </div>
                <div id="menuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </>
    );
}

export default Header;