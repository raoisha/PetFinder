import React, { useState, Component, useEffect } from "react";
import { useNavigate, Navigate} from 'react-router-dom';
import Navigator from "../components/Navigator";
import Axios from "axios";
import {usePosition} from './usePosition';
import { useLoginValidate } from "../components/Validate";
import happydog from "../images/pet_dog_brown.png";
import redirectLogin from "../components/redirectLogin";

function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export default function ReportFoundPet() {
    const defaultValues = {
        pet_name: "",
        pet_description: "",
        last_seen_date: "",
        last_seen_time: "",
        latitude: "",
        longitude: "",
        pet_photo: "",
    };
    const user_id = sessionStorage.getItem('user_id');
    
    const [record, setRecord] = useState(false);

    const { userData } = useLoginValidate();
    const [foundPetDetails, setfoundPetDetails] = useState(defaultValues);
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [message, setMessage] = useState("");
    const {latitude, longitude, error} = usePosition();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);

    if (!user_id || user_id === '') {
        return redirectLogin();
    } else {
        Axios.defaults.withCredentials = true;

        const onSelectFile = e => {
            if (!e.target.files || e.target.files.length === 0) {
                setSelectedFile(undefined)
                return
            }

            let idCardBase64 = '';
            getBase64(e.target.files[0], (result) => {
                idCardBase64 = result;
                setfoundPetDetails({...foundPetDetails, 
                    pet_photo: result
                });
            });

            setSelectedFile(e.target.files[0]);
        }
        const enterFoundPetInfo = () => {
            let userid = userData.user_id 
            let lat = latitude.toString();
            let longit = longitude.toString();
            foundPetDetails.latitude = lat;
            foundPetDetails.longitude = longit;


            setMessage("Pet details entered successfully.");
            setfoundPetDetails(true);
            setRecord(true);
            Axios.post("http://localhost:3001/foundpetinfo", {
                foundPetDetails,
                userid,
                
            })
            .then((response) => {
                console.log(response);
                setMessage("Pet details entered successfully.");
                alert("Pet details entered successfully.");
                setRecord(true);
                
            })
            .catch((error) => {
                setMessage(error.response.data.err);
                setfoundPetDetails(false);
            });
        };

        if (record) {
                return <Navigate to="/home"></Navigate>;
        }
        
        const resetValues=()=>{
            setfoundPetDetails("");
        }
        

        return (  
            <div>
                <Navigator></Navigator>
                <div className="row justify-content-md-center lost-page-logo">
                    <div className ="col-2">
                        <img  src={happydog} alt=" " width="200" height="200" align="center"/>
                    </div>
                </div>
                <form className="lost-pet-page mt-5">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group row mx-5">
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Pet Name</div>
                                        </div>
                                        <input type="text" className="form-control" id="inputEmail3" placeholder="Name of the pet"
                                                onChange={(e) => {
                                                    setfoundPetDetails({...foundPetDetails,pet_name:e.target.value});
                                                }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group row mx-5">
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Last Seen Date </div>
                                        </div>
                                        <input type="date" className="form-control" id="inputPassword3" placeholder="last seen date"
                                                onChange={(e) => {
                                                    setfoundPetDetails({...foundPetDetails,last_seen_date:e.target.value});
                                                }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group row mx-5">
                                    <div className="col">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">Last Seen Time </div>
                                            </div>
                                            <input type="time" className="form-control" id="inputPassword3" placeholder="last seen time"
                                                    onChange={(e) => {
                                                        setfoundPetDetails({...foundPetDetails,last_seen_time:e.target.value});
                                                    }}/>
                                        </div>
                                    </div>
                            </div>   
                        </div>
                    </div>
        
                    <div className="row mt-5">
                        <div className="col-6">
                        <div className="form-group row mx-5">
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Pet Description </div>
                                        </div>
                                        <textarea type="date" className="form-control text-box" id="inputPassword3" placeholder="Enter the description of the Pet"
                                                onChange={(e) => {
                                                    setfoundPetDetails({...foundPetDetails,pet_description:e.target.value});
                                                }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group row">
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Photo </div>
                                        </div>
                                        <input type='file' onChange={onSelectFile} 
                                        />
                                        {selectedFile &&  <img src={preview} className="m-3" width="300" height="200"/> }
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="form-group row  justify-content-md-center mt-5">
                        <div className="col-sm-2">
                        <button type="submit" className="btn btn-success m-3" onClick={enterFoundPetInfo}>Submit</button>
                        <button type="submit" className="btn btn-danger m-2" onClick={resetValues}>Cancel</button>
                        </div>
                    </div>          
                </form>    
            </div>
        );
    }
}
