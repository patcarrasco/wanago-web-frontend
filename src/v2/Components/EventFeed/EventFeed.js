import React, { PureComponent } from 'react'
import { Segment, Header, Dimmer, Loader, Grid } from 'semantic-ui-react';

import {connect} from 'react-redux'
import {getEventsByLocation} from '../../../store/thunks/event'

import {EventCard} from '../EventCard/EventCard'

class EventFeed extends PureComponent {
    state={localEventsSaved: false}

    welcomeFeed = () => {
        const {lat, lng} = this.props
        const obj = {
            queryCat: '',
            latlong: `${lat},${lng}`
        }
        this.props.getEventsByLocation(obj)
    }

    componentDidMount() {
        if (!!localStorage.getItem("localEvents")) {
            this.setState({localEventsSaved: true})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!localStorage.getItem('localEvents')) {
            if (!this.props.eventsPresent) {
                console.log('calling welcome feed')
                this.welcomeFeed()
            } else if (this.props.eventsPresent && !prevState.localEventsSaved) {
                console.log('saving to local storage')
                this.setState({localEventsSaved: true})
                localStorage.setItem("localEvents", JSON.stringify(this.props.events))
            } 
        }
    }
    
    componentWillUnmount() {
        this.setState({firstLoadComplete: false})
    }

    localFeedCards() {
        return JSON.parse(localStorage.getItem("localEvents")).map(event => <EventCard key={event.key} {...event}/>)
    }

    feedContent = () => {
        if (this.state.localEventsSaved && this.props.feedVisible) {
            return this.localFeedCards()
        }
    }

    feed = () => (
        <Segment padded style={{maxWidth: "50%", maxHeight:"81.5%", minHeight:"81.5%", overflow:'auto'}}>
            <Header as='h2'style={{color:"#3c3744"}}>Happening Near You</Header>
            <Grid columns={3}>
                {this.feedContent()}
            </Grid>
            <Dimmer active={!!!localStorage.getItem("localEvents")}>
                <Loader indeterminate size='massive'></Loader>
            </Dimmer>
        </Segment>
    )
    
    render() {
        console.log('render feed')
        return this.props.feedVisible ? this.feed() : null
            // <Transition visible={this.props.feedVisible} animation="fade" >
            // </Transition>  
    }
}

const mapStateToProps = (state) => ({
    feedVisible: state.navbar.showFeed,
    events: state.events.eventsByLocation,
    eventsPresent: state.events.eventsByLocation.length > 0,
    lat: state.users.lat,
    lng: state.users.lon,
})

const mapDispatchToProps = (dispatch) => ({
    getEventsByLocation: (query) => dispatch(getEventsByLocation(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventFeed)