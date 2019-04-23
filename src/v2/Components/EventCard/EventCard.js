import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import { Grid, Button } from 'semantic-ui-react'

import Moment from 'react-moment'
import 'moment-timezone'
import { addEvent, deleteEvent } from '../../../store/thunks/event';

import { setActiveMarker } from '../../../store/actions/mapActions';

function EventCard(props) {
    const [initialized, setInitialized] = useState(false)
    const [savedActive, setSavedActive] = useState(false)

    function addToSaved() {
        if (!savedActive) {
            setSavedActive(true)
            props._addEvent(props)
        } else {
            setSavedActive(false)
            props._deleteEvent(props.id)
        }
    }

    let {name, venues, dates, priceRanges} = props // {image, attractions}
    let date = dates.start.dateTime
    let endDate = !!dates.end ? dates.end.dateTime : false
    let venueName = !!venues ? venues[0].name : ""
    if (venueName.length > 40) {
        venueName = venueName.slice(0,37) + "..."
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

    const {latitude, longitude} = venues[0].location

    const latlng = new props.map.props.google.maps.LatLng(latitude, longitude)

    function addMarker() {
        return new props.map.props.google.maps.Marker({
            position: latlng,
            map: props.map.map,
            icon:{
                // size: new props.map.props.google.maps.Size(60, 30.26),
                // anchor: new props.map.props.google.maps.Point(30, 30.26),
                // url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/134893/pin-red.svg',
                url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/134893/pin-red.svg',
                anchor: new window.google.maps.Point(30, 34),
                scaledSize: new window.google.maps.Size(100, 50)
            }
        })
    }

    function centerMapOnMarker() {
        const marker = addMarker()
        props.addMarkerToRecord(marker)
        props.map.map.setZoom(15)
        props.map.map.panTo(marker.position)
        props.map.map.panBy(0, 25)
    }

  
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
                <div style={{fontSize:'14px', color:"#090c9b"}}>
                    {name}
                </div>
                <div>
                    {venueName}
                </div>
                <div>
                    {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank"> ${min} - ${max}</a> : 'prices n/a'}
                </div>
            </Grid.Column>
            <Grid.Column width={2} style={{display:'flex', flexDirection: 'column', justifyContent:"space-between", padding:'4px 0px 0px 0px'}}>
                <div>
                    <Button size="mini" circular icon="map marker" onClick={centerMapOnMarker} style={{margin:'4px', }}/>
                </div>
                <div>
                    <Button size="mini" circular icon='heart' onClick={addToSaved} style={{margin:'4px', backgroundColor: savedActive ? '#3d52d5' : '#b4c5e4', color: savedActive ? 'white' : ""}}/>
                </div>
            </Grid.Column>
        </Grid.Row>
    )

    useEffect(() => {
        if (!initialized) {
            props.savedEventIds.includes(props.id) && setSavedActive(true)
            setInitialized(true)
        }
    })
    
    return initialized ? mobile() : <div></div>
}

const mapStateToProps = state => ({
    savedEventIds: state.events.savedEventIds,
    map: state.map.map,
})

const mapDispatchToProps = dispatch => ({
    _addEvent: (data) => dispatch(addEvent(data)),
    _setActiveMarker: (marker) => dispatch(setActiveMarker(marker)),
    _deleteEvent: (id) => dispatch(deleteEvent(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventCard)
