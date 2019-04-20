import React, {useState} from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import { setLoadStatus, resetSearch, showSearchResults} from '../../../store/actions/eventActions';
import {toggleFeed, toggleVenue, toggleSaved} from '../../../store/actions/navbarActions'
import {selectVenue} from '../../../store/actions/venueActions'

import { Header, Menu, Button, Responsive, Segment, Dropdown, Container } from 'semantic-ui-react';

import EventSearch from '../EventSearch/EventSearch';

function NavBar(props) {
    const [showSearch, setShowSearch] = useState(false)

    // let showFeed = props.showFeed
    // let showVenue = props.showVenue
    let {showFeed, showVenue, showSaved} = props

    const handleShowSearch = () => {
        setShowSearch(!showSearch)
        props._toggleVenue(false)
        props._clearVenue()
        if (props.showSearchResults) {
            props._closeSearchResults()
        }
    }

    const handleLogout = () => {
        props._clearVenue()
        props._toggleVenue(false)
        props._closeSearchResults()
        showSearch && setShowSearch(false)
        localStorage.clear()
        props.history.push('/')
    }
    const handleVenueClick = () => {
        props._toggleVenue(!showVenue)
        props._clearVenue()
        props._closeSearchResults()
        showSearch && setShowSearch(false)
        // props._closeSearchEvents()
    }

    const handleFeedClick = () => {
        props._clearVenue()
        props._toggleFeed()
        props._closeSearchResults()
        showSearch && setShowSearch(false)
        // props._closeSearchEvents()
    }

    const handleSavedEventsClick = () => {
        props._toggleSaved(!props.showSaved)
        props._clearVenue()
        props._closeSearchResults()
        showSearch && setShowSearch(false)
    }

    return (
            <>
                <Responsive minWidth={1000}>
                    <Segment style={{backgroundColor:'transparent', boxShadow:'none', borderStyle:'none'}}>
                        < Menu fluid style = {{backgroundColor: '#feffff', borderRadius:'unset'}} >
                            <Menu.Item style={{justifyContent:'flex-start'}}>
                                < Header as='h1'style = {{fontFamily: "Roboto, sans-serif",fontWeight: "300",color: "#3c3744",}} > 
                                    wanago 
                                </Header>
                            </Menu.Item>
                            <Menu.Item> 
                                <div style={{display:'flex', alignItems:'center', justifyContent:"center", marginLeft:'1em'}}>
                                    <Button disabled={!props.mapReady} circular icon = "heart outline" style={{color: showSaved ? '#feffff' : `#3c3744`, backgroundColor: showSaved ? '#3d52d5':'#B4C5E4'}} onClick={handleSavedEventsClick} />
                                    <Button disabled={!props.mapReady} circular icon = "map pin" style={{color: showVenue ? '#feffff' : `#3c3744`, backgroundColor: showVenue ? '#3d52d5':'#B4C5E4'}} onClick={handleVenueClick} />
                                    <Button disabled={!props.mapReady} circular icon = "feed" style={{color: showFeed ? '#feffff' : `#3c3744`, backgroundColor: showFeed ? '#3d52d5':'#B4C5E4'}} onClick={handleFeedClick}/>
                                </div>
                            </Menu.Item>
                            <Menu.Menu >
                                {/* POSSIBLE ADDITIONAL SEARCH TERM, MAYBE BY EVENT TYPE??? */}
                                <EventSearch mapReady={props.mapReady} />
                            </Menu.Menu>
                            <Menu.Menu position="right">
                                <Menu.Item>
                                    <Button disabled={!props.mapReady} onClick={handleLogout} style={{backgroundColor:"#B4C5E4", color:"3D52D5", borderRadius: 'unset'}}>LOGOUT</Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Segment>
                </Responsive>
                <Responsive maxWidth={999}>
                    <Segment style={{backgroundColor:'transparent', boxShadow:'none', borderStyle:'none'}}>
                        < Menu fluid style = {{backgroundColor: '#feffff', borderRadius:'unset', display: 'flex', flexDirection:'row'}} >
                            <Menu.Item style={{justifyContent:'flex-start'}}>
                                < Header as='h1'style = {{fontFamily: "Roboto, sans-serif",fontWeight: "300",color: "#3c3744",}} > 
                                    wanago 
                                </Header>
                            </Menu.Item>

                            <Menu.Menu position='right'>
                                     <div style={{display:'flex', alignItems:'center', justifyContent:"center", marginRight:'14px'}}>
                                        <Button disabled={!props.mapReady} circular icon = 'search' style={{color: showSearch ? '#feffff' : `#3c3744`, backgroundColor: showSearch ? '#3d52d5':'#B4C5E4'}} onClick={handleShowSearch}></Button>
                                        <Button disabled={!props.mapReady} circular icon = "heart outline" style={{color: showSaved ? '#feffff' : `#3c3744`, backgroundColor: showSaved ? '#3d52d5':'#B4C5E4'}} onClick={handleSavedEventsClick} />
                                        <Button disabled={!props.mapReady} circular icon = "map pin" style={{color: showVenue ? '#feffff' : `#3c3744`, backgroundColor: showVenue ? '#3d52d5':'#B4C5E4'}} onClick={handleVenueClick} />
                                        <Button disabled={!props.mapReady} circular icon = "feed" style={{color: showFeed ? '#feffff' : `#3c3744`, backgroundColor: showFeed ? '#3d52d5':'#B4C5E4'}} onClick={handleFeedClick}/>
                                        <Button disabled={!props.mapReady} circular icon = 'power off' onClick={handleLogout} style={{backgroundColor:"#B4C5E4", color:"3D52D5"}}></Button>
                                    </div>
                            </Menu.Menu>
                        </Menu>
                    </Segment>
                    {showSearch 
                        ? 
                        <Segment style={{backgroundColor:'transparent', boxShadow:'none', borderStyle:'none', padding: '0px 0px 0px 0px'}} >
                            <div style={{backgroundColor: 'white', marginLeft: '14px', marginRight: '14px'}}>
                                <EventSearch mapReady={props.mapReady} />
                            </div>
                        </Segment>
                        :
                        null
                    }
                </Responsive>
            </>
    )
}

const mapStateToProps = state => ({
    showFeed: state.navbar.showFeed,
    showVenue: state.navbar.showVenue,
    showSaved: state.navbar.showSaved,
    eventSelected: !!state.events.selectedEvent,
    eventsPresent: !!state.events.eventsByLocation._embedded,
    showSearchResults: state.events.showSearchResults,
})

const mapDispatchToProps = (dispatch) => ({
    _setLoadStatus: (bool) => dispatch(setLoadStatus(bool)), 
    _resetSearch: () => dispatch(resetSearch()),
    _toggleFeed: () => dispatch(toggleFeed()),
    _toggleVenue: (bool) => dispatch(toggleVenue(bool)),
    _toggleSaved: (bool) => dispatch(toggleSaved(bool)),
    _clearVenue: () => dispatch(selectVenue(false)),
    _closeSearchEvents: () => dispatch(showSearchResults(false)),
    _closeSearchResults: () => dispatch(showSearchResults(false))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))