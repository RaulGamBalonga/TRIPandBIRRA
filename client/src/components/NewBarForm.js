import React, { Component } from 'react'
import BarService from '../services/bar.service'
import SimpleMap from './pages/Map/Map'
import UploadService from '../services/upload.service';
import './NewBarForm.css'
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
            <>
                <div className='newBarForm'>
                    <form onSubmit={this.handleSubmit}>
                        <form className='addpadding'>
                            <label>Nombre del bar </label>
                            <input onChange={this.handleInputChange} value={this.state.title} name="name" type="text" />
                        </form>
                        {this.state.latitude ?

                            <div className='position' >
                                <p>¡Localización seleccionada con éxito!</p>
                                <p>(Si quieres corregir la localización del bar, tienes que tocar en NUEVO BAR)</p>
                            </div>
                            :
                            <p>Toca en el mapa donde quieres situar el nuevo bar</p>
                        }

                        <form>
                            <div className='div-sep-line'></div>

                            <label> <h5>SUBE UNA FOTO DEL BAR</h5></label>

                            <input onChange={this.handleUploadChange} name="image" type="file" />
                        </form>
                        <div className='div-sep-line'></div>
                        <button className='buttonStyle' type="submit">
                            Enviar
                        </button>
                    </form>
                </div>
            </>
        )
    }
}