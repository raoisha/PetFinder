import React, { useState, Component, useEffect } from "react";
import { useNavigate, Navigate} from 'react-router-dom';
import Navigator from "../components/Navigator";
import Axios from "axios";
import {usePosition} from './usePosition';
import { useLoginValidate } from "../components/Validate";
import saddog from "../images/sad-dog.png";
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

    const user_id = sessionStorage.getItem('user_id');
    
    const [record, setRecord] = useState(false);

    const { loading, userData } = useLoginValidate();
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
        const objectUrl = URL.createObjectURL(selectedFile);
        /*setlostPetDetails({...lostPetDetails, 
            pet_photo: objectUrl
        });*/
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
            setlostPetDetails({...lostPetDetails, 
                pet_photo: result
            });
        });

        setSelectedFile(e.target.files[0]);
    }

    const enterLostPetInfo = () => {
        let userid = userData.user_id 
        let lat = latitude.toString();
        let longit = longitude.toString();
        lostPetDetails.latitude = lat;
        lostPetDetails.longitude = longit;

        if (lostPetDetails.pet_name.trim() === "" ||
        lostPetDetails.breed.trim() === "" ||
        lostPetDetails.color.trim() === "" )
        {
            alert("please enter pet name")
        } else
        {

        alert("Pet details entered successfully.");
        setMessage("Pet details entered successfully.");
        setRecord(true)
        Axios.post("http://localhost:3001/lostpetinfo", {
            lostPetDetails,
            userid,
            
        }).then((response) => {
            console.log(response); 
           
        })
        .catch((error) => {
            setMessage(error.response.data.err);
            setlostPetDetails(false);
        });
    }
    };

    
    
  if (record) {
    return <Navigate to="/home"></Navigate>;
  }

    const resetValues=()=>{
        setlostPetDetails("");
    }

    return (
         
        <div>
            <Navigator></Navigator>
            <div className="row justify-content-md-center lost-page-logo">
                <div className ="col-2">
                    <img  src={saddog} alt=" " width="200" height="200" align="center"/>
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
                                    <input type="text" className="form-control" id="inputName" placeholder="Name of the pet"
                                            onChange={(e) => {
                                                setlostPetDetails({...lostPetDetails,pet_name:e.target.value});
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
                                        <div className="input-group-text">Breed </div>
                                    </div>
                                    <input type="text" className="form-control" id="inputBreed" placeholder="Breed of the pet"
                                            onChange={(e) => {
                                                setlostPetDetails({...lostPetDetails,breed:e.target.value});
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
                                        <div className="input-group-text">Gender </div>
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
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-4">
                        <div className="form-group row mx-5">
                            <div className="col">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Color </div>
                                    </div>
                                    <input type="text" className="form-control" id="inputColor" placeholder=" describe pet Color"
                                            onChange={(e) => {
                                                setlostPetDetails({...lostPetDetails,color:e.target.value});
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
                                    <input type="date" className="form-control" id="inputDate" placeholder="last seen date"
                                            onChange={(e) => {
                                                setlostPetDetails({...lostPetDetails,last_seen_date:e.target.value});
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
                                    <input type="time" className="form-control" id="inputTime" placeholder="last seen time"
                                            onChange={(e) => {
                                                setlostPetDetails({...lostPetDetails,last_seen_time:e.target.value});
                                            }}/>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div className="form-group row">
                            <div className="col">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Photo </div>
                                    </div>
                                    <input type='file' id="inputPhoto" onChange={onSelectFile} 
                                    />
                                    {selectedFile &&  <img src={preview} className="m-auto" width="300" height="200"/> }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>

                <div className="form-group row  justify-content-md-center mt-5">
                    <div className="col-sm-2">
                    <button type="submit" className="btn btn-success m-3" onClick={enterLostPetInfo}>Submit</button>
                    <button type="submit" className="btn btn-danger m-2" onClick={resetValues}>Cancel</button>
                    </div>
                </div>          
            </form>    
        </div>
 
    );
   }
}
