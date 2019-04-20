import React, { PureComponent } from 'react'
import {connect} from 'react-redux'

import {showSearchResults} from '../../../store/actions/eventActions'

import { Segment, Header, Button, Loader, Grid, Responsive, Dimmer } from 'semantic-ui-react';
import EventCard from '../EventCard/EventCard';

class SearchResultBox extends PureComponent {
    


    searchResultCards() {
        return this.props.searchedEvents.map(event => <EventCard key={event.key} {...event} />)
    }

    createFeed = () => {
        if (this.props.searchedEvents.length > 0) {
            return this.searchResultCards()
        }
    }

    desktopView = () => {
        if (this.props.loading) {
            return (
                <Segment style={{minWidth: '50%', maxWidth: "50%", maxHeight:"81.5%", minHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px'}}>
                    <Dimmer active>
                        <Loader /> 
                    </Dimmer>
                </Segment>
            )
        } else {
            return (
                <Segment style={{maxWidth: "50%", maxHeight:"81.5%", minHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px'}}>
                    <Button circular icon='angle left' onClick={()=>this.props.close()}></Button>
                    <Grid>
                        {this.createFeed()}
                    </Grid>
                </Segment>
            ) 
        }
    }

    mobileView = () => {
        if (this.props.loading) {
            return (
                <div style={{width:'100vw', minHeight:'100vh'}}>
                    <Dimmer active>
                        <Loader>Searching for Events...</Loader> 
                    </Dimmer> 
                </div>
            )
        } else {
            return (
                <div style={{backgroundColor: 'white', borderRadius: 'unset', maxHeight: '60%', overflow:'auto', position:'fixed', padding: '14px', marginRight:'14px'}}>
                    <Grid>
                        {this.createFeed()}
                    </Grid>
                </div>
            )
        }
    }


    content = () => (
        <>
            <Responsive minWidth={1000}>
                {this.desktopView()}
            </Responsive>
            <Responsive maxWidth={999} style={{backgroundColor:'transparent', padding: '0px 0px 0px 0px'}}>
                <div style={{backgroundColor: 'white', marginLeft: '14px', marginRight: '14px'}}>
                    {this.mobileView()}
                </div>
            </Responsive>
        </>
    )

    render() {
        return this.props.showSearchResults ? this.content() : null
    }
}

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(showSearchResults(false))
})

const mapStateToProps = state => ({
    searchedEvents: state.events.searchedEvents,
    loading: state.events.loading,
    showSearchResults: state.events.showSearchResults
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultBox)