import React, { Component } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom'
import BarService from "../../../services/bar.service";
import ReviewService from "../../../services/review.service";
<<<<<<< HEAD
import ReviewList from "../BarList/ReviewList";
=======
>>>>>>> ae7e3280438b3a9ce14012dd48294cf60634325c

class BarDetails extends Component {
    constructor(props) {
        super()

        this.state = {
            _id: "",
            name: "",
            location: undefined,
            image: "",
            reviews: []
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
            this.setState({...this.state, reviews})
        })
                .catch(err => console.log(err))

    }

    render() {
        const { name, location, image, _id } = this.state
       
        return (
            <>
                <Container>
                    <h2>DETALLES</h2>

                    <Row className="justify-content-around">
                        <Col md={6} style={{ overflow: "hidden" }}>
                            <article>
                                <h3>{name}</h3>
                                <div>
                                    <p>Latitud:{location?.coordinates[0]}</p>
                                    <hr />
                                    <p>Longitud: {location?.coordinates[1]}</p>
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
                    <ReviewList reviews={this.state.reviews}/>

                </Container >
            </>

        )
    }
}

export default BarDetails