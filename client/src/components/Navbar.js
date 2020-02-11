import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/auth";

const Navbar = props => {
  const handleLogout = () => {
    // destroys the session on the server
    logout();
    // updates the `user` state in App
    props.setUser(null);
  };

  return (
    <Nav className="nav justify-content-end" bg="primary" style={{position: 'sticky', top: '0px', width: '100%', zIndex: '2'}}>
      {props.user ? (
        <div>
          <Link to="/myCars">Mein Fuhrpark</Link>
          <Link to="/fuelstations">Tankstellen</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <div >
          <Link to="/" >Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </Nav>
  );
};

export default Navbar;
