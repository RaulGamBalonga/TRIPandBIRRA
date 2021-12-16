import axios from 'axios'

class BarService {
    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/bar`,
            withCredentials: true
        })
    }

    getAllBar = () => this.app.get("/all")
    getAllBarModified = () => this.app.get("/markers")
    getOneBar = (id) => this.app.get(`/${id}`)
    createBar = (barData) => this.app.post("/new", barData)
}

export default BarService

