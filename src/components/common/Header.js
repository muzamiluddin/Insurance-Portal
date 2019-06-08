import React from 'react';
import { NavLink, BrowserRouter } from 'react-router-dom'

const Header = () => {
    return (
        <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="#">Acme Insurance</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <NavLink to="/home" className="nav-link" activeClassName="active">Home</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/courses" className="nav-link" activeClassName="active">Courses</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;