import React from 'react'
import {connect} from 'react-redux'

import { Grid, Button, Icon, Responsive } from 'semantic-ui-react'

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
    if (venueName.length > 45) {
        venueName = venueName.slice(0,42) + "..."
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
        <Grid.Row columns={2} style={{borderBottom:"1px solid #b4c5e4", minHeight: "10em", maxHeight:"10em", fontSize:'11px'}}>
            <Grid.Column width={4}>
                <div style={{height:'50%'}}>
                    <div style={{fontSize:"22px", color:"#3c3744", alignItems:'center'}}>
                        <Moment tz="America/New_York" format="ddd">{date}</Moment>
                    </div>
                    <Moment tz="America/New_York" format="MMM DD">{date}</Moment>
                    {!!endDate && <Moment tz="America/New_York" format="-MMM DD">{endDate}</Moment>}
                </div>
                {/* <div style={{height:'50%', display:'flex', justifyContent:'center'}}>
                    <Button circular onClick={() => clickHandler(props)} basic color="red" size="large" icon="heart" style={{borderRadius:'unset'}} ></Button>
                </div> */}
            </Grid.Column>
            <Grid.Column width={10} style={{padding:'0px 0px 0px 0px'}}>
                <div style={{fontSize:'13px'}}>
                    {name}
                </div>
                <div>
                    {formatTime(date)} - {venueName}
                </div>
                    {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank"> ${min} - ${max}</a> : 'prices n/a'}
            </Grid.Column>
            <Grid.Column width={2}>
                <button style={{border:'none', backgroundColor: 'transparent', alignSelf:'center', padding: '0px 0px 0px 0px'}}>
                    <div style={{}}>
                        <Icon style={{color:'#b4c5e4'}} name='heart' size='large' />
                    </div>
                </button>
            </Grid.Column>
        </Grid.Row>
    )

    return mobile()
}

const mapDispatchToProps = dispatch => ({
    _addEvent: (data) => dispatch(addEvent(data))
})

export default connect(null, mapDispatchToProps)(EventCard)
