import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BarService from "../../../services/bar.service";

class BarDetails extends Component {
    constructor(props) {
        super()

        this.state = {
            name: "",
            location: undefined,
            image: ""
        }

        this.service = new BarService()
    }

    componentDidMount() {
        const id = this.props.match.params.id

        this.service.getOneBar(id)
            .then(response => {
                
                const { name, location, image } = response.data

                this.setState({ name, location, image })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { name, location, image } = this.state
        console.log("el estado en cada render", this.state)
        return (
            <Container>
                <h1>Detalles</h1>

                <Row className="justify-content-around">
                    <Col md={6} style={{ overflow: "hidden" }}>
                        <article>
                            <h2>{name}</h2>
                            <div>
                               {/*  <p>Latitud:{location?.coordinates[0]}</p>
                                <hr />
                                <br />
                                <p>Longitud: {location?.coordinates[1]}</p> */}
                                
                                <p>Puntuacion</p>
                                <p>detalles</p>
                                <p>descripcion</p>
                                <p>nº de reseñas</p>
                                <p>bebida top</p>
                                <p>precio</p>
                                <p>calidad</p>



                                <p>escribir reseña, enlace a crear reseña</p>

                                <p>slide con fotos</p>

                            </div>
                        </article>
                    </Col>
                    <Col md={4}>
                        <img src={image} alt={name} ></img>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default BarDetails