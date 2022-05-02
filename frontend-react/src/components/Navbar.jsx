import React from "react";
import logo from "./two.jpg";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <img alt="logo" className="logo" src={logo} />
        {auth ? (
        <ul className="nav-ul">
          <li id="htwo">
            <Link to="/signup">
              <b>Pro-Manager |</b>
            </Link>
          </li>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (

        <ul className="nav-ul nav-right">
          <li id="hthree">
            <Link to="/signup">
              <b>Pro-Manager |</b>
            </Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/Userlogin">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
