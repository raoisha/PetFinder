import './App.css';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import { useState } from 'react';
import Navigator from './components/Navigator';
import Home from './views/Home';
import ReportFoundPet from './views/ReportFoundPet';
import RecordLostPet from './views/RecordLostPet';
import ViewLostPetDetails from './views/ViewLostPetDetails';
import ViewFoundPetDetails from './views/ViewFoundPetDetails';
import Signin from './views/Signin';
import Register from './views/Register';



function App() {
  
  return (
    <div className="App">
      <Router>
        <Navigator />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/reportFoundPet" element={<ReportFoundPet />} /> 
          <Route path="/recordLostPet" element={<RecordLostPet />} /> 
          <Route path="/viewLostPetDetails" element={<ViewLostPetDetails />} /> 
          <Route path="/viewfoundPetDetails" element={<ViewFoundPetDetails />} />
          <Route path="/signin" element={<Signin />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="*" element={<Home />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
