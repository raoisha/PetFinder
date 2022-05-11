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
    <div className="login-page">
    <Navigator></Navigator>
    <form className="mt-5">
      <div className="login-form-box">
        <div className="login-form" style={{ color: "white" }}>
          <h3 className="mb-4 text-center">Have an Account?</h3>
          <h2 className="heading-section text-center">SIGN IN</h2>
          <div class="card bg-light mb-3" style="max-width: 20rem;">
      <div class="card-header">SIGN IN</div>
      <div class="card-body">
        <h5 class="card-title">Light Panel title</h5>
        <p class="card-text">Some quick example text to build on the panel title and make up the bulk of the panel's
          content.</p>
      </div>
          <form className="form-login">
          <div className="form-group row m-3">
                    <div className="col col-sm-5">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend w-25">
                                <div class="input-group-text">Email ID </div>
                            </div>
                            <input
                                type="text"
                            className="form-control"
                            placeholder="Username"
                            onChange={(e) => {
                            setEmailId(e.target.value);
                            }}
                           />
                        </div>
                    </div>
                </div>
      
                <div className="form-group row m-3">
                    <div className="col col-sm-5">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend w-25">
                                <div class="input-group-text">Password</div>
                            </div>
                            <input type="password" className="form-control" placeholder="Password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                    </div>
                </div>
                <div className="form-group row m-3">
                     <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                    <button type="button" className="btn btn-primary" onClick={login}>SIGNIN</button>
                    </div>
                    <div className="col-sm-4"></div>
                   
                </div>   

          </form>

          
          
          
          <br />
          <p className="w-100 text-center">
            &mdash; Haven't Registered Yet &mdash;
          </p>
          <a href="register">
            <h4 style={{ color: "black", textAlign: "center" }}>REGISTER</h4>
          </a>
        </div>
      </div>
    </form>
    </div>
    
  );
}

export default Signin;