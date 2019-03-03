import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'

const mapstyles = {
    width: '98%',
    height: '98%'
}

class MapContainer extends PureComponent {
    state = {
        lat: 40.698330,
        lng: -74.053250
    }

    markers() {
        const events = this.props.events
        if (!!events) {
            const marks = events._embedded.events.map((e,idx) => {
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
                    />
                )
            })
            return marks
        }
        return null
    }

    userLocation = () => {
        const first = this.props.events._embedded.events[0]._embedded.venues[0].location
        this.setState({
            lat: first.latitude,
            lng: first.longitude
        })
    }

    componentDidUpdate() {
        console.log('in component update')
        this.userLocation()
    }

    render() {
        console.log('re rendered with', this.state.lat, this.state.lng)
        return (
            <Map 
                google={this.props.google}
                zoom={14}
                style={mapstyles}
                center={{
                    lat: this.state.lat,
                    lng: this.state.lng
                }}
            >
                {this.markers()}
            </Map>
        )
    }
} 

const mapStateToProps = (state) => ({
    selectedEvent: !!state.events.selectedEvent,
    events: state.events.eventsByLocation
})

export default GoogleApiWrapper({
    // apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    apiKey: ''
})(connect(mapStateToProps)(MapContainer))