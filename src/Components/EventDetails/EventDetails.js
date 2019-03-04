import React, { PureComponent } from 'react'
import { Header, Segment, Button, Image, Modal } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { loadEventDetails } from '../../store/actions/eventActions';

class EventDetails extends PureComponent {

    exitHandler = () => this.props.loadEventDetails()

    render() {
        console.log(this.props.event)
        const {name, title} = this.props.event.free
        const {images, _embedded, dates, priceRanges} = this.props.event.event
        const image = images.shift().url
        const localDate = dates.start.localDate
        const localTime = dates.start.localTime

        console.log(image)
        return (
            <Modal open={true}>
                <Modal.Content>
                    <Image src={image}/>
                    <Segment>
                        <Header as='h1'>
                            {title}
                        </Header>
                        <Header as='h3'>
                            {name}
                        </Header>
                        <Header>
                            {localTime}, {localDate}
                        </Header>
                        <Header>
                        </Header>
                        <Button onClick={this.exitHandler}> close </Button>
                        <Button> add to events </Button>
                        <Button> share with friends </Button>


                    </Segment>
                </Modal.Content>
            </Modal>
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