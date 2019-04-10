import React from 'react'

import { Grid } from 'semantic-ui-react'

import Moment from 'react-moment'
import 'moment-timezone'


function VenueInfoEventCard(props) {
    let {name, venues, dates} = props // {image, attractions}
    // const attractionNames = !!attractions ? attractions.map(att => att.name).join(', ') : ''
    let date = dates.start.dateTime
    let endDate = !!dates.end ? dates.end.dateTime : false
    let venueName = !!venues ? venues[0].name : ""
    if (venueName.length > 30) {
        venueName = venueName.slice(0,30) + "..."
    }
    if (name.length > 55) {
        name = name.slice(0,55) + "..."
    }

    return (
        <Grid.Row columns={2} style={{borderBottom:"1px solid #b4c5e4", minHeight:"6em"}}>
            <Grid.Column>
                <div style={{fontWeight:"bold", fontSize:"18px", color:"#3c3744"}}>
                    <Moment tz="America/New_York" format="MMM DD">{date}</Moment>
                    {!!endDate && <Moment tz="America/New_York" format="-MMM DD">{endDate}</Moment>}
                </div>
                <Moment tz="America/New_York" format="ddd h:mma">{date}</Moment>
            </Grid.Column>
            <Grid.Column style={{fontSize:"16px", color:"#3c3744"}}>
                {name}
            </Grid.Column>
        </Grid.Row>
    )
}

export default VenueInfoEventCard


