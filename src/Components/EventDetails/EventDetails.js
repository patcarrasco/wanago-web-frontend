import React, { PureComponent } from 'react'
import { Header, Segment, Button, Image, Modal, Container, Grid, Menu } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { loadEventDetails} from '../../store/actions/eventActions';
import {addEvent} from '../../store/thunks/event'

class EventDetails extends PureComponent {

    exitHandler = () => this.props.loadEventDetails()

    handleEventSave = () => {
        const {name, title} = this.props.event.free
        const {images, _embedded, dates, priceRanges, id} = this.props.event.event
        const image = images.find(img => img.ratio === "3_2")

        const data = {name, title, image, ...dates, ...priceRanges, id }

        this.props._addEvent(data)        
        // this.setState()
    }

    render() {
        // console.log(this.props.event)
        const {name, title} = this.props.event.free
        const {images, _embedded, dates, priceRanges} = this.props.event.event
        const image = images.find(img => img.ratio === "3_2")
        const localTime = dates.localTime
        const localDate = dates.localDate

        // console.log(image)
        return (
                <Segment inverted>
                    <Grid centered columns='equal'>
                        <Grid.Row>
                            <Image fluid src={image.url} />
                        </Grid.Row>
                        <Grid.Row>
                            <Header as='h2' color='red'>
                                {title}
                            </Header>

                        </Grid.Row>
                        <Grid.Row>
                            {name}
                        </Grid.Row>
                        <Grid.Row>
                                <Button fluid circular color='green' onClick={this.handleEventSave}> save </Button>
                            {/* <Grid.Column>
                                <Button circular color='violet'> share </Button>
                            </Grid.Column> */}
                        </Grid.Row>
                        <Grid.Row>
                            {localTime}, {localDate}
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
    _addEvent: (data) => dispatch(addEvent(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)