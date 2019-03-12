import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import { loadEventDetails } from '../../store/actions/eventActions';
import { loadHangouts } from '../../store/thunks/hangouts'
import {loadPositional} from '../../store/thunks/users'


import eventMarker from '../../assets/images/eventMarker2.svg'
import pin from '../../assets/images/pin.svg'

import hangoutMarker from '../../assets/images/hangoutMarker.svg'
import { Header, Portal, Loader, Dimmer, Container } from 'semantic-ui-react';

const styles = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
                "lightness": "0"
            },
            {
                "saturation": "0"
            },
            {
                "color": "#f5f5f2"
            },
            {
                "gamma": "1"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "weight": 0.6
            },
            {
                "saturation": -85
            },
            {
                "lightness": 61
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
                "lightness": "-49"
            },
            {
                "saturation": "-53"
            },
            {
                "gamma": "0.79"
            }
        ]
    }
]
    
const size = {width: '100%', height:'100%'}

class MapContainer extends PureComponent {
    state={mouseover:false}

    mouseOverHandler = () => {
        this.setState({mouseover: true})
    }

    mouseOutHandler = () => {
        this.setState({mouseover: false})
    }

    hangoutInfo = () => (
        <Portal>
            <Header>stuff</Header>
        </Portal>
    )

    eventMarkers = () => {
        const rawEvents = this.props.events
        if (!!rawEvents._embedded && rawEvents.page.totalElements > 0) {
            const events = rawEvents._embedded.events.filter(e => !!e._embedded)
            const marks = events.map((e,idx) => {
                const event = e
                if (event._embedded.venues[0].location) {
                    const {name, _embedded} = e
                    const venueInfo = _embedded.venues[0]
                    const venue = venueInfo.name
                    const lat = venueInfo.location.latitude
                    const lng = venueInfo.location.longitude
                    return (
                            <Marker
                                key={e.id}
                                title={name}
                                name={venue}
                                position={
                                    {
                                        lat: lat,
                                        lng: lng,
                                    }
                                } 
                                icon={{
                                    url: eventMarker,
                                    anchor: new window.google.maps.Point(17, 34),
                                    scaledSize: new window.google.maps.Size(40, 40)
                                }}
                                onClick={(free) => this.props._loadEventDetails({event, free})}
                            />
                    ) 
                } else {
                    return null
                }
            })
            return marks
        }
        return null
    }

    hangoutMarkers = () => {
        const hangouts = this.props.hangouts.map((e, idx) => {
            return (
                <Marker 
                    key={idx}
                    title={e.name}
                    position={
                        {
                            lat:e.lat,
                            lng: e.long,
                        }
                    }
                    icon={{
                        url: hangoutMarker, 
                        anchor: new window.google.maps.Point(17, 34),
                        scaledSize: new window.google.maps.Size(40, 40)  
                    }}
                    onClick={this.eventMarkerClickHandler}
                />
            )
        })
        return hangouts
    }

 
    userLocation = () => {
        const first = this.props.events._embedded.events[0]._embedded.venues[0].location
        return {
            lat: first.latitude,
            lng: first.longitude
        }
    }

    componentDidMount() {
        this.props._loadMyHangouts()
        this.props._loadPosition()
    }

    render() {
        console.log('rendered with', this.props.events)
        return (
            <>
                {/* <Dimmer active={this.props.loading}>
                    <Loader indeterminate size='massive'> Searching... </Loader>
                </Dimmer> */}
                <Map 
                    google={this.props.google}
                    zoom={14}
                    styles={styles}
                    style={size}
                    center={{
                        lat: ( this.props.eventsPresent) ? this.userLocation().lat : this.props.lat,
                        lng: ( this.props.eventsPresent) ? this.userLocation().lng : this.props.long,
                    }}
                >
                    {!this.props.loading && this.eventMarkers()}
                    {(!this.props.loading && this.props.hangouts.length > 0) && this.hangoutMarkers()}
                </Map>
            </>
        )
    }
} 

const mapStateToProps = (state) => ({
    events: state.events.eventsByLocation,
    eventsPresent: !!state.events.eventsByLocation._embedded,
    // hangoutsUnchanged: (state.hangouts.myHangouts.length === this.props.hangouts),
    hangouts: state.hangouts.myHangouts,
    lat: state.users.lat,
    long: state.users.lon,
    loading: state.events.loading
})

const mapDispatchToProps = (dispatch) => ({
    _loadEventDetails: (e) => dispatch(loadEventDetails(e)),
    _loadMyHangouts: () => dispatch(loadHangouts()),
    _loadPosition: () => dispatch(loadPositional())
})

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    // apiKey: ''
})(connect(mapStateToProps, mapDispatchToProps)(MapContainer))