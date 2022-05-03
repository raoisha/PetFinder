import React, { useState, Component, useEffect } from "react";
import Navigator from "../components/Navigator";

function RecordLostPet() {


            const [selectedFile, setSelectedFile] = useState()
            const [preview, setPreview] = useState()
        
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
            }, [selectedFile])
        
            const onSelectFile = e => {
                if (!e.target.files || e.target.files.length === 0) {
                    setSelectedFile(undefined)
                    return
                }
                setSelectedFile(e.target.files[0])
            }
      
    
    return (
         
        <div classname="row text-center">
            <Navigator></Navigator>
            <form>
                <div classname="form-group row">
                    <label for="inputEmail3" classname="col-sm-2 col-form-label">Pet Name</label>
                    <div classname="col-sm-10">
                        <input type="text" classname="form-control" id="inputEmail3" placeholder="Name of the pet"/>
                    </div>
                </div>
                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Breed</label>
                    <div classname="col-sm-10">
                        <input type="text" classname="form-control" id="inputPassword3" placeholder="Breed of the pet"/>
                    </div>
                </div>
                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Gender</label>
                    <div classname="col-sm-10">
                        <input type="text" classname="form-control" id="inputPassword3" placeholder="Pet Gender"/>
                    </div>
                </div>
                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Color</label>
                    <div classname="col-sm-10">
                        <input type="text" classname="form-control" id="inputPassword3" placeholder=" describe pet Color"/>
                    </div>
                </div>

                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Last seen date</label>
                    <div classname="col-sm-10">
                        <input type="date" classname="form-control" id="inputPassword3" placeholder=" describe pet Color"/>
                    </div>
                </div>
                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Last seen time</label>
                    <div classname="col-sm-10">
                        <input type="time" classname="form-control" id="inputPassword3" placeholder=" describe pet Color"/>
                    </div>
                </div>

                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Last seen location</label>
                    <div classname="col-sm-10">
                        <input type="text" classname="form-control" id="inputPassword3" placeholder=" describe pet Color"/>
                    </div>
                </div>

                <div classname="form-group row">
                    <label for="inputPassword3" classname="col-sm-2 col-form-label">Photo</label>
                    <div classname="col-sm-10">
                    <input type='file' className="" onChange={onSelectFile} />
                        {selectedFile &&  <img src={preview} width="200" height="200"/> }
                    </div>
                </div>

                <div classname="form-group row">
                    <div classname="col-sm-10">
                    <button type="submit" classname="btn btn-primary">Submit</button>
                    </div>
                </div>          
            </form>    
        </div>
 
    );
}
export default RecordLostPet;