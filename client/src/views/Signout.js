import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Navigator from "../components/Navigator";

const Signout = () => {
  Axios.defaults.withCredentials = true;
  const [loggedOut, setLoggedout] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3001/signout").then((response) => {
      console.log("logged out");
      setLoggedout(true);
    });
  }, []);
  if(loggedOut){
    return (
      
      <>
      <Navigator></Navigator>
        <div className="main">
          <h1 style={{textAlign:"center"}}>Successfully logged out</h1>
        </div>
        <Link to="/" className="button-xlarge pure-button">Go to Home Page</Link>
      </>
    );
  }else{
    return <><Navigator></Navigator>Please try again.</>
  }
};

export default Signout;
