import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "./Main";

function Navbar() {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);

  const logOut = (e) => {
    localStorage.removeItem("x-access-token");
    loginContext.loginDispatch("logout");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    if (token) {
      loginContext.loginDispatch("login");
    } else {
      loginContext.loginDispatch("logout");
    }
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav fixed-right">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {loginContext.loginState ? (
            <li>
              <button className="btn btn-default btn-danger" onClick={logOut}>
                Logout
              </button>
            </li>
          ) : (
            <div></div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
