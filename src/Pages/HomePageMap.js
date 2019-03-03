import React, { PureComponent } from 'react'
import { Segment, Menu, Grid, Sidebar, Input, Icon, Button } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom'

import styles from '../../src/assets/stylesheets/homepage.css'
import MapContainer from '../Components/MapContainer/MapContainer';
import SearchBar from '../Components/SearchBar/SearchBar';


class HomePageMap extends PureComponent {
    state = {activeItem: 'content', sidebar: false, userLocation: 'New York', selected: false}

    handleShow = () => this.setState({sidebar: !this.state.sidebar})
    
    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    handleItemClick = (e, {name}) => {
        const types = ['create', 'search', 'ticket', 'friends', 'chats', 'settings']
        if (types.includes(name)) {
            this.setState({activeItem: name})    
        } else {
            this.setState({activeItem: 'content'})
        }
    }

    render(){
        
        const {activeItem, sidebar} = this.state
        return (
                <div className={styles.Nav} > 
                    <Menu size='huge'>
                        <Menu.Item onClick={this.handleShow}>
                            <Icon name='bars'/>
                            Event App
                        </Menu.Item>
                        <Menu.Menu position = 'right'>
                           
                            <SearchBar />
                         
                            <Menu.Item>
                                <Button circular fluid icon = 'power off' color='red' onClick={this.handleLogout}/>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                <Grid columns={1} inverted>
                        <Grid.Column color='black'>
                            <Sidebar.Pushable as={Segment} inverted color='green'>
                                <Sidebar
                                    as={Menu}
                                    animation='slide out'
                                    icon='labeled'
                                    inverted
                                    vertical
                                    visible={sidebar}
                                    width='thin'
                                    size='massive'
                                > 
                                    < Menu.Item header name='home' active={'home' === activeItem} onClick={this.handleItemClick}>
                                        <Icon name="connectdevelop"/>
                                        Home
                                    </ Menu.Item >
                                    < Menu.Item name='create' active={'create' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='idea' />
                                        create event
                                    </ Menu.Item >
                                    < Menu.Item name='search' active={'search' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='search' />
                                        explore
                                    </ Menu.Item >
                                    < Menu.Item name='ticket' active={'ticket' === activeItem} onClick={this.handleItemClick} > 
                                        <Icon name='ticket' />
                                        tickets
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

                                <Sidebar.Pusher>
                                    <Segment inverted className={styles.mapSegment}>

                                    <MapContainer />

                                    </Segment>
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </Grid.Column>
                </Grid>
            </div>
        )
    }
}


export default withRouter(HomePageMap)