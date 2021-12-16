import axios from 'axios'

class UploadService {
    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/upload`,
        })
    }

    uploadImage = (image) => this.app.post("/image", image)
}

export default UploadService