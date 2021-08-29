import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "routes/logo.jpg";

const Navigation = ({ userObj }) => (
  <nav className="nav">
    <ul
      style={{
        top: "2%",
        right: "50%",
        height: "100%",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <ul className="nav-container">
        <li className="nav-home-logo">
          <Link to="/" style={{ marginRight: 10 }}>
            <img
              name="logo"
              src={logo}
              width="100"
              height="50"
              border="3"
              alt=""
            />
          </Link>
        </li>
        <li className="nav-home-faUser">
          <Link
            to="/profile"
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <FontAwesomeIcon icon={faUser} color={"#1e1e1e"} size="2x" />
            <span style={{ marginTop: 10, color: "black" }}>
              {userObj.displayName
                ? `${userObj.displayName}의 프로필`
                : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </ul>
  </nav>
);
export default Navigation;
