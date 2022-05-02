import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./two.jpg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
    console.warn(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));

    navigate("/");
  };

  const clearState = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  function SubmitButton() {
    if (name && email && password) {
      return (
        <button
          id="green"
          type="submit"
          className="btn btn-success"
          onClick={collectData}
        >
          Sign Up
        </button>
      );
    } else {
      return (
        <button type="button" className="btn btn-success" disabled>
          Sign Up
        </button>
      );
    }
  }

  return (
    <>
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
                  <h4 className="title">REGISTER</h4>
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
                      placeholder=" Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name=""
                      className="form-control input_user"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlInline"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <br />
                    <button
                      type="button"
                      className="btn login_btn"
                      onClick={clearState}
                    >
                      Cancel
                    </button>
                    <SubmitButton />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
