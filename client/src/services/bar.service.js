import axios from 'axios'

class BarService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/bar'
        })
    }

    getAllBar = () => this.app.get("/allBar")
    getOneBar = (id) => this.app.get(`/bar/${id}`)
    createBar = (barData) => this.app.post("/newBar", barData)
}

export default BarService