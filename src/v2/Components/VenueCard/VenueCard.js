import React from 'react'
import {connect} from 'react-redux'
import { Grid, Button } from 'semantic-ui-react';

import {getVenueInformation} from '../../../store/thunks/venue'
import {selectVenue} from '../../../store/actions/venueActions'

function VenueCard(props) {

    const venueClickHandler = () => {
        let latlng = new window.google.maps.LatLng(props.location.latitude, props.location.longitude)
        props._selectVenue(props)
        props._loadVenueEvents(props.id)
        props.map.map.panTo(latlng)
        props.showVenueInfoHandler()
    }

    let {name} = props
    if (name.length > 30) {
        name = name.slice(0,30) + "..."
    }

    // console.log(props.map.map.panTo)
    return (
        <Grid.Row columns={2} style={{borderBottom:"1px solid #b4c5e4", minHeight:"6em"}}>
            <Grid.Column style={{fontSize:"16px", color:"#3c3744"}}>
            <div style={{fontWeight:"bold", fontSize:"18px", color:"#3c3744"}}>
                {name}
            </div>
            <div>
                {props.distance} miles away
            </div>
            </Grid.Column>
            <Grid.Column style={{fontSize:"16px", color:"#3c3744", alignItems:'center'}}>
                <div>
                    Upcoming Events: {props.upcomingEvents._total}
                </div>
                <div>
                    <Button className={"show-venue-info"}fluid onClick={() => venueClickHandler()}>Scheduled Events</Button>
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