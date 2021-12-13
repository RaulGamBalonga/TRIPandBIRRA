import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import BarService from "../../../services/bar.service";

class BarDetails extends Component {
    constructor(props) {
        super()

        this.state = {
            _id: "",
            name: "",
            location: undefined,
            image: ""
        }

        this.barService = new BarService()


    }

    componentDidMount() {
        const id = this.props.match.params.id

        this.barService.getOneBar(id)
            .then(response => {

                const { _id, name, location, image } = response.data

                this.setState({ _id, name, location, image })
            })
            .catch(err => console.log(err))

    }

    render() {
        const { name, location, image, _id } = this.state
        console.log("el estado en cada render", this.state)
        return (
            <>
                <Container>
                    <h1>Detalles</h1>

                    <Row className="justify-content-around">
                        <Col md={6} style={{ overflow: "hidden" }}>
                            <article>
                                <h2>{name}</h2>
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


                                </div>
                            </article>
                        </Col>
                        <Col md={4}>
                            {/* <img className="detailsImg" src={image} alt={name} ></img> */}
                        </Col>
                    </Row>
                    <Link to={`/review/new/${_id}`}>
                        {/* <Link to={'/review/new'}> */}
                        <Button variant="primary">Escribir reseña</Button>
                    </Link>

                </Container >
            </>

        )
    }
}

export default BarDetails