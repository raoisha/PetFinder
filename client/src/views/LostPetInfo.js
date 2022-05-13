import React, { useState, useEffect} from "react";
import Axios from "axios";
import { useParams,Link} from 'react-router-dom';
import Navigator from "../components/Navigator";
import MapComponent from "./MapComponent";
import {faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLoginValidate } from "../components/Validate";


let details = {};

function LostPetInfo() {
  Axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true);
  const {userData } = useLoginValidate();
  let { id } = useParams();
  const [basi, setmageFile] = useState()
  const [message, setMessage] = useState("");
  const [mail, setMail] = useState(false);

  useEffect(() => {
    Axios.get('/api/readLostPetDetail/'+ id).then(function(res) {
        console.log(res);
        details = res.data;
        setLoading(false);
        setmageFile(res.data.photo);

      });
    }, []);

   const sendEmailToOwner=()=>{
    let pet_id = details.pet_id ;
    setMessage("Email has been Successfully sent to the Owner of the pet"); 
    setMail(true);
    Axios.post("/api/sendemail", {
      pet_id,
    }).then((response) => {
      console.log(response)
      setMessage("Email has been Successfully sent to the Owner of the pet"); 
  })
  .catch((error) => {
      setMessage(error.response.data.err);
  });
}
if (mail) {
  return (
    <form className="register-form">
      <Navigator></Navigator>
      <div className="main">
      <br />
      <br />
        <h1 style={{ textAlign: "center", color: "white" }}> {message}</h1>
        <h1 style={{ textAlign: "center", color: "white" }}> You can also reach out to the Owner on +1 {details.phonenumber}</h1>
        <h1 style={{ textAlign: "center", color: "white" }}> Thank you for Your Response</h1>
      
        <br />
        <Link to="/signin" style={{ fontSize: 35, textAlign: "center" }}>
          <h1>Return to Home Page</h1>
        </Link>
      </div>
    </form>
  );
}
  return (
    <div className="lost-pet-info">
         <Navigator></Navigator>
         <div className="row justify-content-md-center mt-5">
           <div className="col-6">
             <div className="row justify-content-md-center">
               <div className="col-5 lost-pet-photo">
                <label id="aligned-name">
                  <img className="pet-photo" src={details.photo} alt=""></img></label>
               </div>
             </div>
             <div className="row pure-u-1-3 mt-2 justify-content-md-center">
               <div className="col pure-control-group " style={{ textAlign: "center" }}>
 
                <label htmlFor="aligned-name">Pet Owner : </label>
                <label id="aligned-name"  className="mx-3">{details.fname} {details.lname}</label>
             
               </div>
             </div>
  
             <div className="row justify-content-md-center mt-3">
               <div className="col-3">
                  <button className="btn btn-primary btn-mail"  onClick={sendEmailToOwner}>
                    <FontAwesomeIcon icon={faEnvelope} />   
                    <span className="mx-2">Contact Owner</span>
                   </button>
               </div>
             </div>
           </div>
           <div className="col-6">
             <div className="row pure-u-1-3">
               <div className="pure-control-group">
                  <label htmlFor="aligned-name">Pet Name : </label>
                  <label id="aligned-name" className="mx-3">{details.pet_name}</label>
               </div>
             </div>
             <div className="row pure-u-1-3 mt-2">
               <div className="pure-control-group">
                  <label htmlFor="aligned-name">Pet Breed :  </label>
                  <label id="aligned-name"  className="answer-color mx-3">{details.breed}</label>
               </div>
             </div>
             <div className="row pure-u-1-3 mt-2">
               <div className="pure-control-group">
                <label htmlFor="aligned-name">Pet Color : </label>
                <label id="aligned-name"  className="mx-3">{details.color}</label>
               </div>
             </div>
             <div className="row pure-u-1-3 mt-2">
               <div className="pure-control-group">
                  <label htmlFor="aligned-name">Last seen Date : </label>
                  <label id="aligned-name"  className="mx-3">{details.last_seen_date}</label>
               </div>
             </div>
             <div className="row pure-u-1-3 mt-2">
               <div className="pure-control-group">
                <label htmlFor="aligned-name">Last seen Time :</label>
                <label id="aligned-name"  className="mx-3">{details.last_seen_time}</label>
               </div>
             </div>
             <div className="row pure-u-1-3">
              <label htmlFor="aligned-name"  className="my-3">Last seen Location :</label>
                  {loading ? (
                    <div className="text-center">
                      .....
                    </div>
                  ) : 
                ( <MapComponent lat={details.loc_latitude} lng={details.loc_longitude}/> )}
                
             </div>        
           </div>
         </div>
    </div>
  );

}
export default LostPetInfo;