import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/auth.service'
import UserProfile from '../../pages/UserProfile/UserProfilePage'

const authService = new AuthService()


const Navigation = ({ loggedUser, storeUser }) => {

    const logout = () => {
        authService.logout()
            .then(response => storeUser(null))
            .catch(err => console.log(err))
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">T&b</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/map">Mostrar mapa</Nav.Link>
                    <Nav.Link as={Link} to="/bar-list">Lista bares</Nav.Link>

                    {loggedUser ?
                        (<Nav.Link as={Link} to="/userProfile">Tu perfil</Nav.Link>,
                            <Nav.Link as={"span"} onClick={logout}>Salir</Nav.Link>)
                        :
                        <>
                            <Nav.Link as={Link} to="/signup">Registro</Nav.Link>
                            <Nav.Link as={Link} to="/login">Entrar</Nav.Link>
                        </>
                    }
                </Nav>
            </Container>
        </Navbar>

    )
}

export default Navigation
