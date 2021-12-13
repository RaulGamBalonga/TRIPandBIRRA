import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import BarService from "../../../services/bar.service";
import './Map.css'


//TODO: llevar todos los estilos al .css
const AnyReactComponent = ({ text }) => <div className='textArea'>
    <p style={{ width: '100%', display: 'block' }}>{text}</p>
</div>;

const barService = new BarService()

// const bars = [
//     {
//         lat: 40.39239323461082,
//         lng: -3.696869125314842,
//         text: "Francachela"
//     },
//     {
//         lat: 40.39261942651223,
//         lng: -3.6987407073855505,
//         text: "Ironhack"
//     },
//     {
//         lat: 40.39179939494759,
//         lng: -3.6948590947565214,
//         text: "El Mirador de Legazpi"
//     },

// ]


class SimpleMap extends Component {
    constructor() {
        super()
        // 1. CREAR ESTADO DE ARRAY DE BARES (COMO EN BAR PAGE)
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

    static defaultProps = {
        mapId: '601e432217b3abef',
        center: {
            lat: 40.393364243975796,
            lng: -3.6977601072752524
        },
        zoom: 15

    };

    // 2. EN EL BAR SERVICE CREAR UN MÉTODO QUE TRAIGA LOS BARES MODIFICADOS DE BAR ROUTES, 
    // 3. CREAR MÉTODO QUE TRAIGA TODOS LOS BARES DEL SERVICIO Y LOS GUARDE EN EL ESTADO
    // 4. CUANDO EL COMPONENTE SE MONTA, LLAMAMOS A LA FUNCIÓN QUE HEMOS CREADO
    // 5. CUANDO YA TENGAMOS LOS BARES EN EL ESTADO, ESO ES LO QUE LE PASAMOS AL RESTO DE FUNCIONES (bars)

    handleApiLoaded = (map, maps) => {

        this.state.bars.map(bar => {


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
    // AnyReactComponent = ({ text }) => <div>{text}</div>;
    render() {
        return (

            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAp26dh8ZtMz9K0_fGmQ-Cd30fa7REb65Q' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                    onClick={e => console.log(e)}
                >

                    {
                        this.state.bars.map(bar => {
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

export default SimpleMap

