import { Component } from 'react'
import '..';
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './layouts/Navigation/Navbar.js'
import SignupPage from './pages/Signup/SignupPage';
import LoginPage from './pages/Login/LoginPage';
import AuthService from '../services/auth.service';
import Map from './pages/Map/Map'
import UserProfile from './pages/UserProfile/UserProfilePage';
import BarPage from "./pages/BarList/BarPage";
import NewBarForm from './NewBarForm';
// import Footer from './layout/Footer/Footer'

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

                <Navbar storeUser={this.storeUser} loggedUser={this.state.loggedUser} />
                <main>
                    <Switch>

                        {this.state.loggedUser ?

                            <>   
                            
                                <Redirect to="/" /> 
                                <Route exact path="/bar" render={(props) => <BarPage {...props} storeUser={this.storeUser} />} />
                                <Route exact path="/bar/new" render={(props) => <NewBarForm {...props} storeUser={this.storeUser} />} />                          
                                <Route path="/userprofile" render={(props) => <UserPage {...props} loggedUser={this.state.loggedUser} storeUser={this.storeUser} />} />
                            </>
                            :
                            
                            <>
                                <Route path="/signup" render={(props) => <SignupPage {...props} storeUser={this.storeUser} />} />
                                <Route path="/login" render={(props) => <LoginPage {...props} storeUser={this.storeUser} />} />
                                <Route path="/login" render={(props) => <UserProfile {...props} storeUser={this.storeUser} />} />
                                
                            </>
                        }
                    </Switch>
                    <Map />
                </main>

                {/* <Footer /> */}
            </>
        )
    }
}

export default App;
