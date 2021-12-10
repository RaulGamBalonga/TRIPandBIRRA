import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import ReviewService from '../services/review.service'

export default class NewReviewForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            comment: '',
            image: '',
            drink: '',
            tapa: '',
            price: '',
            quality: '',
            rating: '',
        }
        this.service = new ReviewService()
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.service.createReview(this.state)
            .then(response => {

                this.props.history.push("/review")
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (e) => {
        const { name, value } = e.currentTarget

        this.setState({ [name]: value })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.title} name="name" type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="drink">
                    <Form.Label>Bebida</Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.title} name="name" type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tapa">
                    <Form.Label>Tapa</Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.description} name="longitude" type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.length} name="latitude" type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Url de la imagen</Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.imageUrl} name="image" type="text" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}
