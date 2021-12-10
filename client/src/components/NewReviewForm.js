import React, { Component } from 'react'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import ReviewService from '../services/review.service'


export default class NewReviewForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            comment: '',
            image: '',
            drink: '',
            tapa: '',
            price: '',
            quality: '',
            rating: '',
        }
        this.service = new ReviewService()

    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.service.createReview(this.state)
            .then(response => {

                this.props.history.push("/review")
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (e) => {

        let { name, value } = e.currentTarget

        this.setState({ [name]: value })
    }

    handleToggleButton = (selectedOption, name) => {

        this.setState({ [name]: selectedOption })
    }


    render() {

        return (
            <>
                <hr />

                <h3>¿QUÉ TE HAS TOMADO?</h3>
                <ToggleButtonGroup className='drink' type="radio" name="drink" onChange={(value) => this.handleToggleButton(value, 'drink')}>

                    <ToggleButton id="tbg-btn-1" value={'CERVEZA'}>
                        Cerveza
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-2" value={'VINO'}>
                        Vino
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-3" value={'REFRESCO'}>
                        Refresco
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-4" value={'OTRO'}>
                        Otros
                    </ToggleButton>
                </ToggleButtonGroup >
                <hr />
                <h3>¿QUÉ TE HAN PUESTO DE TAPA?</h3>
                <ToggleButtonGroup className='tapa' type="radio" name="tapa" onChange={(value) => this.handleToggleButton(value, 'tapa')}>

                    <ToggleButton id="tbg-btn-1" value={'FRUTOS SECOS (PIPAS, KIKOS, PATATAS...'}>
                        Frutos Secos (Pipas, kikos, Patatas...)
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-2" value={'OLIVAS'}>
                        Olivas
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-3" value={'FRITOS (NUGUETS, CROQUETAS...)'}>
                        Fritos (Nuguets, Croquetas...)
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-4" value={'PINCHOS'}>
                        Pinchos
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-5" value={'OTROS'}>
                        Otros
                    </ToggleButton>
                </ToggleButtonGroup >
                <hr />
                <h3>¿QUÉ TE HA PARECIDO EL PRECIO?</h3>
                <ToggleButtonGroup type="radio" name="price" onChange={(value) => this.handleToggleButton(value, 'price')}>

                    <ToggleButton id="tbg-btn-1" value={'CARO'}>
                        Pasadísimo
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-2" value={'CORRECTO'}>
                        Todo bien
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-3" value={'BARATO'}>
                        ¡Tirado!
                    </ToggleButton>
                </ToggleButtonGroup >
                <hr />
                <h3>¿QUÉ TAL LA CALIDAD DE LA TAPA?</h3>
                <ToggleButtonGroup type="radio" name="quality" onChange={(value) => this.handleToggleButton(value, 'quality')}>

                    <ToggleButton id="tbg-btn-1" value={'MALA'}>
                        Mala
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-2" value={'BUENA'}>
                        Buena
                    </ToggleButton>

                </ToggleButtonGroup >
                <hr />

            </>
        );
    }

}

