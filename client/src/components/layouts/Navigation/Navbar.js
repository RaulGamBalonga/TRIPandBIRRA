import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import AuthService from '../../../services/auth.service'
import '../Navigation/Navbar.css'
/* import { slide as Menu } from "react-burger-menu";
 */
const authService = new AuthService()


const Navigation = ({ loggedUser, storeUser }) => {
    // const Navigation = (props) => {


    const logout = () => {
        authService.logout()
            // .then(response => props.storeUser(null))

            .then(response => storeUser(null))
            .catch(err => console.log(err))
    }

    return (

        // <Navbar className='Navi'>
        //     <Container>
        //         <Navbar.Brand href="#home">T&b</Navbar.Brand>
        //         <Nav className="me-auto">
        //             <Nav.Link as={Link} to="/map">Ver mapa</Nav.Link>

        //             {loggedUser ?
        //                 <>
        //                     <Nav.Link as={Link} to="/userprofile">Tu perfil</Nav.Link>
        //                     <Nav.Link as={Link} to="/bar">Lista bares</Nav.Link>
        //                     <Nav.Link as={Link} to="/bar/new">Crear Bar</Nav.Link>

        //                     <Nav.Link as={"span"} onClick={logout}>Cerrar sesión</Nav.Link>
        //                 </>
        //                 :
        //                 <>
        //                     <Nav.Link as={Link} to="/signup">Registro</Nav.Link>
        //                     <Nav.Link as={Link} to="/login">Entrar</Nav.Link>
        //                 </>
        //             }
        //         </Nav>
        //     </Container>
        // </Navbar>



        <>
            <div className='Navi'>
                <div >
                    <NavLink className='NavLink' to="/"><b>T&b</b></NavLink>

                    {loggedUser ?
                        <>

                            <NavLink className='NavLink' to="/userprofile">Tu perfil</NavLink>
                            <NavLink className='NavLink' to="/bar">Lista bares</NavLink>
                            <NavLink className='NavLink' to="/bar/new">Crear Bar</NavLink>

                            <NavLink className='NavLink' to='#' onClick={logout}>Cerrar sesión</NavLink>
                        </>
                        :
                        <>
                            <NavLink className='NavLink' to="/signup">Registro</NavLink>
                            <NavLink className='NavLink' to="/login">Entrar</NavLink>
                        </>
                    }
                </div>
            </div>

        </>
    )
}

export default Navigation