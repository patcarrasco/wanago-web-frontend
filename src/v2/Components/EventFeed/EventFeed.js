import React, { PureComponent } from 'react'
import { Segment, Header, Dimmer, Loader, Grid, Responsive } from 'semantic-ui-react';

import {connect} from 'react-redux'

import EventCard from '../EventCard/EventCard'

class EventFeed extends PureComponent {
    constructor(props) {
        super(props)
        this.state={localEventsSaved: false}
        this.markers = []
    }

    addMarkerToRecord = (marker) => {
        this.markers.push(marker)
    } 

    removeAllMarkers = (marker) => {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null)
        }
    }

    componentDidMount() {
        if (!!localStorage.getItem("localEvents")) {
            this.setState({localEventsSaved: true})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!!localStorage.getItem('localEvents') && !this.state.localEventsSaved) {
            this.setState({localEventsSaved: true})
        }

        if (!this.props.feedVisible) {
            this.removeAllMarkers()
            this.markers = []
        }
    }

    localFeedCards() {
        return JSON.parse(localStorage.getItem("localEvents")).map(event => <EventCard key={event.key} {...event} addMarkerToRecord={this.addMarkerToRecord} />)
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
                minHeight: '30vh',
                maxHeight: '30vh',
                minWidth: '-webkit-fill-available',
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

    midView = () => (
        < Segment style = {
            {
                minHeight: '15vh',
                minWidth: '402px',
                maxHeight: '30vh',
                maxWidth: '402px',
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
        <Segment style={{minWidth: "41%", maxWidth: "41%", maxHeight:"81.5%", minHeight:"15%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px'}}>
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
            <Responsive style={{position:'fixed'}} minWidth={1000}>
                {this.desktopView()}
            </Responsive>
            <Responsive style={{position:'fixed'}} maxWidth={999} minWidth={480}>
                {this.midView()}
            </Responsive>
            <Responsive style={{position:'fixed'}} maxWidth={479}>
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