import React, { Component } from "react";
import { Container, Row, Col, Button, } from "react-bootstrap";
import { Link } from 'react-router-dom'
import BarService from "../../../services/bar.service";
import ReviewService from "../../../services/review.service";
import ReviewList from "../BarList/ReviewList";


class BarDetails extends Component {
    constructor(props) {
        super()

        this.state = {
            _id: "",
            name: "",
            location: undefined,
            image: "",
            reviews: [],
            drinksArray: [],
            tapasArray: [],
            pricesArray: [],
            qualitiesArray: [],
            drink: {
                cerveza: 0,
                vino: 0,
                refresco: 0,
                otros: 0
            },
            tapa: {
                FrutosSecos: 0,
                Olivas: 0,
                Fritos: 0,
                Pinchos: 0,
                Otros: 0
            },
            price: {
                Mal: 0,
                Normal: 0,
                Bien: 0,
            },
            quality: {
                Mala: 0,
                Buena: 0
            }
        }


        this.barService = new BarService()
        this.reviewService = new ReviewService()
    }

    componentDidMount() {
        const id = this.props.match.params.id

        this.barService.getOneBar(id)
            .then(response => {

                const { _id, name, location, image, reviewImage } = response.data

                this.setState({ _id, name, location, image, reviewImage })
            })
            .catch(err => console.log(err))

        this.reviewService.getAllReviews(id)
            .then(response => {
                const reviews = response.data
                this.setState({ ...this.state, reviews })
            })
            .then(() => {


                this.state.reviews.forEach(review => {

                    this.state.drinksArray.push(review.drink)
                    this.state.tapasArray.push(review.tapa)
                    this.state.pricesArray.push(review.price)
                    this.state.qualitiesArray.push(review.quality)

                    const drinksType = { cerveza: 0, vino: 0, refresco: 0, otros: 0 };
                    this.state.drinksArray.forEach(drink => {

                        if (drink === 'REFRESCO') {
                            drinksType.refresco++
                        }
                        else if (drink === 'CERVEZA') {
                            drinksType.cerveza++
                        }
                        else if (drink === 'VINO') {
                            drinksType.vino++
                        }
                        else {
                            drinksType.otros++
                        }
                        console.log(drinksType);
                    })

                    const tapasType = { FrutosSecos: 0, Olivas: 0, Fritos: 0, Pinchos: 0, Otros: 0 }
                    this.state.tapasArray.forEach(tapa => {

                        if (tapa === 'FRUTOS SECOS (PIPAS, KIKOS, PATATAS...') {
                            tapasType.FrutosSecos++
                        }
                        else if (tapa === 'OLIVAS') {
                            tapasType.Olivas++
                        }
                        else if (tapa === 'FRITOS (NUGUETS, CROQUETAS...)') {
                            tapasType.Fritos++
                        }
                        else if (tapa === 'PINCHOS') {
                            tapasType.Pinchos++
                        }
                        else {
                            tapasType.Otros++
                        }
                        console.log(tapasType);


                    })

                    const qualityType = { mala: 0, buena: 0 };
                    this.state.qualitiesArray.forEach(quality => {

                        if (quality === 'MALA') {
                            qualityType.mala++
                        }
                        else {
                            qualityType.buena++
                        }
                        console.log(qualityType);
                    })

                    const priceType = { mal: 0, normal: 0, bien: 0 };
                    this.state.pricesArray.forEach(price => {

                        if (price === 'CARO') {
                            priceType.mal++
                        }
                        else if (price === 'CORRECTO') {
                            priceType.normal++
                        }
                        else {
                            priceType.bien++
                        }
                        console.log(priceType);
                    })

                })

            })
            .catch(err => console.log(err))

    }

    render() {
        const { name, image, _id } = this.state

        return (
            <>
                <Container>
                    <h2>DETALLES</h2>

                    <Row className="justify-content-around">
                        <Col md={6} style={{ overflow: "hidden" }}>
                            <article>
                                <h3>{name}</h3>
                                <div>
                                    <hr />
                                    <p>Lo más pedido:</p>
                                    <hr />
                                    <p>La tapa más puesta: </p>
                                    <hr />
                                    <p>Calidad: </p>
                                    <hr />
                                    <p>Precio: </p>
                                    <p>{this.state.reviews.length}: </p>


                                </div>
                            </article>
                        </Col>
                        <Col md={4}>
                            {/* <img className="detailsImg" src={image} alt={name} ></img> */}
                        </Col>
                    </Row>
                    <Link to={`/review/new/${_id}`}>
                        <Button variant="primary">Escribir reseña</Button>
                    </Link>
                    <br></br>
                    <br></br>
                    <Link>
                        <Button variant="primary">Añadir a favoritos</Button>
                    </Link>
                    <ReviewList reviews={this.state.reviews} />

                </Container >
            </>

        )
    }
}

export default BarDetails