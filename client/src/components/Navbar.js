import React from 'react';
import logo from "../assets/kanban.png";
import { Button } from 'react-bootstrap';

function Navbar() {
  return(
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt={"logo website"} />
        <div className="text">MY-KANBAN</div>
      </div>
      <div className="dropdown">
        <div className="username">{localStorage.username.toUpperCase()}</div>
        <div className="dropdownContent">
          <Button className="logout" >Logout</Button>
        </div>
      </div>
    </div>
    )
}

export default Navbar