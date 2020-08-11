import React from 'react';
import logo from "../assets/kanban.png";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

function Navbar() {
  const history = useHistory()
  const logout = () => {
    localStorage.clear()
    history.push('/')
  }
  return(
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt={"logo website"} />
        <div className="text">MY-KANBAN</div>
      </div>
      <div className="dropdown">
        <div className="username">{localStorage.username.toUpperCase()}</div>
        <div className="dropdownContent">
          {/* <Button className="logout" onClick={logout} >Logout</Button> */}
          <GoogleLogout
          clientId="1042957079851-vfdt9uj25elvk11q6h5foh4k1o687sq1.apps.googleusercontent.com"render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="logout"
            >
              Logout
            </Button>
          )}
          onLogoutSuccess={logout}
          ></GoogleLogout>
        </div>
      </div>
    </div>
    )
}

export default Navbar