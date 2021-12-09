import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps) => {
    // use map and maps objects

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

    // let marker = new maps.Marker({
    //     position: {
    //         lat: 40.39261942651223,
    //         lng: -3.6987407073855505
    //     },
    //     map,
    //     title: 'Ironhack'
    // });
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

/* return bars.map(bar => {

    return <BarCard key={bar._id} bar={bar} />
})
    } */





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
           
            // Important! Always set the container height explicitly
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
                    {/* <AnyReactComponent
                        lat={40.393364243975796}
                        lng={-3.6977601072752524}
                        text="Francachella"
                    /> */}

                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;











// import React from 'react';
// import {
//     GoogleMap,
//     withScripjs,
//     withGoogleMap
//     // } from 'google-map-react'
// } from 'react-google-maps'

// const Map = (props) => {
//     return (
//         <GoogleMap
//             defaultZoom={10}
//             defaultCenter={{ lat: 40.393364243975796, lng: -3.6977601072752524 }}
//         />
//     );
// };

// export default withScripjs(
//     withGoogleMap(
//         Map
//     )
// )
