import React, { Component } from "react";
import { Container } from 'react-bootstrap'
import UserService from '../../../services/user.service'
import UserCard from "./UserCard";
class UserPage extends Component {
    constructor(props) {
        super()

        this.service = new UserService()
    }

    componentDidMount() {
        this.refreshUser()
    }

    refreshUser = () => {
        this.service.getOneUser()
            .then(response => {
                const user = response.data
                this.props.storeUser(user)
            })
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Container>
                <UserCard loggedUser={this.props.loggedUser} />
            </Container>
        )
    }
}

export default UserPage