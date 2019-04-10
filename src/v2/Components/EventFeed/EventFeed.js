import React, { PureComponent } from 'react'
import { Segment, Header, Dimmer, Loader, Grid, Responsive } from 'semantic-ui-react';

import {connect} from 'react-redux'

import EventCard from '../EventCard/EventCard'

class EventFeed extends PureComponent {
    state={localEventsSaved: false}

    componentDidMount() {
        if (!!localStorage.getItem("localEvents")) {
            this.setState({localEventsSaved: true})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!!localStorage.getItem('localEvents') && !this.state.localEventsSaved) {
            this.setState({localEventsSaved: true})
        }
    }

    localFeedCards() {
        return JSON.parse(localStorage.getItem("localEvents")).map(event => <EventCard key={event.key} {...event}/>)
    }

    feedContent = () => {
        if (this.state.localEventsSaved && this.props.feedVisible) {
            return this.localFeedCards()
        }
    }

    mobileView = () => (
        <Segment style={{maxWidth: "100%", maxHeight:'30.5%', minHeight:"25%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px', marginRight:'16px'}}>
            <Header as='h2'style={{color:"#3c3744"}}>Happening Near You</Header>
            <Grid columns={3}>
                {this.feedContent()}
            </Grid>
            <Dimmer active={!!!localStorage.getItem("localEvents")}>
                <Loader indeterminate size='massive'></Loader>
            </Dimmer>
        </Segment>
    )

    desktopView = () => (
        <Segment style={{maxWidth: "50%", maxHeight:"81.5%", minHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px'}}>
            <Header as='h2'style={{color:"#3c3744"}}>Happening Near You</Header>
            <Grid columns={3}>
                {this.feedContent()}
            </Grid>
            <Dimmer active={!!!localStorage.getItem("localEvents")}>
                <Loader indeterminate size='massive'></Loader>
            </Dimmer>
        </Segment>
    )

    feed = () => (
        <>
            <Responsive minWidth={1000}>
                {this.desktopView()}
            </Responsive>
            <Responsive maxWidth={999}>
                {this.mobileView()}
            </Responsive>
        </>
    )
    
    render() {
        return this.props.feedVisible ? this.feed() : null
    }
}

const mapStateToProps = (state) => ({
    feedVisible: state.navbar.showFeed,
    events: state.events.eventsByLocation,
    eventsPresent: state.events.eventsByLocation.length > 0,
    lat: state.users.lat,
    lng: state.users.lon,
})

export default connect(mapStateToProps)(EventFeed)