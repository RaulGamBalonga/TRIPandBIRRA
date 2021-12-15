import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import AuthService from '../../../services/auth.service'
import '../Navigation/Navbar.css'
import profile from '../Navigation/NavBarImg/iconoperfil.png'


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
        <>
            <div className='Navi'>
                <div >
                    <NavLink className='NavLink' to="/"><b>T&b</b></NavLink>

                    {loggedUser ?
                        <>

                            <NavLink className='NavLink' to="/userprofile"><img src={profile} alt="profileimg" /></NavLink>
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