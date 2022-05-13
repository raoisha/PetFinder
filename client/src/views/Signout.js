import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Navigator from "../components/Navigator";

const Signout = () => {
  Axios.defaults.withCredentials = true;
  const [loggedOut, setLoggedout] = useState(false);
  useEffect(() => {
    Axios.get("/api/signout").then((response) => {
      console.log("logged out");
      sessionStorage.setItem('user_id', '');
      setLoggedout(true);
    });
  }, []);
  if(loggedOut){
    return (
      <div className="register-form">
      <Navigator></Navigator>
        <div className="main">
          <h1 style={{textAlign:"center"}}>Successfully logged out</h1>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-3">
            <Link to="/home" className="return-to-home mx-5" style={{fontsize:"30"}}>Return To Home Page</Link>
          </div>
          
        </div>
        
      </div>
    );
  }else{
    return <><Navigator></Navigator>Please try again.</>
  }
  
};

export default Signout;
