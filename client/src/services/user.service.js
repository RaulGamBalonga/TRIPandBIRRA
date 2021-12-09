import axios from 'axios'

class UserService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/user',
            withCredentials: true
        })
    }

    // getAllUser = () => this.app.get("/allUser")
    // getOneUser = (id) => this.app.get(`/user/${id}`)
    userProfile = (username, email, image, favorites) => this.app.get('/userprofile', { username, email, image, favorites })

}

export default UserService