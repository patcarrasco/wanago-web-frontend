import React, { PureComponent } from 'react'
import { Header, Segment, Button, Image, Grid, Container } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { loadEventDetails} from '../../../store/actions/eventActions';
import {addEvent, getSavedEvents} from '../../../store/thunks/event'
import Moment from 'react-moment'
import 'moment-timezone'

class EventDetails extends PureComponent {

    exitHandler = () => this.props.loadEventDetails()

    handleEventSave = () => {
        const {name, title} = this.props.event.free
        const {images, dates, priceRanges, id} = this.props.event.event
        const image = images.find(img => img.ratio === "3_2")

        const data = {name, title, image, ...dates, ...priceRanges, id }

        this.props._addEvent(data).then(() => this.props._loadSavedEvents())    
    }

    render() {
        console.log(this.props.event)
        const {name, title} = this.props.event.free
        const {images, dates} = this.props.event.event
        const image = images.find(img => img.ratio === "3_2")
        const dateTime = dates.start.dateTime
        const time = dates.start.localTime
        const date = dates.start.localDate
        // console.log(image)
        // debugger
        return (
                <Segment inverted>
                    <Segment>
                        <Image src={image.url}/>
                    </Segment>
                    <Grid centered columns='equal'>
                        <Grid.Row>
                            <Header as='h2' inverted>
                                {title}
                            </Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Container>
                                {name}
                            </Container>
                        </Grid.Row>
                        <Grid.Row>
                                <Button color='green' inverted onClick={this.handleEventSave}> SAVE </Button>
                            {/* <Grid.Column>
                                <Button circular color='violet'> share </Button>
                            </Grid.Column> */}
                        </Grid.Row>
                        <Grid.Row>
                            <Container>
                                <Moment tz="America/New_York" format="ha z">{dateTime}</Moment>
                            </Container>
                            <Container>
                                <Moment format= "dddd MMM Do, YYYY">{dateTime}</Moment>
                            </Container>
                        </Grid.Row>
                    </Grid>
                </Segment>
        )
    }
}

const mapStateToProps = (state) => ({
    event: state.events.selectedEvent
})

const mapDispatchToProps = (dispatch) => ({
    loadEventDetails: () => dispatch(loadEventDetails(false)),
    _addEvent: (data) => dispatch(addEvent(data)),
    _loadSavedEvents: () => dispatch(getSavedEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)