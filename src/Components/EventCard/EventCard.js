import React, { PureComponent } from 'react'
import { Card } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { loadEventDetails } from '../../store/actions/eventActions';

class EventCard extends PureComponent {

    clickHandler = () => {
        this.props.loadEventDetails(this.props.event)
    }

    render(){
        console.log(this.props.event)
        const {name, _embedded, dates} = this.props.event
        const {attractions, venues} = _embedded
        let artists;
        // const image = images.shift().url
        if (attractions) {
            artists = attractions.map(e => e.name)
        }
        const city = venues.map(e => e.name)
        const date = dates.start.localDate
        const time = dates.start.localTime
        return(
            <Card centered color='red' size='huge' onClick={this.clickHandler}>
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

const mapDispatchToProps = (dispatch) => ({
    loadEventDetails: (event) => (dispatch(loadEventDetails(event)))
})

export default connect(null, mapDispatchToProps)(EventCard)