import axios from 'axios'

class ReviewService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/review'
        })
    }

    getAllReviews = (id) => this.app.get(`/all/${id}`)
    getOneReview = (id) => this.app.get(`/review/${id}`)
    createReview = (reviewData) => this.app.post("/new", reviewData)
}

export default ReviewService