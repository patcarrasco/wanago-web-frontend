import React from 'react'
import {connect} from 'react-redux'

import { Grid, Button } from 'semantic-ui-react';
import Moment from 'react-moment'
import { deleteEvent } from '../../../store/thunks/event';

function SavedEventItem(props) {

    let {name} = props

    if (name.length > 30) {
        name = name.slice(0,27) + "..."
    }  

    function clickHandler() {
        props.removeEvent(props.identifier)
    }
    
    return (
        <Grid.Row key={props.identifier} style = {{borderBottom: 'solid 1px #b4c5e4', padding: '14px 14px', minHeight: '4em', fontSize:'12px'}}>
            <Grid.Column width={4} style={{padding: '0px 0px 0px 0px', display:'flex', flexDirection: 'column'}}>
                <div style={{fontSize:"14px", color:"#090c9b"}}>
                    <Moment tz="America/New_York" format="ddd MMM DD">{props.date}</Moment>
                </div>
                <div>
                    <Moment tz="America/New_York" format="h:mma">{props.date}</Moment>
                </div>
                <a style={{justifySelf: 'flex-end'}} href={props.url} rel="noopener noreferrer" target="_blank"> Event Info </a>
            </Grid.Column>
            <Grid.Column width={10}>
                <div>
                    {name}
                </div>
                <div style={{}}>
                    {props.information}
                </div>
            </Grid.Column>
            <Grid.Column width={2} style={{padding: '0px'}}>
                <Button onClick={clickHandler} size="medium" circular icon="trash"/>
            </Grid.Column>
        </Grid.Row>
    )
}

const mapDispatchToProps = dispatch => ({
    removeEvent: (id) => dispatch(deleteEvent(id))
})

export default connect(null, mapDispatchToProps)(SavedEventItem)