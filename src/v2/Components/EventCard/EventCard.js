import React from 'react'
import {connect} from 'react-redux'

import { Grid, Button } from 'semantic-ui-react'

import Moment from 'react-moment'
import 'moment-timezone'
import { addEvent } from '../../../store/thunks/event';


function EventCard(props) {

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
        <Grid.Row columns={3} style={{borderBottom:"1px solid #b4c5e4", minHeight:"6em"}}>
            <Grid.Column width={3}>
                <div style={{fontWeight:"bold", fontSize:"18px", color:"#3c3744"}}>
                    <Moment tz="America/New_York" format="MMM DD">{date}</Moment>
                    {!!endDate && <Moment tz="America/New_York" format="-MMM DD">{endDate}</Moment>}
                </div>
                <Moment tz="America/New_York" format="ddd h:mma">{date}</Moment>
            </Grid.Column>
            <Grid.Column width={7} style={{fontSize:"16px", color:"#3c3744", padding: '0px 0px 0px 0px'}}>
                {name}
            </Grid.Column>
            <Grid.Column width={6} style={{display:'flex', flexDirection: 'column', justifyContent:'space-between', color:"#3c3744", alignItems:'left'}}>
                <div style={{ fontSize:'16px', fontWeight:'bold'}}>
                    {venueName}
                </div>
                <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank"> ${min} - ${max}</a> : 'prices n/a'}
                    </div>
                        <Button onClick={() => clickHandler(props)} basic color="red" size="mini" circular icon="heart" ></Button>
                    {/* {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank">buy tickets</a> : ''} */}
                </div>
            </Grid.Column>
        </Grid.Row>
    )
}

const mapDispatchToProps = dispatch => ({
    _addEvent: (data) => dispatch(addEvent(data))
})

export default connect(null, mapDispatchToProps)(EventCard)
