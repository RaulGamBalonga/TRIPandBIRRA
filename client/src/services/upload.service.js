import axios from 'axios'

class UploadService {
    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5005/api/upload'
        })
    }

    uploadImage = (image) => this.app.post("/image", image)
}

export default UploadService