import axios from 'axios'

class FavrService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/favorites',
            withCredentials: true
        })
    }

    getAllFav = () => this.app.get("/allFav")
    getOneFav = (id) => this.app.get(`/${id}`)
}

export default FavrService
