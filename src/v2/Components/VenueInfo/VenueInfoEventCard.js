import React from 'react'
import {connect} from 'react-redux'

import { Grid, Button } from 'semantic-ui-react'

import Moment from 'react-moment'
import 'moment-timezone'
import { addEvent } from '../../../store/thunks/event';


function VenueInfoEventCard(props) {

    function clickHandler(props) {
        // console.log(props)
        props._addEvent(props)
    }

    let {name, venues, dates, priceRanges} = props // {image, attractions}
    let date = dates.start.dateTime
    let endDate = !!dates.end ? dates.end.dateTime : false
    let venueName = !!venues ? venues[0].name : ""
    if (venueName.length > 30) {
        venueName = venueName.slice(0,30) + "..."
    }
    if (name.length > 50) {
        name = name.slice(0,45) + ". . ."
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
        <Grid.Row columns={4} style={{borderBottom:"1px solid #b4c5e4", minHeight:"6em"}}>
            <Grid.Column width={4}>
                <div style={{fontWeight:"bold", fontSize:"18px", color:"#3c3744"}}>
                    <Moment tz="America/New_York" format="MMM DD">{date}</Moment>
                    {!!endDate && <Moment tz="America/New_York" format="-MMM DD">{endDate}</Moment>}
                </div>
                <Moment tz="America/New_York" format="ddd h:mma">{date}</Moment>
            </Grid.Column>
            <Grid.Column style={{ color:"#3c3744", padding: '0px 14px 0px 0px',}} width={7}>
                <div style={{fontSize:"16px"}}>
                    {name}
                </div>
            </Grid.Column>
            <Grid.Column width={3} style={{padding: '0px 0px'}}>
                    Price:
                <div style={{display: 'flex', alignItems: 'center', fontSize:'14px'}}>
                    {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank"> ${min} - ${max}</a> : 'not available'}
                </div>
            </Grid.Column>
            <Grid.Column width={2} style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                <Button onClick={() => clickHandler(props)} basic color="red" size="mini" circular icon="heart" ></Button>
            </Grid.Column>
        </Grid.Row>
    )
}

const mapDispatchToProps = (dispatch) => ({
    _addEvent: (data) => dispatch(addEvent(data))
})

export default connect(null, mapDispatchToProps)(VenueInfoEventCard)


