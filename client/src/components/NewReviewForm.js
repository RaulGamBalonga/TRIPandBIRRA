import React, { Component } from 'react'
import { ToggleButtonGroup, ToggleButton, Form, Button, } from 'react-bootstrap'
import ReviewService from '../services/review.service'
import BarService from '../services/bar.service';
import UploadService from '../services/upload.service';
import './NewReviewForm.css'

export default class NewReviewForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bar: this.props.match.params.id,
            comment: '',
            image: '',
            drink: '',
            tapa: '',
            price: '',
            quality: '',

        }
        this.barService = new BarService()
        this.reviewService = new ReviewService()
        this.barService = new BarService()
        this.uploadService = new UploadService()

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.reviewService.createReview(this.state)
            .then(response => {
                console.log(response);
                this.props.history.push(`/bar/${response.data.bar}`)
            })
            .catch(err => console.log(err))
    }

    handleToggleButton = (selectedOption, name) => {
        console.log(name, selectedOption)
        this.setState({ [name]: selectedOption })
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
                <div id='superContainer'>
                    <form onSubmit={this.handleSubmit}>
                        <hr />
                        <div className='thisCenter'>
                            <h3>¿Qué te has tomado?</h3>

                            <ToggleButtonGroup type="radio" name="drink" onChange={(value) => this.handleToggleButton(value, 'drink')}>
                                <ToggleButton id="drink-btn-1" className='me-2' value={'CERVEZA'}>
                                    Cerveza
                                </ToggleButton>
                                <ToggleButton id="drink-btn-2" className='me-2' value={'VINO'}>
                                    Vino
                                </ToggleButton>
                                <ToggleButton id="drink-btn-3" className='me-2' value={'REFRESCO'}>
                                    Refresco
                                </ToggleButton>
                                <ToggleButton id="drink-btn-4" value={'OTRO'}>
                                    Otros
                                </ToggleButton>
                            </ToggleButtonGroup >
                        </div>
                        <hr />
                        <div className='thisCenter'>
                            <h3>¿Qué te han puesto de tapa?</h3>
                            <ToggleButtonGroup className='thisCenter' type="radio" name="tapa" onChange={(value) => this.handleToggleButton(value, 'tapa')}>
                                <ToggleButton id="tapa-btn-1" className='me-2 mb-2' value={'FRUTOS SECOS (PIPAS, KIKOS, PATATAS...'}>
                                    Frutos Secos (Pipas, kikos, Patatas...)
                                </ToggleButton>
                                <ToggleButton id="tapa-btn-2" className='me-2 mb-2' value={'OLIVAS'}>
                                    Olivas
                                </ToggleButton>
                                <ToggleButton id="tapa-btn-3" className='me-2 mb-2' value={'FRITOS (NUGUETS, CROQUETAS...)'}>
                                    Fritos (Nuguets, Croquetas...)
                                </ToggleButton>
                                <ToggleButton id="tapa-btn-4" className='me-2 mb-2' value={'PINCHOS'}>
                                    Pinchos
                                </ToggleButton>
                                <ToggleButton id="tbg-btn-5" className='me-2 mb-2' value={'OTROS'}>
                                    Otros
                                </ToggleButton>
                            </ToggleButtonGroup >
                        </div>
                        <hr />
                        <div className='thisCenter'>

                            <h3>¿Qué te ha parecido el precio?</h3>
                            <ToggleButtonGroup type="radio" name="price" onChange={(value) => this.handleToggleButton(value, 'price')}>

                                <ToggleButton id="price-btn-1" className='me-2' value={'CARO'}>
                                    Pasadísimo
                                </ToggleButton>
                                <ToggleButton id="price-btn-2" className='me-2' value={'CORRECTO'}>
                                    Todo bien
                                </ToggleButton>
                                <ToggleButton id="price-btn-3" className='me-2' value={'BARATO'}>
                                    ¡Tirado!
                                </ToggleButton>
                            </ToggleButtonGroup >
                        </div>

                        <hr />
                        <div className='thisCenter'>
                            <h3>¿Qué tal la calidad de la tapa?</h3>
                            <ToggleButtonGroup type="radio" name="quality" onChange={(value) => this.handleToggleButton(value, 'quality')}>

                                <ToggleButton id="quality-btn-1" className='me-2' value={'MALA'}>
                                    Mala
                                </ToggleButton>
                                <ToggleButton id="quality-btn-2" className='me-2' value={'BUENA'}>
                                    Buena
                                </ToggleButton>
                            </ToggleButtonGroup >
                            <hr />
                        </div>

                        <div className='thisCenter'>

                            <Form.Group controlId="image">
                                <Form.Label> <h3>¡Sube una foto de tu tapa!</h3></Form.Label>
                                <Form.Control onChange={this.handleUploadChange} name="image" type="file" />
                            </Form.Group>
                            <hr />
                        </div>
                        <div className='thisCenter'>

                            <button className='buttonStyle' type="submit">
                                Enviar reseña
                            </button>
                            <hr />
                        </div>

                    </form>
                </div>
            </>
        );
    }

}

