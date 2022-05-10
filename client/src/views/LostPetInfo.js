import React, { useState, useEffect} from "react";
import Axios from "axios";
import { useParams, useHistory} from 'react-router-dom';
import Navigator from "../components/Navigator";
import {Buffer} from 'buffer';
import MapComponent from "./MapComponent";

let details = {};


function LostPetInfo() {
  Axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const [bas, setmageFile] = useState()

  useEffect(() => {
    Axios.get('http://localhost:3001/readLostPetDetail/'+ id).then(function(res) {
        console.log(res);
        details = res.data;
        setLoading(false);

       
        let arrBuffer = res.data[0].photo.data;
        const bas = new Uint8Array(arrBuffer);
        setmageFile(bas);
         


      });
    }, []);

  
  return (
    <fieldset>
         <Navigator></Navigator>
    <div className="pure-u-1-3"></div>

        <div className="pure-u-1-3">
            <div className="pure-control-group">
            <label htmlFor="aligned-name">Pet Name: </label>
            <div id="aligned-name">{details.pet_name}</div>
            </div>

            <div className="pure-control-group">
            <label htmlFor="aligned-name">Pet Breed: </label>
            <label id="aligned-name">{details.breed}</label>
            </div>

            <div className="pure-control-group">
            <label htmlFor="aligned-name">Pet Color: </label>
            <label id="aligned-name">{details.color}</label>
            </div>

            <div className="pure-control-group">
            <label htmlFor="aligned-name">Last seen Date: </label>
            <label id="aligned-name">{details.last_seen_date}</label>
            </div>

            <div className="pure-control-group">
            <label htmlFor="aligned-name">last seen Time:</label>
            <label id="aligned-name">{details.last_seen_time}</label>
            </div>

            <div className="pure-control-group">
            <label htmlFor="aligned-name">Photo :</label>
            <label id="aligned-name"><img src={`data:image/png;base64,${bas}`} alt=""></img></label>
            </div>

           
        </div>
        <div className="pure-controls">
            <button className="pure-button pure-button-primary" >
                Contact Owner
            </button>
          </div>
        <br/>
        <br/>

        <div className="pure-u-1-3">
          <MapComponent />
        </div>

    </fieldset>
  );

}
export default LostPetInfo;