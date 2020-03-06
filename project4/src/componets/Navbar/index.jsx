import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import './style.css'
import {
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
  FormControl
} from "react-bootstrap";


import firebase from "../../resources/FireBase/firebase";

const NavBar = ({ isLoggedIn, currentUser }) => {
  const logoutUser = async () => {
    try {
      await firebase.doSignOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar className="Navbar" variant="light" bg="#16e060" expand="lg">
      <Navbar.Brand href="/">The Peoples Market</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink style={{color:' #fad250'}}exact to="/" className="nav-link">
            Home
          </NavLink >
          {isLoggedIn ? (
            <>
              <span style={{color:' #fad250'}}
                className={"nav-link"}
                onClick={logoutUser}
              >
                Logout
              </span>
            </>
          ) : (
          <NavLink exact to="/login" className="nav-link" style={{color:' #fad250'}}>
              Login
            </NavLink>
          )
          }
          <NavLink exact to="/user" style={{color:' #fad250'}} className="nav-link">
            Profile
          </NavLink>
          <NavDropdown style={{color:' #fad250'}} title="Tickets" id="basic-nav-dropdown" >
            <NavDropdown.Item>
              <NavLink exact to="/tickets"  style={{color:' #fad250'}}>
                {" "}
                Browse{" "}
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink exact to="/create"  style={{color:' #fad250'}}>
                Make a Ticket
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};


export default NavBar;
