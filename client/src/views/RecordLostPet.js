import React, { useState, Component, useEffect } from "react";
import { useNavigate, Navigate} from 'react-router-dom';
import Navigator from "../components/Navigator";
import Axios from "axios";
import {usePosition} from './usePosition';

export default function RecordLostPet() {
    const defaultValues = {
        pet_name: "",
        breed: "",
        gender: "",
        color: "",
        last_seen_date: "",
        last_seen_time: "",
        latitude: "",
        longitude: "",
        pet_photo: "",
    };
    
    const [lostPetDetails, setlostPetDetails] = useState(defaultValues);
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const history = useNavigate();
    const [message, setMessage] = useState("");
    const {latitude, longitude, error} = usePosition();
    
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setlostPetDetails({...lostPetDetails, 
            pet_photo: URL.createObjectURL(e.target.files[0])
        });
        setSelectedFile(e.target.files[0]);
    }

    const enterLostPetInfo = () => {
        let lat = latitude.toString();
        let longit = longitude.toString();
        lostPetDetails.latitude = lat;
        lostPetDetails.longitude = longit;
        Axios.post("http://localhost:3001/lostpetinfo", {
            lostPetDetails,
        })
        .then((response) => {
            setMessage("Pet details entered successfully.");
            alert("Pet details entered successfully.");
            setlostPetDetails(true);
            history.push('/home');
        })
        .catch((error) => {
            setMessage(error.response.data.err);
            setlostPetDetails(false);
        });
    };

    return (
         
        <div classname="row text-center">
            <Navigator></Navigator>
            <form>
                <div classname="form-group row">
                    <label for="inputEmail3" classname="col-sm-2 col-form-label">Pet Name</label>
                    <div classname="col-sm-10">
                        <input type="text" classname="form-control" id="inputEmail3" placeholder="Name of the pet"
                        onChange={(e) => {
                            setlostPetDetails({...lostPetDetails,pet_name:e.target.value});
                          }}/>
                    </div>
                </div>
                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Breed</label>
                    <div classname="col-sm-10">
                        <input type="text" classname="form-control" id="inputPassword3" placeholder="Breed of the pet"
                         onChange={(e) => {
                            setlostPetDetails({...lostPetDetails,breed:e.target.value});
                          }}/>
                    </div>
                </div>
                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Gender</label>
                    <div classname="col-sm-10">
                        <input type="text" classname="form-control" id="inputPassword3" placeholder="Pet Gender"
                         onChange={(e) => {
                            setlostPetDetails({...lostPetDetails,gender:e.target.value});
                          }}/>
                    </div>
                </div>
                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Color</label>
                    <div classname="col-sm-10">
                        <input type="text" classname="form-control" id="inputPassword3" placeholder=" describe pet Color"
                        onChange={(e) => {
                            setlostPetDetails({...lostPetDetails,color:e.target.value});
                          }}/>
                    </div>
                </div>

                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Last seen date</label>
                    <div classname="col-sm-10">
                        <input type="date" classname="form-control" id="inputPassword3" placeholder=" describe pet Color"
                        onChange={(e) => {
                            setlostPetDetails({...lostPetDetails,last_seen_date:e.target.value});
                          }}/>
                    </div>
                </div>
                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Last seen time</label>
                    <div classname="col-sm-10">
                        <input type="time" classname="form-control" id="inputPassword3" placeholder=" describe pet Color"
                        onChange={(e) => {
                            setlostPetDetails({...lostPetDetails,last_seen_time:e.target.value});
                          }}/>
                    </div>
                </div>

                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Photo</label>
                    <div classname="col-sm-10">
                    <input type='file' className="" onChange={onSelectFile} 
                    />
                        {selectedFile &&  <img src={preview} width="200" height="200"/> }
                    </div>
                </div>

                <div classname="form-group row">
                    <div classname="col-sm-10">
                    <button type="submit" classname="btn btn-primary" onClick={enterLostPetInfo}>Submit</button>
                    </div>
                </div>          
            </form>    
        </div>
 
    );
}
