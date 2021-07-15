import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { MdClose } from "react-icons/md";
// import { FiMenu } from "react-icons/fi";
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
    <nav className="navBar">
      <button onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</button>
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
            Apointments
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
  );
};

export default Navbar;
