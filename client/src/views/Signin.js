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
    <form className="row justify-content-md-center my-5">
      <div className="col-5 my-5">
        <div className="card bg-light signin-card">
      
          <div className="card-header" style={{ textAlign: "center" , backgroundColor: "rgba(98,147,62,255)",color:"white", fontWeight:3}}>Have an Account?</div>
          <div class="card-body">
            <h5 class="card-title" style={{ textAlign: "center" }}>SIGN IN</h5>
             <p class="card-text">
             <form className="">
                <div className="form-group row justify-content-md-center">
                          <div className="col-8">
                              <div class="input-group">
                                  <div class="input-group-prepend">
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
                <div className="form-group row justify-content-md-center my-4">
                            <div className="col-8">
                                <div class="input-group">
                                    <div class="input-group-prepend">
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
                <div className="form-group row justify-content-md-center">
                      <div className="col-2">
                        <button type="button" className="btn btn-primary" onClick={login}>SIGN IN</button>
                      </div>
                </div>   
          </form>
          <p className="w-100 text-center">
            &mdash; Haven't Registered Yet &mdash;
          </p>
            <a href="register">
              <h5 style={{ textAlign: "center" }}>REGISTER</h5>
            </a>
          </p>
          </div>
         
        </div>
      </div>
    </form>
    </div>
    
  );
}

export default Signin;