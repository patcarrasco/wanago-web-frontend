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
        if (this.props.loading) {
            return (
                <Segment style={{minWidth: '41%', maxWidth: "41%", maxHeight:"81.5%", minHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px'}}>
                    <Dimmer active>
                        <Loader>Searching for Events...</Loader> 
                    </Dimmer>
                </Segment>
            )
        } else {
            return (
                <Segment style={{minWidth: "41%", maxWidth: "41%", maxHeight:"81.5%", minHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px'}}>
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
    }

    midView = () => {
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
                <div style={
                    {
                        backgroundColor: 'white', 
                        borderRadius: 'unset', 
                        maxHeight: '26vh', 
                        overflow:'auto', 
                        position:'fixed', 
                        padding: '14px', 
                        marginRight:'14px',
                        marginLeft: '14px'

                        }
                    }
                >
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
    }


    content = () => (
        <>
             <Responsive minWidth={1000}>
                {this.desktopView()}
            </Responsive>
            <Responsive maxWidth={999} minWidth={480}>
                {this.midView()}
            </Responsive>
            <Responsive maxWidth={479}>
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