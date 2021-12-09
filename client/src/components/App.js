import { Component } from 'react'
import '..';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/index/Home';
// import CoasterPage from './pages/CoasterList/CoasterPage';
// import CoasterDetails from './pages/CoasterDetails/DetailsPage';
import Navbar from './layouts/Navigation/Navbar.js'
import SignupPage from './pages/Signup/SignupPage';
import LoginPage from './pages/Login/LoginPage';
import AuthService from '../services/auth.service';
import Map from './pages/Map/Map'
import UserProfile from './pages/UserProfile/UserProfilePage';
// import Footer from './layout/Footer/Footer'


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedUser: undefined
        }

        this.authService = new AuthService()
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
                            <Redirect to="/" />
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
