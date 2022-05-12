import React, { useState, useEffect} from "react";
import Axios from "axios";
import { useParams} from 'react-router-dom';
import Navigator from "../components/Navigator";
import MapComponent from "./MapComponent";
import {faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLoginValidate } from "../components/Validate";


let details = {};

function FoundPetInfo() {
  Axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true);
  const {userData } = useLoginValidate();
  let { id } = useParams();
  const [basi, setmageFile] = useState()
  const [message, setMessage] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3001/displayfoundpetdetails/'+ id).then(function(res) {
        console.log(res);
        details = res.data;
        setLoading(false);
        setmageFile(res.data.photo);
      });
    }, []);

   const sendEmailToOwner=()=>{
    let pet_id = details.pet_id ;
    Axios.post("http://localhost:3001/sendemail", {
      pet_id,
    }).then((response) => {
      setMessage("email successfully sent"); 
  })
  .catch((error) => {
      setMessage(error.response.data.err);
  });
}
  
  return (
    <div className="lost-pet-info">
         <Navigator></Navigator>
         <div className="row justify-content-md-center mt-5">
           <div className="col-6">
             <div className="row justify-content-md-center">
               <div className="col-7 lost-pet-photo">
                <label id="aligned-name">
                  <img className="pet-photo" src={details.photo} alt=""></img></label>
               </div>
             </div>
             <div className="row justify-content-md-center">
               <div className="col-6 lost-pet-photo">
                <label id="aligned-name" style={{ color:"#074985"}}>Pet Founded By {details.fname} {details.lname}</label>
               </div>
             </div>
             <div className="row justify-content-md-center">
               <div className="col-8 lost-pet-photo" my-2>
                <label id="aligned-name" style={{ color: "#074985" }}>Contact +1 {details.phonenumber} for more info </label>
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
                  <label htmlFor="aligned-name">Pet Description :  </label>
                  <label id="aligned-name"  className="answer-color mx-3">{details.pet_description}</label>
               </div>
             </div>
             <div className="row pure-u-1-3 mt-2">
               <div className="pure-control-group">
                  <label htmlFor="aligned-name">Last seen Date : </label>
                  <label id="aligned-name" className="mx-3">{details.last_seen_date}</label>
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
export default FoundPetInfo;