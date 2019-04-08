import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'

import {loadPositional} from '../../../store/thunks/users' 
import {getVenuesByLocation} from '../../../store/thunks/map'

import Navbar from '../Navbar/Navbar';
import EventFeed from '../EventFeed/EventFeed';
import EventMarkers from '../EventMarkers/EventMarkers';

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
    
const size = {height:'100%', width:'100%', position: 'relative', padding:'0', margin:'0'}

class MapContainer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {mapReady: false}
        this.mapCenter = false
    }

    componentDidMount() {
        const {lat, lon} = this.props
        if (!lat && !lon && localStorage.getItem('localEvents')) {
            this.setState({mapReady: true})
        } else {
            this.props._loadPosition()
            console.log('gps position load called')
        }
    }

    componentDidUpdate(prevProps, prevState) {

        const {lat, lon} = this.props

        if (!!lat && !!lon ) {
            if (prevProps.localEvents !== this.props.localEvents) {
                localStorage.setItem("localEvents", JSON.stringify(this.props.localEvents))
                console.log('set local storage, events')
            } 
            
            if (prevProps.localVenues !== this.props.localVenues) {
                localStorage.setItem("localVenues", JSON.stringify(this.props.localVenues))
                console.log('set local storage, venues')
            }
            console.log(!!localStorage.getItem('localEvents'), !!localStorage.getItem('localVenues'))
            if (!!localStorage.getItem('localEvents') && !!localStorage.getItem('localVenues') && !prevState.mapReady) {
                this.setState({mapReady: true})
                console.log('set map ready = true')
            }
        } 
        
        
    }

    dragHandler = (e, val) => {
        this.mapCenter = {lat: val.center.lat(), lng: val.center.lng()}
    }

    localVenues = () => {
        return JSON.parse(localStorage.getItem("localVenues")).map(venue => {
            return (
                <Marker>

                </Marker>
            )
        })
    }


    mapRenderer = () => {
        return (
            <Map   
                google={this.props.google}
                zoom={14}
                styles={styles}
                style={size}
                streetViewControl={false}
                fullscreenControl={false}
                mapTypeControl={false}   
                center={
                    {
                        lat: this.props.lat,
                        lng: this.props.lon
                    }
                }                 
                onDragend={this.dragHandler}
            >  
        </Map>
        )
    }


    render() {
        console.log(this.props.lat, this.props.lon)
        return this.state.mapReady ? this.mapRenderer() : 'this is loading...'
        // return this.mapRenderer()
    }
} 

const mapStateToProps = (state) => ({
    lat: state.users.lat,
    lon: state.users.lon,
    localVenues: state.map.localVenues,
    localEvents: state.events.eventsByLocation
})

const mapDispatchToProps = (dispatch) => ({
    _loadPosition: () => dispatch(loadPositional()),
})

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(connect(mapStateToProps, mapDispatchToProps)(MapContainer))