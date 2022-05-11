import React, { useState, useEffect} from "react";
import Axios from "axios";
import { useParams, useHistory} from 'react-router-dom';
import Navigator from "../components/Navigator";
import {Buffer} from 'buffer';
import MapComponent from "./MapComponent";

let details = {};

// public method for encoding an Uint8Array to base64
function encode (input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
      chr1 = input[i++];
      chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
      chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
          enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
          enc4 = 64;
      }
      output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return output;
}

function _arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
     binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

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

       debugger;
        let blob = res.data.photo.data;
        setmageFile(_arrayBufferToBase64(blob));
         


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
            <label id="aligned-name">
              <img className="pet-photo" src={`data:image/png;base64, ${bas}`} alt=""></img></label>
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