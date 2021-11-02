import axios from 'axios'
import React, { useContext } from 'react'
import { UserContext } from '../hooks/UserContext'
import { Container, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'


const Nav = () => {
    const {user} = useContext(UserContext)
    const logout = () => {
        axios.post('/logout').then(()=>{
            window.location.href="/"
        })
    }
    const history = useHistory()
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
                        <NavDropdown title="Report">
                            <NavDropdown.Item onClick={()=>{
                                history.push('/summary/qty')
                            }}>Summary Report Order Qty</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{
                                history.push('/summary/date')
                            }}>Summary Report Order per date</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{
                                history.push('/summary/item')
                            }}>Summary Report Order per Item</NavDropdown.Item>
                        </NavDropdown>
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