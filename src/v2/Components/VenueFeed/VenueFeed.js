import React, { PureComponent } from 'react'
import {connect} from 'react-redux'

import { Segment, Header, Grid, Dimmer, Loader, Responsive} from 'semantic-ui-react';
import VenueCard from '../VenueCard/VenueCard';



class VenueFeed extends PureComponent {
    state={localVenuesSaved: false}

    componentDidMount(){
        console.log('venue list mounting')
        if (!!localStorage.getItem('localVenues')) {
            this.setState({localVenuesSaved: true})
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.showVenue !== this.props.showVenue) {
            this.setState({localVenuesSaved: true})
        }
    }

    localVenueCards() {
        return JSON.parse(localStorage.getItem("localVenues")).map(ven => <VenueCard key={ven.key} {...ven} />)
    }

    venues = () => {
        if (this.state.localVenuesSaved && this.props.showVenue) {
            return this.localVenueCards()
        }
    }

    mobileView = () => (
        <Segment style={{maxWidth: "100%", maxHeight:'30.5%', minHeight:"25%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px', marginRight:'16px'}}>
            <Header as='h2'style={{color:"#3c3744"}}>Venues near you</Header>
            <Grid columns={3}>
               {this.venues()}
            </Grid>
            <Dimmer active={!!!localStorage.getItem("localVenues")}>
                <Loader indeterminate size='massive'></Loader>
            </Dimmer>
        </Segment>
    )

    desktopView = () => (
        <Segment style={{maxWidth: "50%", maxHeight:"81.5%", minHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px'}}>
            <Header as='h2'style={{color:"#3c3744"}}>Venues near you</Header>
            <Grid columns={3}>
               {this.venues()}
            </Grid>
            <Dimmer active={!!!localStorage.getItem("localVenues")}>
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
        return this.props.showVenue ? this.feed() : null
    }
}

const mapStateToProps = (state) => ({
    showVenue: state.navbar.showVenue
})

export default connect(mapStateToProps)(VenueFeed)