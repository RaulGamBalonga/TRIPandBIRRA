import React, { Component } from 'react'
import AuthService from '../../../services/auth.service'

class SignupPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            email: '',
        }

        this.authService = new AuthService()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.authService.signup(this.state.username, this.state.password, this.state.email)
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
            <div>
                <h2>Registrate</h2>
                <hr />
                <div onSubmit={this.handleSubmit}>
                    <form>
                        <label>
                            <p>Tu nombre de usuario/a</p>
                            <input onChange={this.handleInputChange} value={this.state.username} name="username" type="text" placeholder="Escribe nombre de usuario/a" />
                        </label>
                        <br />
                        <label>
                            <p>Tu correo electrónico</p>
                            <input onChange={this.handleInputChange} value={this.state.email} name="email" type="text" placeholder="email" />
                        </label>

                        <div>
                            <label>
                                <p>Contraseña</p>
                                <input onChange={this.handleInputChange} value={this.state.password} name="password" type="password" placeholder="Contraseña" />
                            </label>
                        </div>

                        <button type="submit">
                            Registrate
                        </button>
                    </form>
                </div>
            </div>
        )
    }

}

export default SignupPage