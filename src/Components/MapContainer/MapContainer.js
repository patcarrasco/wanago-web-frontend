import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import { loadEventDetails } from '../../store/actions/eventActions';
import { loadHangouts } from '../../store/thunks/hangouts'
import {loadPositional} from '../../store/thunks/users'


import pin from '../../assets/images/pin.svg'
import hangoutPin from '../../assets/images/hangoutpin.svg'
import { Header, Portal } from 'semantic-ui-react';

const styles = [
    // {width: '10vh', height:'10%'},
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
    }
    ]
    
const size = {width: '100%', height:'100%'}

class MapContainer extends PureComponent {
    state={mouseover:false}

    mouseOverHandler = () => {
        console.log('in')
        this.setState({mouseover: true})
    }

    mouseOutHandler = () => {
        console.log('out')
        this.setState({mouseover: false})
    }

    hangoutInfo = () => (
        <Portal>
            <Header>stuff</Header>
        </Portal>
    )

    eventMarkers = () => {
        const rawEvents = this.props.events
        console.log('in event markers')
        console.log(rawEvents)
        if (!!rawEvents._embedded && rawEvents.page.totalElements > 0) {
            console.log('found events!')
            const events = rawEvents._embedded.events.filter(e => !!e._embedded)
            const marks = events.map((e,idx) => {
                const event = e
                if (event._embedded.venues[0].location) {
                    console.log('creating!')
                    const {name, _embedded} = e
                    const venueInfo = _embedded.venues[0]
                    const venue = venueInfo.name
                    const lat = venueInfo.location.latitude
                    const lng = venueInfo.location.longitude
                    return (
                            <Marker
                                key={idx}
                                title={name}
                                name={venue}
                                position={
                                    {
                                        lat: lat,
                                        lng: lng,
                                    }
                                } 
                                icon={{
                                    url: pin,
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
        const hangouts = this.props.hangouts.map(e => {
            // console.log(e.lat, e.long)
            return (
                <Marker 
                    key={e.id}
                    title={e.name}
                    position={
                        {
                            lat:e.lat,
                            lng: e.long,
                        }
                    }
                    icon={{
                        url: hangoutPin, 
                        anchor: new window.google.maps.Point(17, 34),
                        scaledSize: new window.google.maps.Size(40, 40)  
                    }}
                    onClick={free => console.log('hangout clicked', e.name)}
                />
            )
        })
        return hangouts
    }

    userLocation = () => {
        // debugger
        const first = this.props.events._embedded.events[0]._embedded.venues[0].location
        return {
            lat: first.latitude,
            lng: first.longitude
        }
    }


    componentDidMount() {
        this.props._loadMyHangouts()
    }
    
    componentDidUpdate() {
        if (this.props.events.length > 0) {
            this.userLocation()
            return 0
        }
        this.props._loadPosition()
    }

    render() {
        return (
            <Map 
                google={this.props.google}
                zoom={14}
                styles={styles}
                style={size}
                center={{
                    lat: this.props.eventsPresent ? this.userLocation().lat : this.props.lat,
                    lng: this.props.eventsPresent ? this.userLocation().lng : this.props.long,
                }}
            >
                {this.eventMarkers()}
                {this.props.hangouts.length > 0 && this.hangoutMarkers()}
            </Map>
        )
    }
} 

const mapStateToProps = (state) => ({
    events: state.events.eventsByLocation,
    eventsPresent: !!state.events.eventsByLocation._embedded,
    hangouts: state.hangouts.myHangouts,
    lat: state.users.lat,
    long: state.users.lon,
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