import { Link } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'

var settings_func = function() {
    alert("Settings");
};

const Navbar = () => {
    
    return (
        <header>
           <div className="container">
                <Link to="/">
                    <h1>ManageHelp</h1>
                </Link>
                <Link onClick={settings_func} to="/">
                    <h2>Settings</h2>
                </Link>
           </div> 
        </header>
    )
}

export default Navbar
