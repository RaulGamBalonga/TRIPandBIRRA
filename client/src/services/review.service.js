import axios from 'axios'

class ReviewService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/reviews'
        })
    }

    getAllReviews = () => this.app.get("/allReviews")
    getOneReview = (id) => this.app.get(`/review/${id}`)
    createReview = (reviewData) => this.app.post("/newReview", reviewData)
}

export default ReviewService