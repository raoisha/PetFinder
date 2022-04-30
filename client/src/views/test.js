
import { Link } from 'react-router-dom';
import lostdoglogo from '../images/lostdog.jpeg';

function Home() {
 
  return (
      
    <div className="shoe-container mx-auto">
        <h1>WELCOME</h1>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Record Lost Pet</h5>
                <img src={lostdoglogo} alt=" " width="100" height="100" />
                <Link to="/recordLostPet" className="btn btn-secondary btn-lg">
                </Link>
              </div>
            </div>
          </div>
          <div className="col text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Report Found Pet</h5>
                <img src={lostdoglogo} alt=" " width="100" height="100" />
                <Link to="/reportFoundPet" className="btn btn-secondary btn-lg">
                </Link>
              </div>
            </div>
          </div>
          </div>
          <div className="row">
          <div className="col text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">View Lost Pet Details</h5>
                <img src={lostdoglogo} alt=" " width="100" height="100" />
                <Link to="/viewFoundPetDetails" className="btn btn-secondary btn-lg">
                </Link>
              </div>
            </div>
          </div>

          <div className="col text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">View Found Pet Details</h5>
                <img src={lostdoglogo} alt=" " width="100" height="100" />
                <Link to="/viewLostPetDetails" className="btn btn-secondary btn-lg">
                </Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}

export default Home;