import React from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import { setLoadStatus, resetSearch, showSearchResults} from '../../../store/actions/eventActions';
import {toggleFeed, toggleVenue, toggleSaved} from '../../../store/actions/navbarActions'
import {selectVenue} from '../../../store/actions/venueActions'

import { Header, Menu, Button, Responsive, Segment, Modal} from 'semantic-ui-react';

import EventSearch from '../EventSearch/EventSearch';

class NavBar extends React.PureComponent{
    state= {showSearch: false, showLogout: false, showSearchModal: false}

    handleShowSearch = () => {
        if (this.showSearch) {
            this.props._closeSearchResults()
            return 
        }

        if (!this.showSearchModal) {
            this.setState({showSearchModal: true})
        }
        
        this.props._toggleVenue(false)
        this.props._clearVenue()
        this.setState({showSearch: !this.state.showSearch})
    }

    handleLogout = () => {
        this.props._clearVenue()
        this.props._toggleVenue(false)
        this.props._closeSearchResults()
        this.state.showSearch && this.setState({showSearch: false})
        localStorage.clear()
        this.props.history.push('/')
    }
    handleVenueClick = () => {
        
        this.props._toggleVenue(!this.props.showVenue)
        this.props._clearVenue()
        this.props._closeSearchResults()
        this.state.showSearch && this.setState({showSearch: false})
    }

    handleFeedClick = () => {
        this.props._clearVenue()
        this.props._toggleFeed()
        this.props._closeSearchResults()
        this.state.showSearch && this.setState({showSearch: false})
    }

    handleSavedEventsClick = () => {
        this.props._toggleSaved(!this.props.showSaved)
        this.props._clearVenue()
        this.props._closeSearchResults()
        this.state.showSearch && this.setState({showSearch: false})
    }

    handleSearchModalClose = () => {
        this.setState({
            showSearchModal: false,
            showSearch:false
        })

    }

    componentDidUpdate(prevProps) {
        if (prevProps.showSearchResults !== this.props.showSearchResults) {
            if (this.state.showSearch && !this.state.showSearchModal) {
                this.setState({showSearch: false})
            }
        }
    }

    render() {
        const {state, props} = this
        const {showSaved, showVenue, showFeed} = props
            return (
                <>
                    <Responsive minWidth={879}>
                        <Segment style={{backgroundColor:'transparent', boxShadow:'none', borderStyle:'none', marginBottom:'0px', paddingBottom:'0'}}>
                            < Menu fluid style = {{backgroundColor: '#3c3744', borderRadius:'unset'}} >
                                <Menu.Item style={{justifyContent:'flex-start'}}>
                                    < Header as = 'h1'
                                    style = {
                                        {
                                            fontFamily: "Roboto, sans-serif",
                                            fontWeight: "300",
                                            color: "#b4c5e4",
                                        }
                                    } >
                                        wanago 
                                    </Header>
                                </Menu.Item>
                                <Menu.Item> 
                                    <div style={{display:'flex', alignItems:'center', justifyContent:"center", marginLeft:'1em'}}>
                                        <Button disabled={!props.mapReady} circular icon = "heart outline" style={{color: showSaved ? '#feffff' : `#3c3744`, backgroundColor: showSaved ? '#3d52d5':'#B4C5E4'}} onClick={this.handleSavedEventsClick} />
                                        <Button disabled={!props.mapReady} circular icon = "map marker" style={{color: showVenue ? '#feffff' : `#3c3744`, backgroundColor: showVenue ? '#3d52d5':'#B4C5E4'}} onClick={this.handleVenueClick} />
                                        <Button disabled={!props.mapReady} circular icon = "feed" style={{color: showFeed ? '#feffff' : `#3c3744`, backgroundColor: showFeed ? '#3d52d5':'#B4C5E4'}} onClick={this.handleFeedClick}/>
                                    </div>
                                </Menu.Item>
                                <Menu.Menu >
                                    {/* POSSIBLE ADDITIONAL SEARCH TERM, MAYBE BY EVENT TYPE??? */}
                                    <EventSearch mapReady={props.mapReady} />
                                </Menu.Menu>
                                <Menu.Menu position="right">
                                    <Menu.Item>
                                        <Button disabled={!props.mapReady} onClick={this.handleLogout} icon="power off" circular style={{backgroundColor:"#B4C5E4", color:"3D52D5"}}></Button>
                                    </Menu.Item>
                                </Menu.Menu>
                            </Menu>
                        </Segment>
                    </Responsive>
                    <Responsive maxWidth={878}>
                        <Segment style={{backgroundColor:'transparent', boxShadow:'none', borderStyle:'none', marginBottom:'0px', paddingBottom:'0'}}>
                            < Menu fluid style = {{backgroundColor: '#3c3744', borderRadius:'unset', display: 'flex', flexDirection:'row'}} >
                                <Menu.Item style={{justifyContent:'flex-start'}}>
                                    < Header as='h1'style = {{fontFamily: "Roboto, sans-serif",fontWeight: "300",color: "#b4c5e4",}} > 
                                        wanago 
                                    </Header>
                                </Menu.Item>

                                <Menu.Menu position='right'>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:"center", marginRight:'14px'}}>
                                            <Button disabled={!props.mapReady} circular icon = 'search' style={{color: state.showSearch ? '#feffff' : `#3c3744`, backgroundColor: state.showSearch ? '#3d52d5':'#B4C5E4'}} onClick={this.handleShowSearch}></Button>
                                            <Button disabled={!props.mapReady} circular icon = "heart outline" style={{color: showSaved ? '#feffff' : `#3c3744`, backgroundColor: showSaved ? '#3d52d5':'#B4C5E4'}} onClick={this.handleSavedEventsClick} />
                                            <Button disabled={!props.mapReady} circular icon = "map marker" style={{color: showVenue ? '#feffff' : `#3c3744`, backgroundColor: showVenue ? '#3d52d5':'#B4C5E4'}} onClick={this.handleVenueClick} />
                                            <Button disabled={!props.mapReady} circular icon = "feed" style={{color: showFeed ? '#feffff' : `#3c3744`, backgroundColor: showFeed ? '#3d52d5':'#B4C5E4'}} onClick={this.handleFeedClick}/>
                                            <Button disabled={!props.mapReady} circular icon = 'power off' onClick={()=>this.setState({showLogout:true})} style={{backgroundColor:"#B4C5E4", color:"3D52D5"}}></Button>
                                        </div>
                                </Menu.Menu>
                            </Menu>
                        </Segment>
                        
                        <Modal basic open={state.showSearchModal} onClose={this.handleSearchModalClose} size="small">
                            <Modal.Content>
                                <Segment style={{backgroundColor:'white', boxShadow:'none', borderStyle:'none', borderRadius:'unset'}} >
                                        <Button circular icon="close" onClick={this.handleSearchModalClose} style={{marginBottom:'14px'}}></Button>
                                    <EventSearch mapReady={props.mapReady} closeModal={()=>this.setState({showSearchModal:false})} />
                                </Segment>
                            </Modal.Content>
                        </Modal>

                        <Modal basic open={state.showLogout} onClose={()=> this.setState({showLogout: false})} size="mini">
                            <Modal.Content>
                                <Segment style={{borderRadius:'unset'}}>
                                    <div style={{marginBottom:'14px'}}>
                                        <Button circular icon="close" onClick={()=>this.setState({showLogout:false})} />
                                    </div>
                                    <p style={{color:"#3c3744", textAlign:'center'}}>
                                        You 're about to <span style={{color:'red'}}>Sign out</span>. Are you sure?
                                    </p>
                                    < Button fluid 
                                        onClick = {
                                                this.handleLogout
                                            }
                                        style = {
                                            {
                                                backgroundColor: "#3d52d5",
                                                color: "#fbfff1",
                                                borderRadius: 'unset',
                                                fontSize: '16px',
                                                fontWeight: '400'
                                            }
                                        } > Sign out 
                                    </Button>
                                </Segment>
                            </Modal.Content>
                        </Modal>
                    </Responsive>
                </>
        )
    }
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
    _closeSearchResults: () => dispatch(showSearchResults(false))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))