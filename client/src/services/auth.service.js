import axios from 'axios'

class AuthService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/auth',
            withCredentials: true
        })
    }

    signup = (username, pwd, email) => this.app.post("/signup", { username, pwd, email })
    login = (username, password) => this.app.post("/login", { username, password })
    logout = () => this.app.get("/logout")
    isloggedin = () => this.app.get("/isloggedin")
}

export default AuthService