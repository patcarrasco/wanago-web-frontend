import React, { PureComponent } from 'react'
import { Card } from 'semantic-ui-react'
import EventCard from '../EventCard/EventCard';
import {connect} from 'react-redux'

class EventsByLocationContainer extends PureComponent {

    
    events = () => {
        let events = this.props.eventsByLocation || false
        if (events !== false && events._embedded) {
            let eventsArr = events._embedded.events.slice(0,9)
            return eventsArr.map(e => <EventCard key={e.id} event={e} /> )
        } else {
            return <></>
        }
    }
    
    render(){
        return(
            <Card.Group>
                {this.events()}
            </Card.Group>
        )
    }
}


const mapStateToProps = (state) => ({
    eventsByLocation: state.events.eventsByLocation
})

export default connect(mapStateToProps)(EventsByLocationContainer)


