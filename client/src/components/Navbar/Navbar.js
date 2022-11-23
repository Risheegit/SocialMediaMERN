import React, { useContext } from "react";
import "./navbar.css";
import { Search } from "@material-ui/icons";
//import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Djsocials</span>
        </Link>
      </div>

      <div className="navbar-center">
        <div className="searchbar">
          <Search />
          <input placeholder="Search" className="searchInput"></input>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-links">
          <span className="navbar-link">Homepage </span>
          <span className="navbar-link">Timeline </span>
        </div>
        {/* <div className="navbar-icons">
          <div className="navbar-icon">
            <Person />
            <span className="navbar-iconbadge">1</span>
          </div>
          <div className="navbar-icon">
            <Chat />
            <span className="navbar-iconbadge">2</span>
          </div>
          <div className="navbar-icon">
            <Notifications />
            <span className="navbar-iconbadge">1</span>
          </div>
        </div> */}

        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/default.jpg"
            }
            alt="Not found"
            className="navbar-pic"
          />
        </Link>
        {/* Adding a sign in button */}
        {/* <Button component={Link} to="/auth">
          {" "}
          Sign in
        </Button> */}
      </div>
    </div>
  );
}

export default Navbar;
