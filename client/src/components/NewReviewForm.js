import React, { Component } from 'react'
import { ToggleButtonGroup, ToggleButton, Form, Button } from 'react-bootstrap'
import ReviewService from '../services/review.service'
import BarService from '../services/bar.service';


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
            bar: this.props.match.params.id
        }
        this.reviewService = new ReviewService()

    }

    // 1. ya tenemos el id del bar en la url
    // 2. cuando el componente se monta, hacemos que ese id se guarde en 'bar' en el estado
    // 3. si queremos que salga el nombre del bar, hay que llamar al bar service para traer sus datos y poder guardarlos en el estado
    // 4. para crear una reseña, hay que pasarle tambien el id del bar para el que se crea y tambien el id del usuario que la crea (logged user)

    handleSubmit = (e) => {
        e.preventDefault();
        this.reviewService.createReview(this.state)
            .then(response => {

                this.props.history.push("/")
            })
            .catch(err => console.log(err))

        console.log(this.state, 'ENTRO handleSubmit');

    }

    handleToggleButton = (selectedOption, name) => {

        this.setState({ [name]: selectedOption })
    }


    render() {

        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <h2>Has estado de tapeo en {this.state.name}</h2>
                    <hr />
                    <h3>¿QUÉ TE HAS TOMADO?</h3>
                    <ToggleButtonGroup type="radio" name="drink" onChange={(value) => this.handleToggleButton(value, 'drink')}>

                        <ToggleButton id="drink-btn-1" value={'CERVEZA'}>
                            Cerveza
                        </ToggleButton>
                        <ToggleButton id="drink-btn-2" value={'VINO'}>
                            Vino
                        </ToggleButton>
                        <ToggleButton id="drink-btn-3" value={'REFRESCO'}>
                            Refresco
                        </ToggleButton>
                        <ToggleButton id="drink-btn-4" value={'OTRO'}>
                            Otros
                        </ToggleButton>
                    </ToggleButtonGroup >

                    <hr />
                    <h3>¿QUÉ TE HAN PUESTO DE TAPA?</h3>
                    <ToggleButtonGroup type="radio" name="tapa" onChange={(value) => this.handleToggleButton(value, 'tapa')}>

                        <ToggleButton id="tapa-btn-1" value={'FRUTOS SECOS (PIPAS, KIKOS, PATATAS...'}>
                            Frutos Secos (Pipas, kikos, Patatas...)
                        </ToggleButton>
                        <ToggleButton id="tapa-btn-2" value={'OLIVAS'}>
                            Olivas
                        </ToggleButton>
                        <ToggleButton id="tapa-btn-3" value={'FRITOS (NUGUETS, CROQUETAS...)'}>
                            Fritos (Nuguets, Croquetas...)
                        </ToggleButton>
                        <ToggleButton id="tapa-btn-4" value={'PINCHOS'}>
                            Pinchos
                        </ToggleButton>
                        <ToggleButton id="tbg-btn-5" value={'OTROS'}>
                            Otros
                        </ToggleButton>
                    </ToggleButtonGroup >

                    <hr />
                    <h3>¿QUÉ TE HA PARECIDO EL PRECIO?</h3>
                    <ToggleButtonGroup type="radio" name="price" onChange={(value) => this.handleToggleButton(value, 'price')}>

                        <ToggleButton id="price-btn-1" value={'CARO'}>
                            Pasadísimo
                        </ToggleButton>
                        <ToggleButton id="price-btn-2" value={'CORRECTO'}>
                            Todo bien
                        </ToggleButton>
                        <ToggleButton id="price-btn-3" value={'BARATO'}>
                            ¡Tirado!
                        </ToggleButton>
                    </ToggleButtonGroup >

                    <hr />
                    <h3>¿QUÉ TAL LA CALIDAD DE LA TAPA?</h3>
                    <ToggleButtonGroup type="radio" name="quality" onChange={(value) => this.handleToggleButton(value, 'quality')}>

                        <ToggleButton id="quality-btn-1" value={'MALA'}>
                            Mala
                        </ToggleButton>
                        <ToggleButton id="quality-btn-2" value={'BUENA'}>
                            Buena
                        </ToggleButton>
                    </ToggleButtonGroup >

                    <hr />
                    <Button variant="primary" type="submit">
                        Enviar reseña
                    </Button>
                    <hr />
                </Form>

            </>
        );
    }

}

