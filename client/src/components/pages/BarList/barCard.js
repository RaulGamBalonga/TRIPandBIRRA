import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './BarPage.css'

function BarCard(props) {

    return (
        <Card className="bar-card" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.bar.image} />
            <Card.Body>
                <Card.Title>{props.bar.name}</Card.Title>
            
               <Link to={`/bar/${props.bar._id}`}>
                    <button className='buttonStyle'>Detalles</button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default BarCard




