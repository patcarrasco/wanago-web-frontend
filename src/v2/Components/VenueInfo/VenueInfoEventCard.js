import React from 'react'

import { Grid } from 'semantic-ui-react'

import Moment from 'react-moment'
import 'moment-timezone'


function VenueInfoEventCard(props) {


    let {name, venues, dates, priceRanges} = props // {image, attractions}
    let date = dates.start.dateTime
    let endDate = !!dates.end ? dates.end.dateTime : false
    let venueName = !!venues ? venues[0].name : ""
    if (venueName.length > 30) {
        venueName = venueName.slice(0,30) + "..."
    }
    if (name.length > 55) {
        name = name.slice(0,55) + "..."
    }
    let max = null
    let min = null
    if (!!priceRanges) {
        for (let i = 0; i < priceRanges.length; i++) {
            if (min === null || priceRanges[i].min < min) {
                min = priceRanges[i].min
            }
            if (max === null || priceRanges[i].max > max) {
                max = priceRanges[i].max
            }
        }
    }


    return (
        <Grid.Row columns={2} style={{borderBottom:"1px solid #b4c5e4", minHeight:"6em"}}>
            <Grid.Column width={4}>
                <div style={{fontWeight:"bold", fontSize:"18px", color:"#3c3744"}}>
                    <Moment tz="America/New_York" format="MMM DD">{date}</Moment>
                    {!!endDate && <Moment tz="America/New_York" format="-MMM DD">{endDate}</Moment>}
                </div>
                <Moment tz="America/New_York" format="ddd h:mma">{date}</Moment>
            </Grid.Column>
            <Grid.Column style={{ color:"#3c3744"}} width={8}>
                <div style={{fontSize:"20px", fontWeight:'bold'}}>
                    {name}
                </div>
            </Grid.Column>
            <Grid.Column width={4}>
                <div style={{ fontSize:'16px'}}>
                    {(!!max && !!min) ? `$${min} - $${max}` : 'prices not available'}
                </div>
                <div>
                    {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank">buy tickets</a> : ''}
                </div>
            </Grid.Column>
        </Grid.Row>
    )
}

export default VenueInfoEventCard


