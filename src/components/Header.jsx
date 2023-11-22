import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import AuthButtons from '../Auth/AuthButtons';
import ProfileDropdown from '../Auth/ProfileDropdown';
import Logo from '../../assets/logo.png';
import './Header.css';


const Header = () => {

  return (
    <>
      <Navbar fixed='top' expand='lg' className='bg-body-tertiary header'>
        <Container fluid>
          <Navbar.Brand href='/' id='brand-name'>
          <img className='logo' src={Logo} alt="Map Placeholder" />
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
          <ProfileDropdown/>
          <AuthButtons />
        </Container>
      </Navbar>
    </>
  );
};

export default withAuth0(Header);
