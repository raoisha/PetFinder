import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import petfinderlogo from '../images/petfinderlogo.png';
import { Link } from 'react-router-dom';




function Navigator() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
              <img class="petlogo" src={petfinderlogo} alt=" " width="100" height="100" align="left" />
              </Navbar.Brand>
                <Link to="/home" className="nav-link">
                    HOME
                </Link>
                <Link to="/signin" className="nav-link">
                    SIGN IN
                </Link>
                <Link to="/register" className="nav-link">
                    CREATE ACCOUNT
                </Link>
                
            </Container>
          </Navbar>
        </Row>
      </Container>
    </div>
  );
}
export default Navigator;