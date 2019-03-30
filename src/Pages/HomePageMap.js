import React, { PureComponent } from 'react'
import { Segment, Menu, Grid, Sidebar, Icon, Button, Header, Item, Container } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import styles from '../../src/assets/stylesheets/homepage.css'
import MapContainer from '../Components/MapContainer/MapContainer';
import SearchBar from '../Components/SearchBar/SearchBar';
import EventDetails from '../Components/EventDetails/EventDetails';
import { loadEventDetails, resetSearch } from '../store/actions/eventActions';
import FriendsBar from '../Components/BottomNavBarComponents/FriendsBar/FriendsBar';
import Chats from '../Components/BottomNavBarComponents/Chats/Chats';
import HangoutFeed from '../Components/HangoutFeed/HangoutFeed';
import CreateHangout from '../Components/CreateHangout/CreateHangout';
import UserEvents from '../Components/UserEvents/UserEvents';
import {loadPositional} from '../store/thunks/users'



class HomePageMap extends PureComponent {
    state = {activeItem: 'home', sidebar: false, userLocation: 'New York', selected: false, infobar: false}

    handleShow = () => this.setState({sidebar: !this.state.sidebar})
    handleInfobar = () => this.setState({infobar: true})
    closeInfoBar = () => this.setState({infobar: false})
    
    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    handleItemClick = (e, {name}) => {
        const types = ['create a hangout', 'search', 'hangout feed', 'following list', 'chats', 'settings', 'events']
        if (types.includes(name)) {
            this.setState({activeItem: name})    
        } else {
            this.setState({activeItem: 'home'})
        }
        this.handleInfobar()
    }

    handleDeselectEvent = () => this.props.loadEventDetails(false)

    infoContent = () => {
        switch (this.state.activeItem) {
            case 'following list':
                return <FriendsBar />
            case 'hangout feed':
                return <HangoutFeed />
            case 'create a hangout':
                return <CreateHangout/>
            case 'chats':
                return <Chats />
            case 'events':
                return <UserEvents />
            case 'home':
                return null
            default:
                return 0
        }
    }

    resetLocation = () => {
        this.props._loadPosition()
        this.props._resetSearch()
    }

    render(){
        const {activeItem, sidebar} = this.state
        // console.log(this.state.sidebar, this.state.infobar)
        return (
            <>
                <Menu className={styles.Nav} size='small'> 
                    <Item onClick={this.handleShow} >
                        <Icon name='bars'/>
                        evio
                    </Item>
                    <SearchBar />
                    <Menu.Menu position='right'>
                        <Item>
                            <Button inverted color='blue' onClick={this.resetLocation}>
                                RESET LOCATION
                            </Button>
                        </Item>
                        <Item>
                            <Button inverted color='red' onClick={this.handleLogout}>
                                <Icon name='power off'/> LOGOUT
                            </Button>
                        </Item>
                    </Menu.Menu>
                </Menu>
                <Grid columns={1} className={styles.pageContent}>
                    <Grid.Column>
                            {/* LEFT SIDEBAR MENU */}
                            <Sidebar.Pushable as={Segment} color='green' style={{height:"100%"}}> 
                                <Sidebar
                                    as={Menu}
                                    animation='overlay'
                                    icon='labeled'
                                    vertical
                                    visible={sidebar}
                                    width='thin'
                                    size='massive'
                                > 
                                    < Menu.Item header name='create a hangout' active={'create a hangout' === activeItem} onClick={this.handleItemClick}>
                                        <Icon name="hand peace"/>
                                        create a hangout
                                    </ Menu.Item >
                            
                                    < Menu.Item name='hangout feed' active={'hangout feed' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='handshake' />
                                        hangout feed
                                    </ Menu.Item >

                                    < Menu.Item name='events' active={'events' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='ticket' />
                                        my events
                                    </ Menu.Item >

                                    < Menu.Item name='following list' active={'following list' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='users'/>
                                        following list
                                    </ Menu.Item>

                                    {/* < Menu.Item name='settings' active={'settings' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='setting' />
                                        settings
                                    </ Menu.Item >                                 */}
                                </Sidebar>

                                {/* EVENT INFORMATION SECTION RIGHT SIDEBAR */}
                                <Sidebar
                                    as={Menu}
                                    inverted
                                    direction='right'
                                    animation='overlay'
                                    vertical
                                    visible={this.props.eventSelected}
                                >
                                    <Button fluid onClick={this.handleDeselectEvent}>
                                        close <Icon name='right arrow'/>
                                    </Button>
                                    {this.props.eventSelected ? <EventDetails /> : null}
                                </Sidebar>

                                {/* MAP CONTENT CONTAINER */}
                                <Sidebar.Pusher>
                                    <div className={styles.mapSegment}>
                                        <MapContainer /> 
                                    </div>
                                    <Sidebar
                                        as={Segment}
                                        direction='top'
                                        animation='overlay'
                                        visible={this.props.eventsPresent}
                                    >
                                        <Grid textAlign="center">
                                            <Grid.Row>
                                                <Header>
                                                    Event List info here
                                                </Header>
                                            </Grid.Row>
                                        </Grid>
                                    </Sidebar>
                                </Sidebar.Pusher>

                                {/* {BOTTOM BAR WITH EVENT RESULTS FROM SEARCH} */}

                                <Sidebar
                                    as={Segment}
                                    direction='left'
                                    animation='overlay'
                                    vertical
                                    visible={this.state.infobar}
                                    size='massive'
                                    style={{backgroundColor:'rgb(27,27,27'}}
                                >
                                    <Grid>
                                        <Grid.Row columns={2}>
                                            <Grid.Column>
                                                <Button circular icon="left arrow" onClick={this.closeInfoBar}/>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Header as='h2' inverted>{this.state.activeItem}</Header>
                                            </Grid.Column>
                                        </Grid.Row>
                                        {this.infoContent()}
                                    </Grid>
                                </Sidebar>
                            </Sidebar.Pushable>
                    </Grid.Column>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = state => ({
    eventSelected: !!state.events.selectedEvent,
    eventsPresent: !!state.events.eventsByLocation._embedded,
})

const mapDispatchToProps = dispatch => ({
    loadEventDetails: () => dispatch(loadEventDetails(false)),
    _resetSearch: () => dispatch(resetSearch()),
    _loadPosition: () => dispatch(loadPositional())
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePageMap))