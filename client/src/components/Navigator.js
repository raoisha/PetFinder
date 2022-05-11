import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import dogimg from '../images/pawboost-logo-mobile.png';
import { Link } from 'react-router-dom';
import { useLoginValidate } from "./Validate";



function Navigator() {

  const { userData } = useLoginValidate();

  return (
    <div>
      <Container fluid>
        <Row>
          <Navbar className="color-nav" variant="dark">
            <Container>
              <Navbar.Brand>
                <img className="petlogo" src={dogimg} alt=" " width="100" height="100" align="left"/>
                <h1 style={{ textAlign: "left" }}>Pet Finder</h1>
              </Navbar.Brand>
                <Link to="/home" className="nav-link">
                    HOME
                </Link>
                {! userData.user_id && (
               <Link to="/signin" className="nav-link">
                  SIGN IN
                </Link>
                )}
                 {!userData.user_id && (
                <Link to="/register" className="nav-link">
                    REGISTER
                </Link>
                )}
                {userData.user_id && (
                <Link to="/signout" className="nav-link">
                SIGN OUT
                </Link>
       
                )}
                
            </Container>
          </Navbar>
        </Row>
      </Container>
    </div>
  );
}
export default Navigator;