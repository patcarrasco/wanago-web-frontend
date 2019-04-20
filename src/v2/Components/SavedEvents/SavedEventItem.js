import React from 'react'
import {connect} from 'react-redux'

import { Grid, Button } from 'semantic-ui-react';
import Moment from 'react-moment'
import { deleteEvent } from '../../../store/thunks/event';

function SavedEventItem(props) {

    function clickHandler() {
        console.log('clicked to remove!', props.id)
        props.removeEvent(props.id)
    }

    return (
        <Grid.Row key={props.identifier} style = {{borderBottom: 'solid 1px #b4c5e4'}}>
            <Grid.Column width={8}>
                {props.name}
            </Grid.Column>
            <Grid.Column width={6} style={{padding: '0px 0px 0px 0px'}}>
                <div style={{fontWeight:"bold", fontSize:"16px", color:"#3c3744"}}>
                    <Moment tz="America/New_York" format="ddd, MMM h:mma">{props.date}</Moment>
                </div>
                <a href={props.url} rel="noopener noreferrer" target="_blank"> more information </a>
            </Grid.Column>
            <Grid.Column width={2}>
                <Button onClick={clickHandler} color="red" basic size="mini" circular icon="trash">
                </Button>
            </Grid.Column>
        </Grid.Row>
    )
}

const mapDispatchToProps = dispatch => ({
    removeEvent: (id) => dispatch(deleteEvent(id))
})

export default connect(null, mapDispatchToProps)(SavedEventItem)