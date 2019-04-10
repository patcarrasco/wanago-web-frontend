import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'

import {loadPositional} from '../../../store/thunks/users' 
import {getVenuesByLocation} from '../../../store/thunks/map'
import {saveMap} from '../../../store/actions/mapActions'

import Navbar from '../Navbar/Navbar';
import EventFeed from '../EventFeed/EventFeed';
import EventMarkers from '../EventMarkers/EventMarkers';
import {styles} from '../../assets/map/styles'

    
const size = {height:'100%', width:'100%', position: 'relative', padding:'0', margin:'0'}

class MapContainer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {mapReady: false}
        this.mapCenter = false
        this.showInfoWindow = false
        this.activeMarker = null
    }

    componentDidMount() {
        console.log('mount map')
        const {lat, lon} = this.props
        if (!!lat && !!lon && localStorage.getItem('localEvents') && localStorage.getItem('localVenues')) {
            this.setState({mapReady: true})
        } else {
            this.props._loadPosition()
            console.log('position loading')
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {lat, lon} = this.props
        if (!!lat && !!lon && !this.state.mapReady) {
            if (prevProps.localEvents !== this.props.localEvents) {
                console.log('setting events to local storage')
                localStorage.setItem("localEvents", JSON.stringify(this.props.localEvents))
            } 
            
            if (prevProps.localVenues !== this.props.localVenues) {
                console.log('setting venues to local storage')
                localStorage.setItem("localVenues", JSON.stringify(this.props.localVenues))
            }
            if (!!localStorage.getItem('localEvents') && !!localStorage.getItem('localVenues')) {
                console.log('map ready')
                this.setState({mapReady: true})
            }
        }   
    }

    dragHandler = (e, val) => {
        this.mapCenter = {lat: val.center.lat(), lon: val.center.lng()}
    }

    localVenues = () => {
        return JSON.parse(localStorage.getItem("localVenues")).map(venue => {
            const {key, name, location} = venue
            return (
                <Marker
                    key={key}
                    title={name}
                    position={{lat:location.latitude, lng:location.longitude}}
                    onClick={this.handleMarkerClick}
                >
                </Marker>
            )
        })
    }


    mapRenderer = () => {
        console.log('MAP RENDERING')
        return (
            <Map 
                ref={map => this.props._saveMap(map)}  
                google={this.props.google}
                zoom={14}
                styles={styles}
                style={size}
                streetViewControl={false}
                fullscreenControl={false}
                mapTypeControl={false}   
                initialCenter={
                    {
                        lat: this.props.lat,
                        lng: this.props.lon
                    }
                }                 
                onDragend={this.dragHandler}
                onClick={this.onMapClick}
            >  
            {this.localVenues()}
        </Map>
        )
    }

    render() {
        return this.state.mapReady ? this.mapRenderer() : 'this is loading...'
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
    _saveMap: (map) => dispatch(saveMap(map))
})

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(connect(mapStateToProps, mapDispatchToProps)(MapContainer))