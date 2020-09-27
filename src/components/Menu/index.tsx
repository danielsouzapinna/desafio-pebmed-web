import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.png';

const Menu: React.FC = () => {
  return (
    <Navbar bg="secondary" variant="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img src={logoImg} alt="Logo ProntoMED" width="30" height="30" className="d-inline-block align-top" />
        ProntoMED
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/patients">
            Pacientes
          </Nav.Link>
          <Nav.Link as={Link} to="/appointments">
            Agendamentos
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
