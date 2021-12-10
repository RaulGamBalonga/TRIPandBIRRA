import axios from 'axios'

class BarService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/bar'
        })
    }

    getAllBar = () => this.app.get("/all")
    getAllBarModified = () => this.app.get("/markers")
    getOneBar = (id) => this.app.get(`/${id}`)
    createBar = (barData) => this.app.post("/new", barData)
}

export default BarService

