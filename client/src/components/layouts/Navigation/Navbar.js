import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import AuthService from '../../../services/auth.service'
import '../Navigation/Navbar.css'
import profile from '../Navigation/NavBarImg/profile.png'
import bars from '../Navigation/NavBarImg/beers.png'
import newbar from '../Navigation/NavBarImg/newbar.png'
import goout from '../Navigation/NavBarImg/logout.png'
import signin from '../Navigation/NavBarImg/signin.png'
import login from '../Navigation/NavBarImg/login.png'
import logo from '../Navigation/NavBarImg/logo.png'

const authService = new AuthService()


const Navigation = ({ loggedUser, storeUser }) => {
    
    const logout = () => {
        authService.logout()
            
            .then(response => storeUser(null))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='Navi'>
                <div >
                    <NavLink className='NavLink' to="/"><img id='NavLogo' src={logo} alt="profileimg" /></NavLink>

                    {loggedUser ?
                        <>

                            <NavLink className='NavLink' to="/userprofile"><img src={profile} alt="profileimg" /></NavLink>
                            {/* <NavLink className='NavLink' to="/bar"><img src={bars} alt="barlist" /></NavLink> */}
                            <NavLink className='NavLink' to="/bar/new"><img src={newbar} alt="createbar" /></NavLink>
                            <NavLink className='NavLink' to='/' onClick={logout}><img src={goout} alt="logout" /></NavLink>
                        </>
                        :
                        <>
                            <NavLink className='NavLink' to="/signup"><img src={signin} alt="signup" /></NavLink>
                            <NavLink className='NavLink' to="/login"><img src={login} alt="profileimg" /></NavLink>
                        </>
                    }
                </div>
            </div>

        </>
    )
}

export default Navigation