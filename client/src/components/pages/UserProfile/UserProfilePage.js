import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import AuthService from '../../../services/auth.service'


class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            image: '',
            favorites: ''
        }

        this.authService = new AuthService()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.authService.signup(this.state.username, this.state.email, this.state.image, this.state.favorites)
            .then(response => {
                this.props.storeUser(response.data)
            })

            .catch(err => console.log(err.response.data.message))
    }

    handleInputChange = (e) => {
        const { name, value } = e.currentTarget

        this.setState({ [name]: value })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <h2>Tu Perfil</h2>

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Tu nombre de usuario/a</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" placeholder="Elige un nombre de usuario/a" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Tu correo electrónico</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.email} name="email" type="text" placeholder="email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" placeholder="Contraseña" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Registrate
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default UserProfile