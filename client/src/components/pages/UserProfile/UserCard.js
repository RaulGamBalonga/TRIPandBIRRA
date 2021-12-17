import React from 'react'
import avatar from '../PagesImages/logo.png'
import './UserProfile.css'

const UserCard = ({ loggedUser, }) => {

    const {  username, email, favorites } = loggedUser
    return (
        <main className='centerItems userCard'>
            <div>
                <img className='userCardImg' src={avatar} alt="Avatar" />
                <h2>¡Bienvenido/a {username}!</h2>
                <p>Tu correo electrónico es {email}</p>
            </div>
            <div>
                <h3>Tus bares favoritos son</h3>
                {favorites.map(bar => {
                    return (
                        <>
                            <div className='div-sep-line'></div>
                            <h5 className='favList'>{bar.name}</h5>
                        </>
                    )
                })}
            </div>
        </main>
    )
}

export default UserCard