import { Component } from 'react'
import React from "react";
import '..';
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './layouts/Navigation/Navbar.js'
import SignupPage from './pages/Signup/SignupPage';
import LoginPage from './pages/Login/LoginPage';
import AuthService from '../services/auth.service';
import Map from './pages/Map/Map'
import BarPage from "./pages/BarList/BarPage";
import NewBarForm from './NewBarForm';
import NewReviewForm from './NewReviewForm'
import BarDetails from './pages/BarDetails/BarDetails';
import '../components/App.css'

import UserPage from './pages/UserProfile/UserPage';
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedUser: undefined,
            selectedLocation: {}
        }

        this.authService = new AuthService()
        this.userPage = new UserPage()

    }

    componentDidMount() {
        this.authService.isloggedin()
            .then(response => this.storeUser(response.data))
            .catch(err => this.storeUser(null))
    }

    storeUser = (user) => {
        this.setState({ ...this.state, loggedUser: user })
    }

    storeSelectedLocation = (latitude, longitude) => {
        this.setState({ ...this.state, selectedLocation: { latitude, longitude } })
    }

    render() {
        return (
            <>
                <div id='superContainer'>
                    <Navbar storeUser={this.storeUser} loggedUser={this.state.loggedUser} pageWrapId={"page-wrap"} outerContainerId={"App"} />
                    <main>

                        {this.state.loggedUser ?

                            <Switch>
                                <Route exact path="/bar" render={(props) => <BarPage {...props} storeUser={this.storeUser} />} />
                                <Route exact path="/bar/new" render={(props) => <NewBarForm {...props} storeUser={this.storeUser} selectedLocation={this.state.selectedLocation} />} />
                                <Route exact path="/bar/:id" render={(props) => <BarDetails {...props} storeUser={this.storeUser} />} />
                                <Route path="/userprofile" render={(props) => <UserPage {...props} loggedUser={this.state.loggedUser} storeUser={this.storeUser} />} />
                                <Route exact path="/review/new/:id" render={(props) => <NewReviewForm {...props} storeUser={this.storeUser} />} />
                                <Redirect to="/" />
                            </Switch>
                            :
                            <Switch>
                                <Route path="/signup" render={(props) => <SignupPage {...props} storeUser={this.storeUser} />} />
                                <Route path="/login" render={(props) => <LoginPage {...props} storeUser={this.storeUser} />} />
                                <Redirect to="/" />
                            </Switch>
                        }
                        <div >
                            <Map storeSelectedLocation={this.storeSelectedLocation} />
                        </div>
                    </main>
                </div>

            </>

        )

    }

}

<Route exact path="/review/new" render={(props) => <NewReviewForm {...props} storeUser={this.storeUser} />} />
export default App;
