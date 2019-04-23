import React from 'react'
import {connect} from 'react-redux'

import { Grid, Button } from 'semantic-ui-react';
import Moment from 'react-moment'
import { deleteEvent } from '../../../store/thunks/event';

function SavedEventItem(props) {

    function clickHandler() {
        props.removeEvent(props.identifier)
    }

    return (
        <Grid.Row key={props.identifier} style = {{borderBottom: 'solid 1px #b4c5e4', padding: '14px 14px'}}>
            <Grid.Column width={6} style={{padding: '0px 0px 0px 0px'}}>
                <div style={{fontWeight:"bold", fontSize:"14px", color:"#3c3744"}}>
                    <Moment tz="America/New_York" format="ddd, MMM h:mma">{props.date}</Moment>
                </div>
                <a href={props.url} rel="noopener noreferrer" target="_blank"> Ticket Information </a>
            </Grid.Column>
            <Grid.Column width={8}>
                {props.name}
            </Grid.Column>
            <Grid.Column width={2}>
                <Button onClick={clickHandler} size="medium" circular icon="trash"/>
            </Grid.Column>
        </Grid.Row>
    )
}

const mapDispatchToProps = dispatch => ({
    removeEvent: (id) => dispatch(deleteEvent(id))
})

export default connect(null, mapDispatchToProps)(SavedEventItem)