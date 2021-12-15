import axios from 'axios'

class UserService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/user',
            withCredentials: true
        })
    }

    getAllUser = () => this.app.get("/allUser")
    getOneUser = () => this.app.get('/one')
    userPage = (username, email, image, favorites) => this.app.get('/userprofile', { username, email, image, favorites })
    addUserFav = (barId) => this.app.put('/add-favorites', {barId})

}

export default UserService