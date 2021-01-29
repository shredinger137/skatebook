import React from 'react';
import '../css/header.css'
import { useUser } from 'reactfire';
import { useFirebaseApp, AuthCheck } from 'reactfire';
import {BrowserRouter, Link} from 'react-router-dom'

var Header = (props) => {
    const { data: user } = useUser();
    const firebase = useFirebaseApp();
  //  console.log(user);

    const handleClick = () => {
        firebase.auth().signOut();
      }


    return (
        <>
            <div className="menuWrapper">
                <div className="menuSubWrapper" id="mobileMenuWrapper">

                    <ul className="menuList">
                        {user ? 
                        <li><span onClick={handleClick}>Log Out</span></li> 
                        : 
                        <Link to="/login">Log In</Link>}          
                        <li><Link to="/leagues">Leagues</Link></li>
                        <li><Link to="/events">Events</Link></li>
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