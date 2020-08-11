import React from 'react';
import logo from "../assets/kanban.png";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login';

function Navbar() {
  const history = useHistory()
  const { signOut } = useGoogleLogout({
    clientId: "1042957079851-vfdt9uj25elvk11q6h5foh4k1o687sq1.apps.googleusercontent.com"
  })
  const logout = () => {
    localStorage.clear()
    signOut()
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
          <Button className="logout" onClick={logout} >Logout</Button>
        </div>
      </div>
    </div>
    )
}

export default Navbar