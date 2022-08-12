import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <a href="#">About</a>
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">Contact us</a>
      </nav>

      <div className="search">
        <input
          type="text"
          placeholder="search here"
          name="search"
          id="search"
        />
      </div>
    </>
  );
}
