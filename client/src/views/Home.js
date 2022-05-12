
import { Link } from 'react-router-dom';
import {faShieldDog } from "@fortawesome/free-solid-svg-icons";
import {faPersonCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import {faShieldCat } from "@fortawesome/free-solid-svg-icons";
import {faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navigator from "../components/Navigator";
import { useLoginValidate } from "../components/Validate";



function Home() {

  return ( 
    <div className="shoe-container mx-auto hero-pattern">
        <Navigator></Navigator>
        
        <h1 className="app-heading" style={{ textAlign: "center" }}>WELCOME TO PET FINDER</h1>

        <div className="row">
            <div className="col-3">
            <div className="row">
                <FontAwesomeIcon icon={faPersonCircleQuestion} />   
            </div>
            <div className ="row mx-5 mt-3">
                <Link to="/recordLostPet" className="btn btn-secondary btn-lg1 p-3">Record Lost Pet</Link>
            </div>
            </div>
        
            <div className="col-3">
            <div className="row">
                <FontAwesomeIcon icon={faShieldDog} />  
            </div>
            <div className ="row mx-5 mt-3">
                <Link to="/reportFoundPet" className="btn btn-secondary btn-lg1 p-3">Report Found Pet</Link>
            </div>
            </div>
            <div className="col-3">
            <div className="row">
                <FontAwesomeIcon icon={faShieldCat} />    
            </div>
            <div className ="row mx-5 mt-3">
                <Link to="/viewLostPetDetails" className="btn btn-secondary btn-lg1 p-3">View Lost Pet Details</Link>
            </div>
            </div>
            <div className="col-3">
            <div className="row">
                <FontAwesomeIcon icon={faDog} />   
            </div>
            <div className ="row mx-5 mt-3">
                <Link to="/viewFoundPetDetails" className="btn btn-secondary btn-lg1 p-3">View Found Pet Details</Link>
            </div>
            </div>
        </div>
                         
</div>
         
  );
}

export default Home;
