import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'

import { loadEventDetails } from '../../../store/actions/eventActions';
import {loadPositional} from '../../../store/thunks/users' 

import Navbar from '../Navbar/Navbar';
import EventFeed from '../EventFeed/EventFeed';

const styles = [{
        "elementType": "geometry",
        "stylers": [{
            "color": "#1d2c4d"
        }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#8ec3b9"
        }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#1a3646"
        }]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#4b6878"
        }]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#64779e"
        }]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#4b6878"
        }]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#334e87"
        }]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
            "color": "#023e58"
        }]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#283d6a"
        }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#6f9ba5"
        }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#1d2c4d"
        }]
    },
    {
        "featureType": "poi.business",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#023e58"
        }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#3C7680"
        }]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "color": "#304a7d"
        }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#98a5be"
        }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#1d2c4d"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "color": "#2c6675"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#255763"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#b0d5ce"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#023e58"
        }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#98a5be"
        }]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#1d2c4d"
        }]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#283d6a"
        }]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
            "color": "#3a4762"
        }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#0e1626"
        }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#4e6d70"
        }]
    }
]
    
const size = {width: '100%%', height:'100%'}

class MapContainer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {mapReady: false}
        this.mapCenter = false
    }

    userMarker = () => {
        return (
            <Marker 
                key={'marker-user'}
                title={'my location'}
                position={
                    {
                        lat: this.props.lat,
                        lng: this.props.long,
                    }
                }
            />
        )
    }

    componentDidMount() {
        console.log('checking lat and lon', this.props.lat,this.props.lon) 
        const {lat, lon} = this.props
        if (lat !== 0 && lon !== 0) {
            this.setState({mapReady: true})
        } else {
            this.props._loadPosition()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.lat === 0 && prevProps.lon === 0 && !prevState.mapReady) {
            this.setState({mapReady: true})
        }
    }

    dragHandler = (e, val) => {
        this.mapCenter = {lat: val.center.lat(), lng: val.center.lng()}
    }

    mapRenderer = () => (
        <Map 
            google={this.props.google}
            zoom={14}
            styles={styles}
            style={size}
            streetViewControl={false}
            fullscreenControl={false}
            mapTypeControl={false}   
            initialCenter={{
                lat: this.props.lat,
                lng: this.props.lon
            }}                 
            center={{
                // Clicking on an event will center map on that event, by default it is the user's position
                lat: this.mapCenter.lat, 
                lng: this.mapCenter.lng
            }}
            onDragend={this.dragHandler}
        >  
            <Navbar />
            <EventFeed />
        </Map>
    )

    render() {
        console.log('map render', this.state.mapReady)
        return this.state.mapReady ? this.mapRenderer() : null
    }
} 

const mapStateToProps = (state) => ({
    lat: state.users.lat,
    lon: state.users.lon,
})

const mapDispatchToProps = (dispatch) => ({
    _loadEventDetails: (e) => dispatch(loadEventDetails(e)),
    _loadPosition: () => dispatch(loadPositional()),
})

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(connect(mapStateToProps, mapDispatchToProps)(MapContainer))