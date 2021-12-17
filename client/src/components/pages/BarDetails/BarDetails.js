import React, { Component } from "react";
import { Container, Row, Col, Carousel, } from "react-bootstrap";
import { Link } from 'react-router-dom'
import BarService from "../../../services/bar.service";
import ReviewService from "../../../services/review.service";
import ReviewList from "../BarList/ReviewList";
import UserService from "../../../services/user.service"
import patito from '../PagesImages/patito-amarillo.jpg'
import olives from "../PagesImages/portada_variedades_800x400.jpg"
import chips from "../PagesImages/Tapa-Patatas_Fritas.jpg"
import peanuts from "../PagesImages/Aperitivo-Frutos_secos-2011.jfif"
import './BarDetails.css'


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
    }

    componentDidMount() {
        this.getBarDetails()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.getBarDetails()
        }
    }

    getBarDetails() {
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
                this.setState({ ...this.state, topDrink })

                const topTapa = Object.keys(this.state.tapas).reduce((a, b) => this.state.tapas[a] > this.state.tapas[b] ? a : b);
                this.setState({ ...this.state, topTapa })

                const topPrice = Object.keys(this.state.price).reduce((a, b) => this.state.price[a] > this.state.price[b] ? a : b);
                this.setState({ ...this.state, topPrice })

                const topQuality = Object.keys(this.state.quality).reduce((a, b) => this.state.quality[a] > this.state.quality[b] ? a : b);
                this.setState({ ...this.state, topQuality })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { name, image, _id } = this.state
        console.log(this.state)
        return (
            <>
                <main>

                    <div className="justify-content-around barDetails">
                        <div md={6} style={{ overflow: "hidden" }}>
                            <article>
                                <div className="itemsalin">
                                    <h2>DETALLES</h2>
                                    <h4>{name}</h4>
                                    <p>Tiene {this.state.reviews.length} reseñas</p>
                                </div>
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

                                    <Carousel >

                                        {this.state.reviews.map(elem => (

                                            <Carousel.Item className="carSize">
                                                <img
                                                    className="d-block w-100"
                                                    src={elem.image}
                                                    alt="foto de la review"
                                                />

                                                <Carousel.Caption>

                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </div>
                            </article>
                        </div>

                    </div>
                    <div className="itemsalin">
                        <Link to={`/review/new/${_id}`}>
                            <button className="buttonStyle" >Escribir reseña</button>
                        </Link>
                        <button className="buttonStyle" onClick={this.addFavorites}>Añadir a favoritos</button>

                    </div>
                </main >
                <hr />

            </>

        )
    }
}

export default BarDetails