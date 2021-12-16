import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import GoogleMapReact from 'google-map-react';
import BarService from "../../../services/bar.service";
import './Map.css'
import mapPoint from './MapImg/mappoint.png'

//TODO: llevar todos los estilos al .css
const BarInMap = (props) => <div className='textArea'>
    <img className='mapPoint' src={mapPoint} alt='mapBarPoint' />
    <Link to={`/bar/${props.barId}`}>
        <Button variant="primary">{props.text}</Button>
    </Link>
</div>;

const barService = new BarService()

class Map extends Component {
    constructor() {
        super()
        this.state = {
            bars: []

        }

    }

    componentDidMount() {
        this.refreshBarsModified()
    }

    refreshBarsModified = () => {
        barService.getAllBarModified()
            .then(response => {
                const bars = response.data
                this.setState({ bars: bars })
            })
            .catch(err => console.log(err))
    }

    updateSelectedLocation = (e) => {
        const { lat, lng } = e
        this.props.storeSelectedLocation(lat, lng)
    }


    static defaultProps = {
        mapId: '601e432217b3abef',
        center: {
            lat: 40.393364243975796,
            lng: -3.6977601072752524
        },
        zoom: 15

    };


    render() {
        return (

            <div className='mapSize' style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAp26dh8ZtMz9K0_fGmQ-Cd30fa7REb65Q' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onClick={this.updateSelectedLocation}
                >
                    {
                        this.state.bars.map(bar => {
                            return (
                                <BarInMap
                                    lat={bar.lat}
                                    lng={bar.lng}
                                    text={bar.text}
                                    barId={bar._id}
                                    key={bar._id}
                                />

                            )
                        })
                    }
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map

