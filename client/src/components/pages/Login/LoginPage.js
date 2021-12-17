import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/auth.service'
import './LoginPage.css'
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
            <div className='loginUp'>
                <h2>Entra a tu cuenta</h2>
                <hr />
                <div onSubmit={this.handleSubmit}>
                    <form>
                        <label>
                            <p>Tu nombre de usuario/a</p>
                            <input onChange={this.handleInputChange} value={this.state.username} name="username" type="text" placeholder="Escribe nombre de usuario/a" />
                        </label>

                        <div>
                            <label>
                                <p>Contraseña</p>
                                <input onChange={this.handleInputChange} value={this.state.pwd} name="password" type="password" placeholder="Contraseña" />
                            </label>
                        </div>

                        <button className='buttonStyle' type="submit">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        )
    }

}

export default LoginPage