import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import AuthService from '../../../services/auth.service'

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
        }

        this.authService = new AuthService()
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.authService.login(this.state.username, this.state.password)
            .then(response => {
                this.props.storeUser(response.data)

                this.props.history.push("/")

            })
            .catch(err => console.log(err.response.data.message))
    }

    handleInputChange = (e) => {
        const { name, value } = e.currentTarget

        this.setState({ [name]: value })
    }

    render() {
        return (
            (
                <Container>
                    <Row>

                        <Col md={{ span: 4, offset: 4 }}>
                            <h2>Entra a tu cuenta</h2>

                            <hr />

                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Tu nombre de usuario/a</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" placeholder="Escribe nombre de usuario/a" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.pwd} name="password" type="password" placeholder="Contraseña" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Entrar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>)
        )
    }

}

export default LoginPage