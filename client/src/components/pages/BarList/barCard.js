import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './BarPage.css'

function BarCard(props) {
    


    return (
        <>

            <Card className="bar-card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.bar.image} />
                <Card.Body>
                    <Card.Title>{props.bar.name}</Card.Title>
                    <Card.Text>
                        {props.bar.location.coordinates[0]}
                    </Card.Text>
                    <Card.Text>
                        {props.bar.location.coordinates[1]}
                    </Card.Text>


                    <Link to={`/bar/${props.bar._id}`}>
                        <Button variant="primary">Detalles</Button>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default BarCard




