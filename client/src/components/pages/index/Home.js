import React, { Component } from "react";
// import ReactDOM from "react-dom";
import Map from '../Map/Map';
import credentials from '../../../credentials.js';
import 'bootstrap/dist/css/bootstrap.min.css';
const mapURL = `https://maps.googleapis.com/maps/api/js?v.3exp&key=${credentials.mapsKey}`;

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            name: 'React'
        };
    }
    render() {
        return (
            <>
                <Map
                    googleMapURL={mapURL}
                    containerElement={<div style={{ height: '400px' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                    loadingElement={<p>Cargando</p>}
                />
            </>
        )
    }
}


// import React from "react";

// import { Container, } from "react-bootstrap";

// const Home = () => {
//     return (
//         <Container>
//             <h1>Bievenid@ a Trip&Birra App!</h1>
//             <p>Una app de busqueda de bares y tapas</p>

//             <hr></hr>

//            {/*  <Link to="/coaster-list">
//                 <Button variant="dark" size="lg">Ver Bares</Button>
//             </Link> */}
//         </Container>
//     )
// }

// export default Home