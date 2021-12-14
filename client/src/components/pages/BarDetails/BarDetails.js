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

                        if (drink === 'refresco') {
                            drinksType.refresco++
                        }
                        else if (drink === 'cerveza') {
                            drinksType.cerveza++
                        }
                        else if (drink === 'vino') {
                            drinksType.vino++
                        }
                        else {
                            drinksType.otros++
                        }
                    })

                    const qualitiesArray = { mala: 0, buena: 0 };
                    this.state.qualitiesArray.forEach(quality => {

                        if (quality === 'Mala') {
                            qualitiesArray.mala++
                        }
                        else {
                            qualitiesArray.buena++
                        }

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

