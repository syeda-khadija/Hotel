import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const isLoggedIn = localStorage.getItem("User_Data");

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
              <div className="full">
                <div className="center-desk">
                  <div className="logo">
                    <Link to="/"><img src="./images/logo.png" alt="Logo" /></Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
              <nav className="navigation navbar navbar-expand-md navbar-dark">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarsExample04"
                  aria-controls="navbarsExample04"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample04">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/a">About</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/r">Our room</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/feed">Feedback</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/checkin">Check in</Link>
                    </li>

                    {isLoggedIn ? (
                      <li className="nav-item">
                        <Link to="/logout" className="btn btn-danger ms-2">Logout</Link>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <Link to="/reg">
                          <button type="button" className="btn btn-outline-danger ms-2">Sign up</button>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
