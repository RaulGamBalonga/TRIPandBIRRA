/* import React, { Component } from "react";
// import ReactDOM from "react-dom";
import Map from '../Map/Map';
import credentials from '../../../credentials.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import barService from "../../../services/bar.service";
const mapURL = `https://maps.googleapis.com/maps/api/js?v.3exp&key=${credentials.mapsKey}`;

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            bars: []
        };
    }
    componentDidMount() {
        this.refreshBars()
    }

    refreshBars = () => {
        barService.getAllBar()
            .then(response => {
                console.log(response)
                const bars = response.data
                this.setState({ bars: bars }
                    )
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                {console.log(this.state)}
                <Map bars={this.state.bars}
                    googleMapURL={mapURL}
                    containerElement={<div style={{ height: '400px' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                    loadingElement={<p>Cargando</p>}
                />
            </>
        )
    }
}
 */


