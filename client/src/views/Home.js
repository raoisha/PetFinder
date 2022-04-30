
import { Link } from 'react-router-dom';
import img1 from '../images/img1.png';
import {faShieldDog } from "@fortawesome/free-solid-svg-icons";
import {faPersonCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import {faShieldCat } from "@fortawesome/free-solid-svg-icons";
import {faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Home() {
  return ( 
    <div className="shoe-container mx-auto">
        <h1>WELCOME</h1>
      <div className="container">
        <div className="row">
            <div className="col-6">
            <img src={img1} alt=" " width="600" height="400" />
            </div>
            <div className="col-6 text-center">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"></h5>
                                <div class="row">
                                    <FontAwesomeIcon icon={faPersonCircleQuestion} />   
                                </div>
                                <div class ="row">
                                    <div class="col-4"></div>
                                    <div class="col-4">
                                        <Link to="/recordLostPet" className="btn btn-secondary btn-lg1">Record Lost Pet</Link>
                                    </div>
                                    <div class="col-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"></h5>
                                <div class="row">
                                    <FontAwesomeIcon icon={faShieldDog} />   
                                </div>
                                <div class ="row">
                                    <div class="col-4"></div>
                                    <div class="col-4">
                                        <Link to="/reportFoundPet" className="btn btn-secondary btn-lg2">Report Found Pet</Link>
                                    </div>
                                    <div class="col-4"></div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
        <div className="row">
            <div className="col-6">
            
            </div>
            <div className="col-6 text-center">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"></h5>
                                <div class="row">
                                    <FontAwesomeIcon icon={faShieldCat} />   
                                </div>
                                <div class ="row">
                                    <div class="col-4"></div>
                                    <div class="col-4">
                                        <Link to="/viewFoundPetDetails" className="btn btn-secondary btn-lg3">View Lost Pet Details</Link>
                                    </div>
                                    <div class="col-4"></div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"></h5>
                                <div class="row">
                                    <FontAwesomeIcon icon={faDog} />   
                                </div>
                                <div class ="row">
                                    <div class="col-4"></div>
                                    <div class="col-4">
                                        <Link to="/viewFoundPetDetails" className="btn btn-secondary btn-lg3">View Found Pet Details</Link>
                                    </div>
                                    <div class="col-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
    </div>
</div>
         
  );
}

export default Home;
