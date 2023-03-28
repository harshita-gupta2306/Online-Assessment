import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const Header = () => {
    return (
        <Navbar bg="info" variant="dark" style={{background:'black'}}>
            <Container>
                <Navbar.Brand href="#home">Skill Test</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header