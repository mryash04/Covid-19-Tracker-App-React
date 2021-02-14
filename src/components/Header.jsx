import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.min.js';

const Header = () => {
    return (
        <div className="header">
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <NavLink class="navbar-brand text-warning font-weight-bold" to="/">Covid-19 Tracker India</NavLink>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <NavLink class="nav-link" to="/">Home <span class="sr-only">(current)</span></NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link text-warning" to="/map">Covid-19 Map India</NavLink>
      </li>
    </ul>
  </div>
</nav>
        </div>
    )
}

export default Header