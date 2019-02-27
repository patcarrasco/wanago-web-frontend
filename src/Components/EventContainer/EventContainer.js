import React, { PureComponent } from 'react'
import { Card } from 'semantic-ui-react'
import data from '../../data.js'
import EventCard from '../EventCard/EventCard';

class EventContainer extends PureComponent {

    cards() {
        // console.log(data)
        return data.map((e, idx) => <EventCard key={idx} event={e} />)
    }

    render(){
        return(
            <Card.Group>
                {this.cards()}
            </Card.Group>
        )
    }
}

export default EventContainer