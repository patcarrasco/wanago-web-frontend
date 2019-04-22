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
            if (this.localFeedCards().length < 1) {
                return <div style={
                    {
                        fontSize: '22px'
                    }
                }>    
                    <br/>               
                    < p > We couldn't find any nearby events :( <br/> <span style={{fontSize:'14px'}}>Search for events in a nearby city!</span></p>
                    <br/>
                </div>
            }

            return this.localFeedCards()
        }
    }

    mobileView = () => (
        < Segment style = {
            {
                minHeight: '25%',
                minWidth: '-webkit-fill-available',
                maxHeight: '-webkit-fill-available',
                maxWidth: '-webkit-fill-available',
                overflow: 'auto',
                borderRadius: 'unset',
                marginLeft: '14px',
                marginRight: '14px'
            }
        } >
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
        <Segment style={{minWidth: "40%", maxWidth: "40%", maxHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px'}}>
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
            <Responsive minWidth={879}>
                {this.desktopView()}
            </Responsive>
            <Responsive maxWidth={878}>
                {this.mobileView()}
            </Responsive>
        </>
    )
    
    render() {
        console.log('render event feed....')
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