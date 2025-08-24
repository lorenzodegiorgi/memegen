import React from 'react';
import { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import UserContext from './userContexts';


function NavigationBar(props) {
    const userInfo = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <Navbar className="navbar-custom">
            <Container fluid className="App-header-cont pr-0 pl-0">
                <Link to={{ pathname: "/" }}>
                    <Navbar.Brand><img src="/logo2.jpeg" className="App-logo d-inline-block align-middle ml-1 mr-1" alt="" /><span className="titleBrand">Meme Generator</span></Navbar.Brand>
                </Link>
                {props.loggedIn ?
                    <>
                        <Navbar.Toggle aria-controls="navbar-nav" />
                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="ml-auto dropMenu">
                                <NavDropdown className="navbarDropMenu" title={userInfo.username} id="basic-nav-dropdown" show={showDropdown} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                                    <NavDropdown.ItemText ><Link className="navbar-dropbox-link" to={{ pathname: "/create" }}>Create</Link></NavDropdown.ItemText>
                                    <NavDropdown.Divider />
                                    <NavDropdown.ItemText><span className="navbar-dropbox-link" onClick={() => {setShowDropdown(false); props.logOut()}}>Logout</span></NavDropdown.ItemText>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                    : <Link className="navbar-icons navbarDropMenu" to={{pathname: '/create'}}>Create</Link>}
            </Container>
        </Navbar>
    )
}

export default NavigationBar;