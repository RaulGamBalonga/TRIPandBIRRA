import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/auth.service'
/* import { slide as Menu } from "react-burger-menu";
 */
const authService = new AuthService()


const Navigation = ({loggedUser, storeUser}) => {
    // const Navigation = (props) => {

    
    const logout = () => {
        authService.logout()
            // .then(response => props.storeUser(null))

            .then(response => storeUser(null))
            .catch(err => console.log(err))
    }

    return (

        // <Menu {...props}>
        //     {/* <Link className="menu-item" to="/">
        //         Home
        //     </Link>

        //     <Link className="menu-item" to="/bar">
        //         Bars
        //     </Link> */}

        //     {props.loggedUser ?
        //         <>
        //             <Link className="menu-item" to="/userprofile">Tu perfil</Link>,
        //             <Link className="menu-item" to="/bar">Lista bares</Link>
        //             <Link className="menu-item" to="/bar/new">Crear Bar</Link>
        //             <Link className="menu-item" to="/review/new">Escribir reseña</Link>
        //             <Link className="menu-item" as={"span"} onClick={logout}>Salir</Link>
        //         </>
        //         :
        //         <>
        //             <Link className="menu-item" to="/signup">Registro</Link>
        //             <Link className="menu-item" to="/login">Entrar</Link>
        //         </>
        //     }
        // </Menu>

        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">T&b</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/map">Mostrar mapa</Nav.Link>

                    {loggedUser ?
                        <>
                            <Nav.Link as={Link} to="/userprofile">Tu perfil</Nav.Link>,
                            <Nav.Link as={Link} to="/bar">Lista bares</Nav.Link>
                            <Nav.Link as={Link} to="/bar/new">Crear Bar</Nav.Link>

                            <Nav.Link as={"span"} onClick={logout}>Cerrar sesión</Nav.Link>
                        </>
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