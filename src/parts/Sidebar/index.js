import React, { useState } from "react";

import logo from "../../assets/images/musical-note.svg";
import homeIcon from "../../assets/images/bx_home.svg";
import logoutIcon from "../../assets/images/carbon_logout.svg";
import "./index.css";
import { Navigate } from "react-router-dom";

export default function Sidebar() {
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setStatus(true);
  };

  return (
    <section
      id="sidebar"
      className="d-flex flex-column flex-shrink-0 p-3 text-secondary v-100 border-end border-1"
      style={{ width: "20%" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <div className="me-2">
          <img src={logo} alt="" style={{ width: 30 }} />
        </div>
        <span className="fs-5 fw-normal" style={{ color: "#FF6E4D" }}>
          Music App
        </span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a
            href="#"
            className="d-flex align-items-center nav-link active"
            aria-current="page"
          >
            <img src={homeIcon} alt="" style={{ width: 16 }} className="me-3" />
            Home
          </a>
        </li>
        {/* <li>
          <a href="#" className="nav-link text-dark">
            <svg className="bi me-2" width="16" height="16">
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            <svg className="bi me-2" width="16" height="16">
            </svg>
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            <svg className="bi me-2" width="16" height="16">
            </svg>
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            <svg className="bi me-2" width="16" height="16">
            </svg>
            Customers
          </a>
        </li> */}
      </ul>
      <hr />
      <a
        onClick={logout}
        className="d-flex align-items-center text-dark text-decoration-none mb-3 mt-3"
        style={{ cursor: "pointer" }}
      >
        <img
          src={logoutIcon}
          alt=""
          width="24"
          height="24"
          className="rounded-circle me-2"
        />
        <p className="m-0" move>
          Logout
        </p>
      </a>
    </section>
  );
}
