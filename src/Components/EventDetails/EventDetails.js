import React, { PureComponent } from 'react'
import { Header, Segment, Button, Image, Modal, Container, Grid, Menu } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { loadEventDetails } from '../../store/actions/eventActions';

class EventDetails extends PureComponent {

    exitHandler = () => this.props.loadEventDetails()

    render() {
        // console.log(this.props.event)
        const {name, title} = this.props.event.free
        const {images, _embedded, dates, priceRanges} = this.props.event.event
        const image = images.find(img => img.ratio === "3_2")
        const localDate = dates.start.localDate
        const localTime = dates.start.localTime

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
                            <Grid.Column>
                                <Button circular color='green'> save </Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button circular color='violet'> share </Button>
                            </Grid.Column>
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
    loadEventDetails: () => dispatch(loadEventDetails(false))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)