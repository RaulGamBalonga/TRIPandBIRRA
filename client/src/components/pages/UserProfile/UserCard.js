import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import avatar from '../PagesImages/avatarprov.jpg'




const UserCard = ({ loggedUser, }) => {



    const { _id, username, email, image, favorites } = loggedUser

    console.log(loggedUser)

    return (
        <Card className="user-card" style={{ width: '18rem' }}>
            <img src={avatar} alt="Avatar" />
            <Card.Body>
                <Card.Title>¡Bienvenido {username}!</Card.Title>
                <Card.Text>
                    Estas registrado con el correo {email}
                </Card.Text>
                <Card.Text>
                    <h3>Tus bares</h3>
                    {favorites.map(bar => {
                        return (<p>{bar.name}</p>)
                    })}
                </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default UserCard