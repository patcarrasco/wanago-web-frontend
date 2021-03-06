import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'

import {loadPositional} from '../../../store/thunks/users'
import {saveMap} from '../../../store/actions/mapActions'
import {getVenueInformation} from '../../../store/thunks/venue'
import {selectVenue} from '../../../store/actions/venueActions'
import {toggleVenue} from '../../../store/actions/navbarActions'


import {styles} from '../../assets/map/dayStyles'
// import {styles} from '../../assets/map/styles'
// import {styles} from '../../assets/map/appleStyle'

import { Loader, Dimmer } from 'semantic-ui-react';
import marker from '../../assets/images/hangoutpin.svg'
import { showSearchResults } from '../../../store/actions/eventActions';


    
const size = {height:'100%', width:'100%', position: 'relative', padding:'0', margin:'0'}

class MapContainer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {mapReady: false, markerClicked: false}
        this.mapCenter = false
        this.showInfoWindow = false
        this.activeMarker = null
    }

    componentDidMount() {
        const {lat, lon} = this.props
        if (!!lat && !!lon && !!localStorage.getItem('localEvents') && !!localStorage.getItem('localVenues')) {
            this.setState({mapReady: true})
            this.props.mapMounted()
        } else {
            setTimeout(()=>{
                if (!this.state.mapReady) {
                    this.props._loadPosition()
                }
            },7000)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {lat, lon} = this.props
        if (!!lat && !!lon && !this.state.mapReady) {

            if (prevProps.localEvents !== this.props.localEvents) {
                localStorage.setItem("localEvents", JSON.stringify(this.props.localEvents))
            } 
            
            if (prevProps.localVenues !== this.props.localVenues) {
                localStorage.setItem("localVenues", JSON.stringify(this.props.localVenues))
            }
            if (!!localStorage.getItem('localEvents') && !!localStorage.getItem('localVenues')) {
                this.setState({mapReady: true})
                this.props.mapMounted()
            }
        }   
    }

    dragHandler = (e, val) => {
        this.mapCenter = {lat: val.center.lat(), lon: val.center.lng()}
    }

    handleMarkerClick = (venue) => {
        this.props._toggleVenue(true)
        this.props._loadVenueEvents(venue.id)
        this.props._selectVenue(venue)
        this.props._closeSearchResults()
        this.activeMarker = venue.key
    }

    localVenues = () => {
        return JSON.parse(localStorage.getItem("localVenues")).map(venue => {
            const {key, name, location} = venue
            return (
                <Marker
                    key={key}
                    title={name}
                    position={{lat:location.latitude, lng:location.longitude}}
                    onClick={() => this.handleMarkerClick(venue)}
                    icon={{
                        url: marker,
                        anchor: new window.google.maps.Point(30, 34),
                        scaledSize: new window.google.maps.Size(100, 50)
                    }}
                >
                </Marker>
            )
        })
    }


    mapRenderer = () => {
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

    componentWillUnmount() {
        this.setState({mapReady: false})
    }


    render() {
        return this.state.mapReady ? this.mapRenderer() : <Dimmer active><Loader size="small">Loading...</Loader></Dimmer>
    }
} 

const mapStateToProps = (state) => ({
    lat: state.users.lat,
    lon: state.users.lon,
    localVenues: state.map.localVenues,
    localEvents: state.events.eventsByLocation,
})

const mapDispatchToProps = (dispatch) => ({
    _loadPosition: () => dispatch(loadPositional()),
    _saveMap: (map) => dispatch(saveMap(map)),
    _selectVenue: (venue) => dispatch(selectVenue(venue)),
    _loadVenueEvents: (id) => dispatch(getVenueInformation(id)),
    _toggleVenue: () => dispatch(toggleVenue()),
    _closeSearchResults: () => dispatch(showSearchResults(false))
})

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(connect(mapStateToProps, mapDispatchToProps)(MapContainer))