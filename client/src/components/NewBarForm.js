import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BarService from '../services/bar.service'
import SimpleMap from './pages/Map/Map'
import UploadService from '../services/upload.service';
export default class NewBarForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            latitude: undefined,
            longitude: undefined,
            image: ""
        }

        this.barservice = new BarService()
        this.mapservice = new SimpleMap()
        this.uploadService = new UploadService()

    }

    // componentDidMount() {
    //     this.setState({ ...this.state, latitude: this.props.selectedLocation.latitude, longitude: this.props.selectedLocation.longitude })
    // }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedLocation !== this.props.selectedLocation) {
            this.setState({ ...this.state, latitude: this.props.selectedLocation.latitude, longitude: this.props.selectedLocation.longitude })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.barservice.createBar(this.state)
            .then(response => {

                this.props.history.push("/bar")
            })
            .catch(err => console.log(err))

    }

    handleInputChange = (e) => {
        const { name, value } = e.currentTarget

        this.setState({ [name]: value })
    }

    handleUploadChange = (e) => {

        const uploadData = new FormData()
        uploadData.append('image', e.target.files[0])

        this.uploadService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    image: response.data.cloudinary_url
                })
            })
            .catch(err => console.log(err))

    }

    render() {
        return (
            <>{this.state.latitude ?
                <p>¡Localización seleccionada con éxito!</p>
                :
                <p>Toca en el mapa donde quieres situar el nuevo bar</p>
            }

                <form onSubmit={this.handleSubmit}>
                    <form controlId="title">
                        <label>Name</label>
                        <input onChange={this.handleInputChange} value={this.state.title} name="name" type="text" />
                    </form>

                    {/* <form controlId="description">
                    <label>Latitud</label>
                    <input onChange={this.handleInputChange} value={this.state.description} name="latitude" type="text" />
                </form>

                <form controlId="length">
                    <label>Longitud</label>
                    <input onChange={this.handleInputChange} value={this.state.length} name="longitude" type="text" />
                </form> */}

                    {/*  <form className="mb-3" controlId="imageUrl">
                        <label>Url de la imagen</label>
                        <input onChange={this.handleInputChange} value={this.state.imageUrl} name="image" type="text" />
                    </form> */}


                    <Form.Group controlId="image">
                        <Form.Label> <h3>¡Sube una foto de tu bar</h3></Form.Label>
                        <Form.Control onChange={this.handleUploadChange} name="image" type="file" />
                    </Form.Group>

                    <button variant="primary" type="submit">
                        Enviar
                    </button>
                </form>
            </>
        )
    }
}



 // <Form onSubmit={this.handleSubmit}>
            //     <Form.Group className="mb-3" controlId="title">
            //         <Form.Label>Name</Form.Label>
            //         <Form.Control onChange={this.handleInputChange} value={this.state.title} name="name" type="text" />
            //     </Form.Group>

            //     <Form.Group className="mb-3" controlId="description">
            //         <Form.Label>Latitud</Form.Label>
            //         {/* {SimpleMap.onClick.lat} */}
            //         <Form.Control onChange={this.handleInputChange} value={this.state.description} name="latitude" type="text" />
            //     </Form.Group>

            //     <Form.Group className="mb-3" controlId="length">
            //         <Form.Label>Longitud</Form.Label>
            //         <Form.Control onChange={this.handleInputChange} value={this.state.length} name="longitude" type="text" />
            //     </Form.Group>

            //     <Form.Group className="mb-3" controlId="imageUrl">
            //         <Form.Label>Url de la imagen</Form.Label>
            //         <Form.Control onChange={this.handleInputChange} value={this.state.imageUrl} name="image" type="text" />
            //     </Form.Group>

            //     <Button variant="primary" type="submit">
            //         Enviar
            //     </Button>
            // </Form>
