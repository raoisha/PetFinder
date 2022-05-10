import React, { useState, Component, useEffect } from "react";
import { useNavigate, Navigate} from 'react-router-dom';
import Navigator from "../components/Navigator";
import Axios from "axios";
import {Buffer} from 'buffer';

var rows = [];
var bas="";

function ViewLostPetDetails() {

    Axios.defaults.withCredentials = true;
    const history=useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [base64String, setmageFile] = useState()
    
    const itemClick = (event) =>{
        let id = event.target.parentElement.dataset.key;
        history("/viewLostPetDetails/" + id);
    }
   
    useEffect(() => {
        Axios.get('http://localhost:3001/displaylostpetinfo').then(function(res) {
            console.log(res);
            rows = res.data;
            let arrayBuffer = res.data[0].photo.data;
            let xyz = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
            setmageFile(xyz);

            let arrBuffer = res.data[0].photo.data;
            bas = new Buffer.from(arrBuffer).toString('base64')

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
                <th scope="col"> Pet Name</th>
                <th scope="col">Pet Breed</th>
                <th scope="col">Pet Gender</th>
                <th scope="col">Pet Color</th>
                <th scope="col"> Date</th>
                <th scope="col">Time</th>
                <th scope="col">Photo</th>
            </tr>
        </thead>
        <tbody>
            {rows.map(res =>
                <tr key={res.pet_id} data-key={res.pet_id} onClick={itemClick}>
                 <td>{res.pet_id}</td>
                  <td>{res.pet_name}</td>
                  <td>{res.breed}</td> 
                  <td>{res.gender}</td>
                  <td>{res.color}</td>
                  <td>{res.last_seen_date}</td>
                  <td>{res.last_seen_time}</td>
                  <td><img src={`data:image/png;base64,${bas}`} alt=""></img></td>
                </tr>
            )}
        </tbody>
    </table>

        </div>
    );
}
export default ViewLostPetDetails;