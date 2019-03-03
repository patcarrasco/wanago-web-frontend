import React, { PureComponent } from 'react'
import { Header, Segment, Button, Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { loadEventDetails } from '../../store/actions/eventActions';

class EventDetails extends PureComponent {

    exitHandler = () => this.props.loadEventDetails()

    render() {

        console.log(this.props.event)

        const {images, name, priceRanges, _embedded} = this.props.event
        const image = images.shift()
        // const date = dates.start.localDate
        // const time = dates.start.localTime
        const attractions = _embedded.attractions.map(e => e.name)
        const venues = _embedded.venues.map(e => e.name)
        console.log('price ranges is', !!priceRanges)
        debugger
        let priceRange;
        if (priceRanges) {
            priceRange = priceRanges.map(e => `${e.min} - ${e.max}`)
        }
        


        console.log(this.props)

        return (
            <Segment>
                <Header as='h2'>
                    {name}
                </Header>
                <Header as='h3'>
                    {attractions}
                </Header>
                <Image src={image.url} />
                <Header>
                    {priceRange}
                </Header>
                <Header>
                    {venues}
                </Header>
                <Button onClick={this.exitHandler} />
            </Segment>
        )
    }
}

const mapStateToProps = (state) => ({
    event: state.events.selectedEvent
})

const mapDispatchToProps = (dispatch) => ({
    loadEventDetails: () => dispatch(loadEventDetails(false))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)