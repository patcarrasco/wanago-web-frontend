import React, {useState} from 'react'
import {connect} from 'react-redux'

import { Grid, Button } from 'semantic-ui-react'

import Moment from 'react-moment'
import 'moment-timezone'
import { addEvent } from '../../../store/thunks/event';


function EventCard(props) {

    function clickHandler(props) {
        props._addEvent(props)
    }

    let {name, venues, dates, priceRanges} = props // {image, attractions}
    let date = dates.start.dateTime
    let endDate = !!dates.end ? dates.end.dateTime : false
    let venueName = !!venues ? venues[0].name : ""
    if (venueName.length > 56) {
        venueName = venueName.slice(0,50) + "..."
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

    const desktop = () => (
        <Grid.Row columns={3} style={{borderBottom:"1px solid #b4c5e4", minHeight:"6em"}}>
            <Grid.Column width={4}>
                <div style={{fontWeight:"bold", fontSize:"18px", color:"#3c3744"}}>
                    <Moment tz="America/New_York" format="MMM DD">{date}</Moment>
                    {!!endDate && <Moment tz="America/New_York" format="-MMM DD">{endDate}</Moment>}
                </div>
                <Moment tz="America/New_York" format="ddd h:mma">{date}</Moment>
            </Grid.Column>
            <Grid.Column width={6} style={{fontSize:"16px", color:"#3c3744", padding: '0px 0px 0px 0px'}}>
                {name}
            </Grid.Column>
            <Grid.Column width={6} style={{display:'flex', flexDirection: 'column', justifyContent:'space-between', color:"#3c3744", alignItems:'left'}}>
                <div style={{ fontSize:'16px', fontWeight:'bold'}}>
                    {venueName}
                </div>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <div style={{display: 'flex', alignItems: 'center', width:'75%'}}>
                        {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank"> ${min} - ${max}</a> : 'prices n/a'}
                    </div>
                    <div style={{width:'25%'}}>
                        <Button onClick={() => clickHandler(props)} basic color="red" size="mini" icon="heart" style={{borderRadius:'unset'}} ></Button>
                    </div>
                    {/* {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank">buy tickets</a> : ''} */}
                </div>
            </Grid.Column>
        </Grid.Row>
    )

    function formatTime(time) {
        return <Moment tx="America/New_York" format="h:mm a">{time}</Moment>
    }

    const mobile = () => (
        <Grid.Row columns={2} style={{borderBottom:"1px solid #b4c5e4", minHeight: "9em", maxHeight:"9em", fontSize:'12px'}}>
            <Grid.Column width={4}>
                <div>
                    <div style={{fontSize:"22px", color:"#090c9b", alignItems:'center'}}>
                        <Moment tz="America/New_York" format="ddd">{date}</Moment>
                    </div>
                    {!!endDate ? <>ends <Moment tz="America/New_York" format="MMM DD">{endDate}</Moment></> : <Moment tz="America/New_York" format="MMM DD">{date}</Moment>}
                </div>
                <div>
                    {formatTime(date)}
                </div>
            </Grid.Column>
            <Grid.Column width={10} style={{padding:'0px 0px 0px 0px'}}>
                <div style={{fontSize:'14px', color:"#3c3744"}}>
                    {name}
                </div>
                <div>
                    {venueName}
                </div>
                <div>
                    {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank"> ${min} - ${max}</a> : 'prices n/a'}
                </div>
            </Grid.Column>
            <Grid.Column width={2}>
                <Button size="large" icon='heart' onClick={() => clickHandler(props)} style={{border:'none', color: props.savedEventIds.includes(props.id) ? 'red' : "#b4c5e4", backgroundColor: 'transparent', alignSelf:'center', padding: '0px 0px 0px 0px'}}>
                </Button>
            </Grid.Column>
        </Grid.Row>
    )

    return mobile()
}

const mapStateToProps = state => ({
    savedEventIds: state.events.savedEventIds
})

const mapDispatchToProps = dispatch => ({
    _addEvent: (data) => dispatch(addEvent(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventCard)
