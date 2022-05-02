import React, { useEffect } from "react";
import logo from "./two.jpg";
import { Link, useNavigate } from "react-router-dom";
const Userlogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please enter connect details");
    }
  };

  return (
    // <div className='login'>
    //     <h1>Login</h1>
    //     <input type="text" className="inputBox" placeholder='Enter Email'
    //         onChange={(e) => setEmail(e.target.value)} value={email} />
    //     <input type="password" className="inputBox" placeholder='Enter Password'
    //         onChange={(e) => setPassword(e.target.value)} value={password} />
    //     <button onClick={handleLogin} className="appButton" type="button">Login</button>
    // </div>

    <div className="mor">
      <div className="container h-100">
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src={logo} className="brand_logo" alt="Logo" />
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name=""
                    className="form-control input_user"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name=""
                    className="form-control input_pass"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="password"
                  />
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customControlInline"
                    />
                    <label
                      className="custom-control-label"
                      for="customControlInline"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  <button
                    type="button"
                    onClick={handleLogin}
                    name="button"
                    className="btn login_btn"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-center links">
                Don't have an account?{" "}
                <Link to="/SignUp" className="ml-2">
                  Sign Up
                </Link>
              </div>
              <div className="d-flex justify-content-center links">
                <a href="#">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlogin;
