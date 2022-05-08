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

    const resetValues=()=>{
        setlostPetDetails("");
    }

    return (
         
        <div className="row text-center">
            <Navigator></Navigator>
            <form className="mt-5">
                
                <div className="form-group row m-3">
                    <div className="col col-sm-5">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend w-25">
                                <div class="input-group-text">Pet Name </div>
                            </div>
                            <input type="text" className="form-control" id="inputEmail3" placeholder="Name of the pet"
                                    onChange={(e) => {
                                        setlostPetDetails({...lostPetDetails,pet_name:e.target.value});
                                    }}/>
                        </div>
                    </div>
                </div>

                <div className="form-group row m-3">
                    <div className="col col-sm-5">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend w-25">
                                <div class="input-group-text">Breed </div>
                            </div>
                            <input type="text" className="form-control" id="inputPassword3" placeholder="Breed of the pet"
                                    onChange={(e) => {
                                        setlostPetDetails({...lostPetDetails,breed:e.target.value});
                                    }}/>
                        </div>
                    </div>
                </div>

                <div className="form-group row m-3">
                    <div className="col col-sm-5">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend w-25">
                                <div class="input-group-text">Gender </div>
                            </div>
                              <select id="aligned-status" className="form-control" 
                                    onChange={(e) => {
                                        setlostPetDetails({...lostPetDetails,gender:e.target.value});
                                    }}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select> 
                        </div>
                    </div>
                </div>


                <div className="form-group row m-3">
                    <div className="col col-sm-5">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend w-25">
                                <div class="input-group-text">Color </div>
                            </div>
                            <input type="text" className="form-control" id="inputPassword3" placeholder=" describe pet Color"
                                    onChange={(e) => {
                                        setlostPetDetails({...lostPetDetails,color:e.target.value});
                                    }}/>
                        </div>
                    </div>
                </div>

                <div className="form-group row m-3">
                    <div className="col col-sm-5">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend w-25">
                                <div class="input-group-text">Last Seen Date </div>
                            </div>
                            <input type="date" className="form-control" id="inputPassword3" placeholder=" describe pet Color"
                                    onChange={(e) => {
                                        setlostPetDetails({...lostPetDetails,last_seen_date:e.target.value});
                                    }}/>
                        </div>
                    </div>
                </div>

                <div className="form-group row m-3">
                    <div className="col col-sm-5">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend w-25">
                                <div class="input-group-text">Last Seen Time </div>
                            </div>
                            <input type="date" className="form-control" id="inputPassword3" placeholder=" describe pet Color"
                                    onChange={(e) => {
                                        setlostPetDetails({...lostPetDetails,last_seen_time:e.target.value});
                                    }}/>
                        </div>
                    </div>
                </div>

                <div className="form-group row m-3">
                    <div className="col col-sm-5">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend w-25">
                                <div class="input-group-text">Photo </div>
                            </div>
                            <input type='file' onChange={onSelectFile} 
                            />
                            {selectedFile &&  <img src={preview} className="m-auto" width="300" height="200"/> }
                        </div>
                    </div>
                </div>

         

                <div className="form-group row m-3">
                    <div className="col-sm-4">
                    <button type="submit" className="btn btn-success m-3" onClick={enterLostPetInfo}>Submit</button>
                    <button type="submit" className="btn btn-danger m-2" onClick={resetValues}>Cancel</button>
                    </div>
                </div>          
            </form>    
        </div>
 
    );
}
