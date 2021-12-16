import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BarService from '../services/bar.service'
import SimpleMap from './pages/Map/Map'

export default class NewBarForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            latitude: "",
            longitude: "",
            image: ""
        }

        this.service = new BarService()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.service.createBar(this.state)
            .then(response => {

                this.props.history.push("/bar")
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

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Latitud</Form.Label>
                    {/* {SimpleMap.onClick.lat} */}
                    <Form.Control onChange={this.handleInputChange} value={this.state.description} name="latitude" type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="length">
                    <Form.Label>Longitud</Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.length} name="longitude" type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="imageUrl">
                    <Form.Label>Url de la imagen</Form.Label>
                    <Form.Control onChange={this.handleInputChange} value={this.state.imageUrl} name="image" type="text" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        )
    }
}
