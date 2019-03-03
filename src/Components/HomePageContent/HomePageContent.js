import React from 'react'
import {Header, Segment, Form, Icon, Modal, Input, Dropdown} from 'semantic-ui-react'
import {connect} from 'react-redux'

// thunks
import {getSpotlightEvents, getEventsByLocation} from '../../store/thunks/event'
import SpotlightEventContainer from '../EventContainer/SpotlightEventContainer';
import EventsByLocationContainer from '../EventContainer/EventsByLocationContainer';
import EventDetails from '../EventDetails/EventDetails';

class HomePageContent extends React.PureComponent {
    state = {userLocation: 'New York', selected: false}

    componentDidMount() {
        this.props.getSpotlightEvents()
    }

    onChangeHandler = e => this.setState({userLocation: e.target.value})

    eventSearchHandler = () => {this.props.getEventsByLocation(this.state.userLocation)}

    searchByUserLocation = () => {
        const genres = [
            {   
                key: "concerts",
                text: "concerts",
                value: "concert"
            },
            {
                key: "sportevent",
                text: "Sport Events",
                value: "sporting event"
            }
        ]

        return (
        <Segment centered>
            <Form inverted>
                    <Form.Field>
                        <Input 
                            size='massive' 
                            placeholder = {`Search by city name: ${this.state.userLocation}`} 
                            icon={
                                <Icon 
                                    name='search'
                                    inverted
                                    circular
                                    link
                                    color='violet'
                                    onClick={this.eventSearchHandler}
                                />
                            }
                            onChange={this.onChangeHandler} 
                            />
                    </Form.Field>
            </Form>
        </Segment>
        )
    }

    render() {
        return (
            <>  
                <Modal open={this.props.selectedEvent}>
                    <EventDetails />
                </Modal>
                <SpotlightEventContainer />
                {this.searchByUserLocation()}
                <EventsByLocationContainer />
                <Segment inverted>
                    <Header> footer </Header>
                </Segment>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedEvent: !!state.events.selectedEvent
})

const mapDispatchToProps = (dispatch) => ({
    getSpotlightEvents: () => dispatch(getSpotlightEvents()),
    getEventsByLocation: (query) => dispatch(getEventsByLocation(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContent)