import React, { PureComponent } from 'react'
import { Card, Image } from 'semantic-ui-react'

class EventCard extends PureComponent {

    render(){
        const {name, _embedded, dates, images} = this.props.event
        const {attractions, venues} = _embedded
        const image = images.shift().url
        const artists = attractions.map(e => e.name)
        const city = venues.map(e => e.name)
        const date = dates.start.localDate
        const time = dates.start.localTime
        console.log(images)
        return(
            <Card centered color='red' size='huge'>
                <Card.Content>
                    <Card.Header>
                        {name}
                    </Card.Header>
                    <Card.Meta>
                        {artists}
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    {city}
                    {date}
                    {time}
                </Card.Content>
            </Card>
        )
    }
}

export default EventCard