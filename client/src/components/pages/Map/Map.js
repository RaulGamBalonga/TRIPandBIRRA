import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
    

    bars.map(bar => {

        let marker = new maps.Marker({
            position: {
                lat: bar.lat,
                lng: bar.lng
            },
            map,
            title: bar.text
        });

        return marker
    })

   
};

const bars = [
    {
        lat: 40.39239323461082,
        lng: -3.696869125314842,
        text: "Francachela"
    },
    {
        lat: 40.39261942651223,
        lng: -3.6987407073855505,
        text: "Ironhack"
    },
    {
        lat: 40.39179939494759,
        lng: -3.6948590947565214,
        text: "El Mirador de Legazpi"
    },

]



class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 40.393364243975796,
            lng: -3.6977601072752524
        },
        zoom: 15

    };
    
    
    render() {
        return (
          
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAp26dh8ZtMz9K0_fGmQ-Cd30fa7REb65Q' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    {console.log(this.props)}
                    {
                        bars.map(bar => {
                            return (
                                <AnyReactComponent
                                    lat={bar.lat}
                                    lng={bar.lng}
                                    text={bar.text}
                                />
                            )
                        })
                    }
                    

                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;

