import React from "react";
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function ReviewItem({ review }) {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>id de la review{review._id}</Card.Title>
                <Card.Text>{review.comment}</Card.Text>
                <Card.Text>{review.image}</Card.Text>
                <Card.Text>{review.drink}</Card.Text>
                <Card.Text>{review.tapa}</Card.Text>
                <Card.Text>{review.price}</Card.Text>
                <Card.Text>{review.quality}</Card.Text>
                <Card.Text>{review.rating}</Card.Text>
                <Card.Text>{review.creator}</Card.Text>
            



            </Card.Body>
        </Card>
    )
}

export default ReviewItem

/* comment, image, drink, tapa, price, quality, rating, creator, bar */