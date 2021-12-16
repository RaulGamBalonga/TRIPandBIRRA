import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../PagesImages/avatarprov.jpg'
import './UserProfile.css'




const UserCard = ({ loggedUser, }) => {

    const { _id, username, email, image, favorites } = loggedUser
    // console.log(loggedUser)
    return (
        <main className='centerItems'>
            <div>
                <img className='userCardImg' src={avatar} alt="Avatar" />
                <h2>¡Bienvenido {username}!</h2>
                <p>Estas registrado con el correo {email}</p>
            </div>

            <div>
                <h3>Tus bares favoritos son</h3>
                {favorites.map(bar => {
                    return (
                        <p className='favList'>{bar.name}</p>
                    )
                })}
            </div>

        </main>
    )
}

export default UserCard