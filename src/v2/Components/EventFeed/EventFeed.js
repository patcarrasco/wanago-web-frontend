import React, { PureComponent } from 'react'
import { Segment, Header, Card, Dimmer, Loader, Transition } from 'semantic-ui-react';

import {connect} from 'react-redux'
import {getEventsByLocation} from '../../../store/thunks/event'

import {EventCard} from '../EventCard/EventCard'

class EventFeed extends PureComponent {
    state={firstLoadComplete: false, localEventsSaved: false, visible:false}

    welcomeFeed = () => {
        const {lat, lng} = this.props
        const obj = {
            queryCat: '',
            latlong: `${lat},${lng}`
        }
        this.props.getEventsByLocation(obj)
    }
    
    componentDidMount() {
        this.setState({visible: true})
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Props recieved in Event Feed')
        if (!localStorage.getItem('localEvents')) {
            if (prevProps.coordsPresent && !prevProps.eventsPresent && !prevState.firstLoadComplete) {
                this.welcomeFeed()
                this.setState({firstLoadComplete: true})
            }
            console.log(prevProps.events)
            console.log("localevents not present", prevState.localEventsSaved, prevProps.eventsPresent)
            if (prevProps.eventsPresent && !prevState.localEventsSaved) {
                console.log('EVENTS PRESENT IN PROPS')
                this.setState({localEventsSaved: true})
                localStorage.setItem("localEvents", JSON.stringify(prevProps.events))
                localStorage.setItem("test", "this is a test")
            }
            console.log('done saving local events')
        }
    }
    
    componentWillUnmount() {
        this.setState({firstLoadComplete: false})
    }

    localFeedCards() {
        return JSON.parse(localStorage.getItem("localEvents")).map(event => <EventCard key={event.key} {...event}/>)
    }

    feedContent = () => {
        if (localStorage.getItem("localEvents") && this.state.visible) {
            return this.localFeedCards()
        }
    }
    
    render() {
        return(
            <Transition visible={this.props.feedVisible} animation="fade" >
                <Segment padded style={{maxWidth: "40%", maxHeight:"81.5%", minHeight:"40%", overflow:'auto'}}>
                    <Header as='h2'style={{}}>Happening Near You</Header>
                    <Card.Group>
                        {this.feedContent()}
                    </Card.Group>
                    <Dimmer active={!!!localStorage.getItem("localEvents")}>
                        <Loader indeterminate size='massive'> Searching... </Loader>
                    </Dimmer>
                </Segment>
            </Transition>
        )
    }
}

const mapStateToProps = (state) => ({
    feedVisible: state.navbar.showFeed,
    events: state.events.eventsByLocation,
    eventsPresent: state.events.eventsByLocation.length > 0,
    coordsPresent: !!state.users.lat && !! state.users.lon,
    lat: state.users.lat,
    lng: state.users.lon,
})

const mapDispatchToProps = (dispatch) => ({
    getEventsByLocation: (query) => dispatch(getEventsByLocation(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventFeed)