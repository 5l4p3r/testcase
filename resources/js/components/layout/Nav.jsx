import axios from 'axios'
import React, { useContext } from 'react'
import { UserContext } from '../hooks/UserContext'
import { Container, Navbar, NavDropdown, NavItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'


const Nav = () => {
    const {user} = useContext(UserContext)
    const logout = () => {
        axios.post('/logout').then(()=>{
            window.location.href="/"
        })
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            {user.map((item,i)=>(
                <Container key={i}>
                    <Navbar.Brand color="white">
                        <NavLink to="/home" className="text-light nav-link">Home</NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <NavLink to="/customer" className="nav-link text-light">Customer</NavLink>
                        <NavLink to="/item" className="nav-link text-light">Item</NavLink>
                        <NavLink to="/order" className="nav-link text-light">Order</NavLink>
                        <NavLink to="/report" className="nav-link text-light">Report</NavLink>
                        <div className="me-auto"></div>
                        <div className="ml-auto">
                            <NavDropdown title={item.name} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>{
                                    logout()
                                }}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Navbar.Collapse>
                </Container>
            ))}
        </Navbar>
    )
}

export default Nav