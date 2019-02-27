import React, { PureComponent } from 'react'
import { Card } from 'semantic-ui-react'

class EventCard extends PureComponent {

    render(){
        const {name, artist, description, venue, city, time} = this.props.event
        return(
            <Card centered color='red' size='huge'>
                <Card.Content>
                    <Card.Header>
                        {name}
                    </Card.Header>
                    <Card.Meta>
                        {artist}
                    </Card.Meta>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {`${time} - ${venue}, ${city}`}
                </Card.Content>
            </Card>
        )
    }
}

export default EventCard