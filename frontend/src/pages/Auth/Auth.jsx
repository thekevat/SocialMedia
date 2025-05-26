import React from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.png";
import { useState } from "react";
import { logIn, signUp } from "../../actions/AuthAction";
import authReducer from "../../reducers/authReducer.js";

const Auth = () => {
  const dispatch = useDispatch();
  const loading=useSelector((state)=>state.authReducer.loading)
  console.log(loading);
  const [isSignUp, setIsSignUp] = useState(true);
  
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
         data.password===data.confirmpass?dispatch(signUp(data)):setConfirmPass(false);
    }
    else{
      dispatch(logIn(data));
    }
  };
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={logo} />
        <div className="webname">
          <h1>Sandesh</h1>
          <h6>Express, Connect, Transform</h6>
        </div>
      </div>
      <div className="a-right">
        <form className="InfoForm authform" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log in"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              alignSelf: "flex-end",
              fontSize: "12px",
            }}
          >
            *Confirm Password is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account. Sign up!"}
            </span>
          </div>
          <button type="submit" className="button info-button" disabled={loading}>
            {loading?"Loading...":isSignUp ? "Sign up" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Auth;
