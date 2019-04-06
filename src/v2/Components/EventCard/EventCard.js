import React from 'react'
import {connect} from 'react-redux'

import {feedVenueClick} from '../../../store/actions/mapActions'

import { Grid, Button } from 'semantic-ui-react'

import Moment from 'react-moment'
import 'moment-timezone'


function EventCard(props) {
    let {name, venues, dates} = props // {image, attractions}
    // const attractionNames = !!attractions ? attractions.map(att => att.name).join(', ') : ''
    let venueLoc = !! venues ? venues[0].location : {}
    let date = dates.start.dateTime
    let venueName = !!venues ? venues[0].name : ""
    if (venueName.length > 30) {
        venueName = venueName.slice(0,30) + "..."
    }
    if (name.length > 55) {
        name = name.slice(0,55) + "..."
    }

    return (
        <Grid.Row columns={3} style={{borderBottom:"1px solid #b4c5e4", minHeight:"6em"}}>
            <Grid.Column width={3}>
                <div style={{fontWeight:"bold", fontSize:"18px", color:"#3c3744"}}>
                    <Moment tz="America/New_York" format="MMM DD">{date}</Moment>
                </div>
                <Moment tz="America/New_York" format="ddd h:mma">{date}</Moment>
            </Grid.Column>
            <Grid.Column width={7} style={{fontSize:"16px", color:"#3c3744"}}>
                {name}
            </Grid.Column>
            <Grid.Column width={6} style={{fontSize:"16px", color:"#3c3744", alignItems:'center'}}>
                <Button fluid onClick={() => props._mapCenter(venueLoc)}>
                    {venueName}
                </Button>
            </Grid.Column>
        </Grid.Row>
    )
}

const mapDispatchToProps = (dispatch) => ({
    _mapCenter: coords => dispatch(feedVenueClick(coords))
})

export default connect(null, mapDispatchToProps)(EventCard)
