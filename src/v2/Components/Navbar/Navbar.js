import React from 'react'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import { setLoadStatus, resetSearch} from '../../../store/actions/eventActions';
import {toggleFeed} from '../../../store/actions/navbarActions'
import {loadPositional} from '../../../store/thunks/users'

import { Header, Segment, Menu, Button } from 'semantic-ui-react';

import EventSearch from '../EventSearch/EventSearch';

class NavBar extends React.PureComponent {
    state = {mounted: false, activeItem: ""}

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    componentDidMount(){
        // console.log('Navbar mounted')
        this.props._loadPosition()
        this.setState({mounted: true})
    }



    render() {
        return (
            <>  
                <Segment basic vertical>
                    < Menu fluid size = 'tiny'
                    style = {
                        {
                            backgroundColor: '#feffff',
                        }
                    } >
                        <Menu.Item style={{justifyContent:'flex-start'}}>
                            < Header 
                                as='h1'
                                style = {
                                {
                                    fontFamily: "Roboto, sans-serif",
                                    fontWeight: "300",
                                    color: "#3c3744",
                                    }
                                } 
                            > 
                                wanago 
                            </Header>
                        </Menu.Item>
                        <Menu.Item> 
                            <div style={{display:'flex', alignItems:'center', justifyContent:"center", marginLeft:'1em'}}>
                                <Button circular icon = "user" style={{color: false ? '#feffff' : `#3c3744`, backgroundColor: false ? '#3d52d5':'#B4C5E4'}} />
                                <Button circular icon = "comment alternate" style={{color: false ? '#feffff' : `#3c3744`, backgroundColor: false ? '#3d52d5':'#B4C5E4'}} />
                                <Button circular icon = "feed" style={{color: this.props.showFeed ? '#feffff' : `#3c3744`, backgroundColor: this.props.showFeed ? '#3d52d5':'#B4C5E4'}} onClick={() => this.props._toggleFeed()}/>
                            </div>
                        </Menu.Item>
                        <Menu.Menu>
                            {/* POSSIBLE ADDITIONAL SEARCH TERM, MAYBE BY EVENT TYPE??? */}
                            { this.state.mounted ? <EventSearch /> : null }
                        </Menu.Menu>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button onClick={this.handleLogout} style={{backgroundColor:"#B4C5E4", color:"3D52D5"}}>LOGOUT</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
               </Segment>
            </>
        )
    }
}

const mapStateToProps = state => ({
    showFeed: state.navbar.showFeed,
    eventSelected: !!state.events.selectedEvent,
    eventsPresent: !!state.events.eventsByLocation._embedded,
})

const mapDispatchToProps = (dispatch) => ({
    _setLoadStatus: (bool) => dispatch(setLoadStatus(bool)), 
    _resetSearch: () => dispatch(resetSearch()),
    _loadPosition: () => dispatch(loadPositional()),
    _toggleFeed: () => dispatch(toggleFeed())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))