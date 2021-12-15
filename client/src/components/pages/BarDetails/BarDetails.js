import React, { Component } from "react";
import { Container, Row, Col, Button, } from "react-bootstrap";
import { Link } from 'react-router-dom'
import BarService from "../../../services/bar.service";
import ReviewService from "../../../services/review.service";
import ReviewList from "../BarList/ReviewList";
import UserService from "../../../services/user.service"


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
            drinks: {},
            tapas: {},
            price: {},
            quality: {},
            topDrink: '',
            topTapa: '',
            topPrice: '',
            topQuality: ''

        }


        this.barService = new BarService()
        this.reviewService = new ReviewService()
        this.userService = new UserService()
    }

    addFavorites = () => {
        this.userService.addUserFav(this.state._id)
            .then(response => {
                this.props.storeUser(response.data)
                this.props.history.push("/userprofile")
            })
            .catch(err => console.log(err))


        // llamar al servicio y pasarle el id del bar
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

                })


                const drinksType = { cerveza: 0, Vino: 0, refresco: 0, otros: 0 };
                this.state.drinksArray.forEach(drink => {

                    if (drink === 'REFRESCO') {
                        drinksType.refresco++
                    }
                    else if (drink === 'CERVEZA') {
                        drinksType.cerveza++
                    }
                    else if (drink === 'VINO') {
                        drinksType.Vino++
                    }
                    else {
                        drinksType.otros++
                    }
                })

                this.setState({ ...this.state, drinks: drinksType })


                const tapasType = { 'Frutos Secos': 0, Olivas: 0, Fritos: 0, Pinchos: 0, Otros: 0 }
                this.state.tapasArray.forEach(tapa => {

                    if (tapa === 'FRUTOS SECOS (PIPAS, KIKOS, PATATAS...') {
                        tapasType['Frutos Secos']++
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

                })

                this.setState({ ...this.state, tapas: tapasType })


                const qualityType = { mala: 0, buena: 0 };
                this.state.qualitiesArray.forEach(quality => {

                    if (quality === 'MALA') {
                        qualityType.mala++
                    }
                    else {
                        qualityType.buena++
                    }

                })

                this.setState({ ...this.state, quality: qualityType })


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

                })

                this.setState({ ...this.state, price: priceType })

                const topDrink = Object.keys(this.state.drinks).reduce((a, b) => this.state.drinks[a] > this.state.drinks[b] ? a : b);
                console.log('>>>>>>>', topDrink)
                this.setState({ ...this.state, topDrink })

                const topTapa = Object.keys(this.state.tapas).reduce((a, b) => this.state.tapas[a] > this.state.tapas[b] ? a : b);
                console.log('>>>>>>>', topTapa)
                this.setState({ ...this.state, topTapa })

                const topPrice = Object.keys(this.state.price).reduce((a, b) => this.state.price[a] > this.state.price[b] ? a : b);
                console.log('>>>>>>>', topPrice)
                this.setState({ ...this.state, topPrice })

                const topQuality = Object.keys(this.state.quality).reduce((a, b) => this.state.quality[a] > this.state.quality[b] ? a : b);
                console.log('>>>>>>>', topQuality)
                this.setState({ ...this.state, topQuality })
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
                                    <p>Lo más pedido: {this.state.topDrink} </p>
                                    <hr />
                                    <p>La tapa más puesta: {this.state.topTapa} </p>
                                    <hr />
                                    <p>Calidad: {this.state.topPrice} </p>
                                    <hr />
                                    <p>Precio: {this.state.topQuality} </p>
                                    <hr />
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
                    <Button variant="primary" onClick={this.addFavorites}>Añadir a favoritos</Button>
                    <ReviewList reviews={this.state.reviews} />

                </Container >
            </>

        )
    }
}

export default BarDetails