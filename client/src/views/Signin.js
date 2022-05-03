import React, { useState, Component } from "react";
import { useNavigate, Navigate} from 'react-router-dom';
import Axios from "axios";
import { useLoginValidate } from "../components/Validate";
import Loading from "../components/Loading";
import Navigator from "../components/Navigator";

function Signin() {
  const [emailid, setEmailId] = useState("");
  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [failMsg, setFailMsg] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const { loading, userData } = useLoginValidate();

  Axios.defaults.withCredentials = true;

  const login = () => {
 
    Axios.post("http://localhost:3001/signin", {
      emailid: emailid,
      password: password,
    })
    
      .then((response) => {
        setLoginStatus(true);
      })
      .catch((error) => {
        setLoginStatus(false);
        setFailMsg(error.response.data.err);
      });
  };

  

  if (loading) {
    return <Loading></Loading>;
  }

 
  if (userData.user_id || loginStatus) {
    return <Navigate to="/home"></Navigate>;
  }

  

  return (
    <div>
    <Navigator></Navigator>
    <form className="flight-book-form">
      <div className="login-form-box">
        <div className="login-form" style={{ color: "white" }}>
          <h2 className="heading-section text-center">Sign In</h2>
          <h3 className="mb-4 text-center">Have an account?</h3>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={(e) => {
              setEmailId(e.target.value);
            }}
          />
          <br />
          <input type="password" className="form-control" placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type="button" className="btn btn-primary" onClick={login}>
            <h4>Sign In</h4>
          </button>
          <br />
          <p className="w-100 text-center">
            &mdash; Haven't registered yet &mdash;
          </p>
          <a href="register">
            <h4 style={{ color: "black", textAlign: "center" }}>Register</h4>
          </a>
        </div>
      </div>
    </form>
    </div>
    
  );
}

export default Signin;