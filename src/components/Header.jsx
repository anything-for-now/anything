import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthButtons from '../Auth/AuthButtons'

const Header = () => {
  

  return (
    <>
      <Navbar fixed='top' expand='lg' className='bg-body-tertiary header'>
        <Container fluid>
          <Navbar.Brand href='/' id='brand-name'>
            Lost Hub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Link className='nav-link custom-nav-link' to='/lost'>
                Lost
              </Link>
              <Link className='nav-link custom-nav-link' to='/found'>
                Found
              </Link>
            </Nav>
          </Navbar.Collapse>
          <AuthButtons />
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
