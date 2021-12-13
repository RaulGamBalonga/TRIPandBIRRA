import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import avatar from '../../../../public/avatarprov.jpg'

const UserCard = ({ loggedUser }) => {

    const { _id, username, email, image } = loggedUser

    return (
        <Card className="user-card" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                {/* <Card.Image img src ={avatar} alt /> */}
                <Card.Title>¡Bienvenido {username}!</Card.Title>
                <Card.Text>
                    Estas registrado con el correo {email}
                </Card.Text>

                <Link to={`/favorites/${_id}`}>
                    <Button variant="primary">Favoritos</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default UserCard