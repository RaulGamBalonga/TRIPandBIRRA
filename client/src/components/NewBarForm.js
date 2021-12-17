import React, { Component } from 'react'
import BarService from '../services/bar.service'
import SimpleMap from './pages/Map/Map'
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

    render() {
        return (
            <>
                <div className='newBarForm'>
                    <form onSubmit={this.handleSubmit}>
                        <form className='addpadding'>
                            <label>Name</label>
                            <input onChange={this.handleInputChange} value={this.state.title} name="name" type="text" />
                        </form>

                        <form className='addpadding'>
                            <label>Url de la imagen</label>
                            <input onChange={this.handleInputChange} value={this.state.imageUrl} name="image" type="text" />
                        </form>
                        <p>¡Toca en el mapa el lugar donde está el bar! Te rogamos aumentes el zoom en el mapa para mejorar la localización</p>
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