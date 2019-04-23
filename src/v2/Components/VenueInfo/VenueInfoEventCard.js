import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import { Grid, Button } from 'semantic-ui-react'

import Moment from 'react-moment'
import 'moment-timezone'
import { addEvent, deleteEvent } from '../../../store/thunks/event';


function VenueInfoEventCard(props) {
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

    let {name, dates, priceRanges} = props // {image, attractions}
    let date = dates.start.dateTime
    let endDate = !!dates.end ? dates.end.dateTime : false
   
    if (name.length > 70) {
        name = name.slice(0,65) + ". . ."
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

    function formatTime(time) {
        return <Moment tx="America/New_York" format="h:mm a">{time}</Moment>
    }

    const mobile = () => (
        <Grid.Row columns={2} style={{borderBottom:"1px solid #b4c5e4", minHeight: "8em", maxHeight:"8em", fontSize:'12px'}}>
            <Grid.Column width={4}>
                <div style={{height:'50%'}}>
                    < div style = {
                        {
                            fontSize: "22px",
                            color: "#090c9b",
                            alignItems: 'center'
                        }
                    } >
                        <Moment tz="America/New_York" format="ddd">{date}</Moment>
                    </div>
                    <Moment tz="America/New_York" format="MMM DD">{date}</Moment>
                    {!!endDate && <Moment tz="America/New_York" format="-MMM DD">{endDate}</Moment>}
                    <div>
                        {formatTime(date)}
                    </div>
                </div>
            </Grid.Column>
            <Grid.Column width={10} style={{padding:'0px 0px 0px 0px'}}>
                < div style = {
                    {
                        fontSize: '16px',
                        color: "#090c9b"
                    }
                } >
                    {name}
                </div>
                    {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank"> ${min} - ${max}</a> : 'prices n/a'}
            </Grid.Column>
            <Grid.Column width={2}>
                <Button size="tiny" circular icon='heart' onClick={addToSaved} style={{backgroundColor: savedActive ? '#3d52d5' : '#b4c5e4', color: savedActive ? 'white' : ""}}/>
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
    savedEventIds: state.events.savedEventIds
})

const mapDispatchToProps = (dispatch) => ({
    _addEvent: (data) => dispatch(addEvent(data)),
    _deleteEvent: (id) => dispatch(deleteEvent(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VenueInfoEventCard)


