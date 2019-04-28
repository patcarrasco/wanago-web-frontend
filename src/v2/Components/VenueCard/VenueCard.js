import React from 'react'
import {connect} from 'react-redux'
import { Grid, Button, Responsive } from 'semantic-ui-react';

import {getVenueInformation} from '../../../store/thunks/venue'
import {selectVenue} from '../../../store/actions/venueActions'

function VenueCard(props) {

    const venueClickHandler = () => {
        let latlng = new window.google.maps.LatLng(props.location.latitude, props.location.longitude)
        props._selectVenue(props)
        props._loadVenueEvents(props.id)
        props.map.map.setZoom(15)
        props.map.map.panTo(latlng)
        props.map.map.panBy(0, 0)
        props.showVenueInfoHandler()
    }

    const venueClickHandlerMobile = () => {
        let latlng = new window.google.maps.LatLng(props.location.latitude, props.location.longitude)
        props._selectVenue(props)
        props._loadVenueEvents(props.id)
        props.map.map.panTo(latlng)
        props.map.map.setZoom(15)
        props.map.map.panBy(0, -30)
        props.showVenueInfoHandler()
    }

    const buttonContent = () => {
        if (props.upcomingEvents._total > 1) {
            return `${props.upcomingEvents._total} events`
        } else {
            return `1 event`
        }
    }

    let {name} = props
    if (name.length > 40) {
        name = name.slice(0,40) + "..."
    }

    return (
        <Grid.Row columns={2} style={{borderBottom:"1px solid #b4c5e4", minHeight:"6em"}}>
            <Grid.Column width={10} style={{fontSize:"14px", color:"#3c3744"}}>
            <div style={{fontSize:"18px", color:"#090c9b"}}>
                {name}
            </div>
            <div>
                {props.city} - {props.distance} miles away
            </div>
            </Grid.Column>
            <Grid.Column width={6}>
                <div>
                    <Responsive minWidth={1000}>
                        <Button size="small" content={buttonContent()} icon="map marker" style={{backgroundColor:'#b4c5e4', borderRadius:'unset'}} className={"show-venue-info"}fluid onClick={() => venueClickHandler()}/>
                    </Responsive>
                    <Responsive maxWidth={999}>
                        <Button size="small" content={buttonContent()} icon="map marker" style={{backgroundColor:'#b4c5e4', borderRadius:'unset'}} className={"show-venue-info"}fluid onClick={() => venueClickHandlerMobile()}/> 
                    </Responsive>
                </div>

            </Grid.Column>
        </Grid.Row>
    )
}

const mapStateToProps = (state) => ({
    map: state.map.map
})

const mapDispatchToProps = (dispatch) => ({
    _selectVenue: (venue) => dispatch(selectVenue(venue)),
    _loadVenueEvents: (id) => dispatch(getVenueInformation(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(VenueCard)