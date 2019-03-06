import React, { PureComponent } from 'react'
import { Segment, Menu, Grid, Sidebar, Input, Icon, Button, Label, Header, Container } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import styles from '../../src/assets/stylesheets/homepage.css'
import MapContainer from '../Components/MapContainer/MapContainer';
import SearchBar from '../Components/SearchBar/SearchBar';
import EventDetails from '../Components/EventDetails/EventDetails';
import { loadEventDetails } from '../store/actions/eventActions';
import FriendsBar from '../Components/BottomNavBarComponents/FriendsBar/FriendsBar';
import Chats from '../Components/BottomNavBarComponents/Chats/Chats';
import HangoutFeed from '../Components/HangoutFeed/HangoutFeed';
import CreateHangout from '../Components/CreateHangout/CreateHangout';
import UserEvents from '../Components/UserEvents/UserEvents';


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
        const types = ['create', 'search', 'friend feed', 'friends', 'chats', 'settings', 'events']
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
            case 'friends':
                return <FriendsBar />
            case 'friend feed':
                return <HangoutFeed />
            case 'create':
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

    render(){
        const {activeItem, sidebar, infobar} = this.state
        // console.log(this.state.sidebar, this.state.infobar)
        return (
                <div className={styles.Nav} > 
                    <Menu size='huge'>
                        <Menu.Item onClick={this.handleShow}>
                            <Icon name='bars'/>
                            Event App
                        </Menu.Item>
                        <Menu.Menu>
                            <SearchBar />
                        </Menu.Menu>

                        <Menu.Menu position = 'right'>
                        
                            <Menu.Item>
                                <Button icon = 'power off' color='red' onClick={this.handleLogout}/>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                <Grid columns={1} >
                        <Grid.Column color='black'>
                            {/* LEFT SIDEBAR MENU */}
                            <Sidebar.Pushable as={Segment} inverted color='green'>
                                <Sidebar
                                    as={Menu}
                                    animation='overlay'
                                    icon='labeled'
                                    inverted
                                    vertical
                                    visible={sidebar}
                                    width='thin'
                                    size='massive'
                                > 
                                    < Menu.Item header name='home' active={'home' === activeItem} onClick={this.handleItemClick}>
                                        <Icon name="connectdevelop"/>
                                        minimize menus
                                    </ Menu.Item >

                                    < Menu.Item header name='create' active={'create' === activeItem} onClick={this.handleItemClick}>
                                        <Icon name="hand peace"/>
                                        create hangout
                                    </ Menu.Item >
                            
                                    < Menu.Item name='friend feed' active={'friend feed' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='ticket' />
                                        my friend feed
                                    </ Menu.Item >

                                    < Menu.Item name='events' active={'events' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='ticket' />
                                        my events
                                    </ Menu.Item >

                                    < Menu.Item name='friends' active={'friends' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='users'/>
                                        friends
                                    </ Menu.Item>
                                    < Menu.Item name='chats' active={'chats' === activeItem} onClick={this.handleItemClick} >
                                        <Icon name='chat' />
                                        chats
                                    </ Menu.Item>
                                        < Menu.Item name='settings' active={'settings' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='setting' />
                                        settings
                                    </ Menu.Item >                                
                                </Sidebar>

                                {/* EVENT INFORMATION SECTION */}
                                <Sidebar
                                    as={Menu}
                                    direction='right'
                                    animation='overlay'
                                    inverted
                                    vertical
                                    visible={this.props.eventSelected}
                                >
                                    <Menu.Item header>
                                        <Button fluid onClick={this.handleDeselectEvent}>close</Button>
                                        {this.props.eventSelected ? <EventDetails /> : null}
                                    </Menu.Item>
                                </Sidebar>

                                {/* MAP CONTENT */}
                                <Sidebar.Pusher>
                                    <Segment inverted className={styles.mapSegment}>
                                        {/* {this.props.eventSelected ? <EventDetails /> : null} */}
                                        <MapContainer />
                                    </Segment>
                                </Sidebar.Pusher>

                                <Sidebar
                                    as={Segment}
                                    direction='left'
                                    animation='overlay'
                                    inverted
                                    vertical
                                    visible={this.state.infobar}
                                >

                                    <Segment size='massive'>
                                        <Grid>
                                            <Grid.Row columns={2}>
                                                <Grid.Column>
                                                    <Button circular icon="left arrow" onClick={this.closeInfoBar}/>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Header>{this.state.activeItem}</Header>
                                                </Grid.Column>
                                            </Grid.Row>
                                            {this.infoContent()}
                                        </Grid>
                                    </Segment>
                                </Sidebar>



                            </Sidebar.Pushable>
                        </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    eventSelected: !!state.events.selectedEvent
})

const mapDispatchToProps = dispatch => ({
    loadEventDetails: () => dispatch(loadEventDetails(false))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePageMap))