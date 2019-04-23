import React, { PureComponent } from 'react'
import {connect} from 'react-redux'

import {showSearchResults} from '../../../store/actions/eventActions'

import { Segment, Button, Loader, Grid, Responsive, Dimmer, Header } from 'semantic-ui-react';
import EventCard from '../EventCard/EventCard';

class SearchResultBox extends PureComponent {
    constructor(props) {
        super(props)
        this.markers = []
    }

    componentDidUpdate() {
        if (!this.props.showSearchResults) {
            this.removeAllMarkers()
            this.markers = []
        }
    }

    addMarkerToRecord = (marker) => {
        this.markers.push(marker)
    }

    removeAllMarkers = (marker) => {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null)
        }
    }

    searchResultCards() {
        return this.props.searchedEvents.map(event => {
            const saved = this.props.savedEventIds.includes(event.id)
            return <EventCard key={event.key} {...event} addMarkerToRecord={this.addMarkerToRecord} saved={saved} />
        })  
    }

    createFeed = () => {
        if (this.props.searchedEvents.length > 0) {
            return this.searchResultCards()
        }
    }

    desktopView = () => {
        return (
            <Segment style={{minWidth: "41%", maxWidth: "41%", maxHeight:"81.5%", minHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px'}}>
                <Dimmer active={this.props.loading}>
                    <Loader>Searching for Events...</Loader> 
                </Dimmer>
                <div style={{display:'flex', flexDirection:'row', marginBottom: '14px'}}>
                    <div>
                        <Button circular icon='close' onClick={()=>this.props.close()}/>
                    </div>
                    <div style={{flex: 'auto', textAlign: 'center'}}>
                        < Header as = "h3" > Results </Header>
                    </div>
                </div>
                <Grid>
                    {this.createFeed()}
                </Grid>
            </Segment>
        ) 
        
    }

    midView = () => {
        return (
                < div style = {
                    {
                        minHeight: '15vh',
                        maxHeight: '30vh',
                        maxWidth: '402px',
                        minWidth: '402px',
                        padding: '14px',
                        overflow: 'auto',
                        borderRadius: 'unset',
                        marginLeft: '14px',
                        marginRight: '14px',
                        backgroundColor:'white'
                    }
                } >
                <Dimmer active={this.props.loading}>
                    <Loader>Searching for Events...</Loader> 
                </Dimmer> 
                <div style={{display:'flex', flexDirection:'row', marginBottom: '14px'}}>
                    <div>
                        <Button circular icon='close' onClick={()=>this.props.close()}/>
                    </div>
                    <div style={{flex: 'auto', textAlign: 'center'}}>
                        < Header as = "h3" > Results </Header>
                    </div>
                </div>
                    <Grid>
                        {this.createFeed()}
                    </Grid>
                </div>
        )
    }

    mobileView = () => {
        return (
            <div style={
                {
                    backgroundColor: 'white', 
                    borderRadius: 'unset', 
                    minHeight: '30vh',
                    maxHeight: '30vh',
                    minWidth: '-webkit-fill-available',
                    maxWidth: '-webkit-fill-available',
                    overflow:'auto', 
                    marginRight:'14px',
                    marginLeft: '14px'

                    }
                }
            >
                <Dimmer active={this.props.loading}>
                    <Loader>Searching for Events...</Loader> 
                </Dimmer> 
                <div style={{display:'flex', flexDirection:'row', marginBottom: '14px'}}>
                    <div>
                        <Button circular icon='close' onClick={()=>this.props.close()}/>
                    </div>
                    <div style={{flex: 'auto', textAlign: 'center'}}>
                        < Header as = "h3" > Results </Header>
                    </div>
                </div>

                <Grid>
                    {this.createFeed()}
                </Grid>
            </div>
        )
    }


    content = () => (
        <>
             <Responsive style={{position:"fixed"}} minWidth={1000}>
                {this.desktopView()}
            </Responsive>
            <Responsive style={{position:"fixed"}} maxWidth={999} minWidth={480}>
                {this.midView()}
            </Responsive>
            <Responsive style={{position:"fixed"}} maxWidth={479}>
                {this.mobileView()}
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
    savedEventIds: state.events.savedEventIds,
    searchedEvents: state.events.searchedEvents,
    loading: state.events.loading,
    showSearchResults: state.events.showSearchResults
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultBox)