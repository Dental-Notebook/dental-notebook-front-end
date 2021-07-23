import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { MdClose } from "react-icons/md";
// import { FiMenu } from "react-icons/fi";
import logo_dental_notebook from "../../assets/logo_dental_notebook.svg";
import "./Navbar.css";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };
  return (
    <div>
      <div className="logo-container">
        <img src={logo_dental_notebook} alt="Logo" />
      </div>
      <nav className="navBar">
        <div className="hamburger-menu">
          <input
            className="bar"
            onClick={handleToggle}
            type="checkbox"
            id="b"
          />
          <label className="hamburger-menu-label" for="b">
            <div class="bar__element one"></div>
            <div class="bar__element two"></div>
            <div class="bar__element three"></div>
          </label>
        </div>

        {/* <button onClick={handleToggle}>
        {navbarOpen ? "Menu" : <span className="navBar-lines"></span>}
      </button> */}
        {/* <button onClick={handleToggle}>
        {navbarOpen ? (
          <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
        ) : (
          <FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
        )}
      </button> */}
        <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
          <li>
            <Link to="/" className="active-link" onClick={() => closeMenu()}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/patients"
              className="active-link"
              onClick={() => closeMenu()}
            >
              Patients
            </Link>
          </li>
          <li>
            <Link
              to="/appointments"
              className="active-link"
              onClick={() => closeMenu()}
            >
              Appointments
            </Link>
          </li>
          <li>
            <Link
              to="price-list"
              className="active-link"
              onClick={() => closeMenu()}
            >
              Price List
            </Link>
          </li>
          <li>
            <Link
              to="/earnings"
              className="active-link"
              onClick={() => closeMenu()}
            >
              Earnings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
