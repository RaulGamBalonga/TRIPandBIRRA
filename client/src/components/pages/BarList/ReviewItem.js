import React from "react";
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function ReviewItem({ review }) {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{review.drink}</Card.Title>
                <Card.Text>{review.comment}
                </Card.Text>



            </Card.Body>
        </Card>
    )
}

export default ReviewItem

/* comment, image, drink, tapa, price, quality, rating, creator, bar */