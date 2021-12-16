import axios from 'axios'

class FavrService {
    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/favorites`,
            withCredentials: true
        })
    }

    getAllFav = () => this.app.get("/allFav")
    getOneFav = (id) => this.app.get(`/${id}`)
}

export default FavrService
