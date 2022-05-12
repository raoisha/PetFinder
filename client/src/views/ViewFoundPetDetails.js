import React, { useState, Component, useEffect } from "react";
import { useNavigate, Navigate} from 'react-router-dom';
import Navigator from "../components/Navigator";
import Axios from "axios";


var rows = [];
var bas="";

function ViewFoundPetDetails() {

    Axios.defaults.withCredentials = true;
    const history=useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [base64String, setmageFile] = useState()
    
    const itemClick = (event) =>{
        let id = event.target.parentElement.dataset.key;
        history("/viewFoundPetDetails/" + id);
    }
   
    useEffect(() => {
        Axios.get('http://localhost:3001/displayfoundpetlist').then(function(res) {
            console.log(res);
            rows = res.data;
            setLoading(false);
        }).then(function(error) {
            console.log(error);
        });
    }, []);
 
    return (
        <div>
            <Navigator></Navigator>
            <table className="table p-auto">
        <thead>
            <tr>
                <th scope="col">Pet ID</th>
                <th scope="col">Pet Name</th>
                <th scope="col">Pet description</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Photo</th>
            </tr>
        </thead>
        <tbody>
            {rows.map(res =>
                <tr key={res.pet_id} data-key={res.pet_id} onClick={itemClick}>
                 <td>{res.pet_id}</td>
                  <td>{res.pet_name}</td>
                  <td>{res.description}</td>
                  <td>{res.last_seen_date}</td>
                  <td>{res.last_seen_time}</td>
                  <td><img src={res.photo} alt=""></img></td>
                </tr>
            )}
        </tbody>
    </table>

        </div>
    );
}
export default ViewFoundPetDetails;