import { Component } from 'react'
import React from "react";
import ReactDOM from "react-dom";
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
// import Footer from './layout/Footer/Footer'
import './pages/Menu/MenuStyles.css'

import UserPage from './pages/UserProfile/UserPage';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedUser: undefined
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
        this.setState({ loggedUser: user })
    }



    render() {
        return (
            <>
                <div id="App">
                    <Navbar storeUser={this.storeUser} loggedUser={this.state.loggedUser} pageWrapId={"page-wrap"} outerContainerId={"App"} />
                    <main>

                        {this.state.loggedUser ?

                            <Switch>
                                <Route exact path="/bar" render={(props) => <BarPage {...props} storeUser={this.storeUser} />} />
                                <Route exact path="/bar/new" render={(props) => <NewBarForm {...props} storeUser={this.storeUser} />} />
                                <Route exact path="/bar/:id" render={(props) => <BarDetails {...props} storeUser={this.storeUser} />} />
                                <Route path="/userprofile" render={(props) => <UserPage {...props} loggedUser={this.state.loggedUser} storeUser={this.storeUser} />} />
                                <Route exact path="/review/new/:id" render={(props) => <NewReviewForm {...props} storeUser={this.storeUser} />} />
                            </Switch>
                            :
                            <Switch>
                                <Route path="/signup" render={(props) => <SignupPage {...props} storeUser={this.storeUser} />} />
                                <Route path="/login" render={(props) => <LoginPage {...props} storeUser={this.storeUser} />} />
                                <Redirect to="/login" />
                            </Switch>
                        }
                        <div id="page-wrap">
                            <Map />
                        </div>
                    </main>
                </div>


                {/* <Footer /> */}

            </>

        )

    }

}

<Route exact path="/review/new" render={(props) => <NewReviewForm {...props} storeUser={this.storeUser} />} />
export default App;
