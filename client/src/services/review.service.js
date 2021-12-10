import axios from 'axios'

class ReviewService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/review'
        })
    }

    getAllReviews = () => this.app.get("/all")
    getOneReview = (id) => this.app.get(`/review/${id}`)
    createReview = (reviewData) => this.app.post("/new", reviewData)
}

export default ReviewService