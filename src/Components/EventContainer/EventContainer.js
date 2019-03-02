import React, { PureComponent } from 'react'
import { Card } from 'semantic-ui-react'
import EventCard from '../EventCard/EventCard';

class EventContainer extends PureComponent {

    cards = () => {
        let events = this.props.events || false
        if (events !== false) {
            let eventsArr = events._embedded.events
            return eventsArr.map(e => <EventCard key={e.id} event={e} /> )
        } else {
            return null
        }
    }

    render(){
        return(
            <Card.Group inverted>
                {this.cards()}
            </Card.Group>
        )
    }
}

export default EventContainer