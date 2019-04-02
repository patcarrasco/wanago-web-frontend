import React from 'react'
import Geohash from 'latlon-geohash'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {getEventsByLocation} from '../../../store/thunks/event'
import { setLoadStatus, loadEventDetails, resetSearch} from '../../../store/actions/eventActions';
import {loadPositional} from '../../../store/thunks/users'



import { Header, Segment, Menu, Input, Select, Button } from 'semantic-ui-react';


class NavBar extends React.PureComponent {

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    handleSignUpClick = (e, {name}) => {
        name === 'signUp' && this.props.showSignup(true)
    }

    options() {
        return [
            { key:'all', text:'All', value:'all'},
            { key: 'music', text:'Music', value:'music'},
            { key: 'sports', text: 'Sports', value:'sports'}
        ]
    }

    render() {
        return (
            <>  
               
                <Segment basic vertical>
                    < Menu fluid size = 'tiny'
                    style = {
                        {
                            // backgroundColor: '#ebebeb',
                            backgroundColor: 'FBFFF1',
                            // backgroundColor: '#4062bb',
                            // backgroundColor: '#59c3c3',

                        }
                    } >
                        <Menu.Item style={{justifyContent:'flex-start'}}>
                            < Header 
                                as='h1'
                                style = {
                                {
                                    fontFamily: "Roboto, sans-serif",
                                    fontWeight: "300",
                                    color: "3D52D5",
                                    // borderStyle: "solid",
                                    // marginLeft: '1em'
                                    // backgroundColor: "#59c3c3"
                                    }
                                } 
                            > 
                                wanago 
                            </Header>
                        </Menu.Item>
                        <div style={{display:'flex', alignItems:'center', justifyContent:"center", marginLeft:'1em'}}>
                            <Button circular icon = "user" style={{color:"3D52D5", backgroundColor:'#B4C5E4'}}/>
                            <Button circular icon = "comment alternate" style={{color:"3D52D5", backgroundColor:'#B4C5E4'}}/>
                            <Button circular icon = "feed" style={{color:"3D52D5", backgroundColor:'#B4C5E4'}}/>
                        </div>


                        <Menu.Item>
                            {/* <Segment style={{minWidth:'9em', maxWidth:'100%'}}> */}
                                <Input placeholder="search" style={{borderColor:"red"}}>
                                    <Select compact options={this.options()} defaultValue='all' style={{minWidth:'9em'}} />
                                    <input/>
                                    <Button type='submit' style={{backgroundColor:"#B4C5E4", color:"3D52D5"}}>Search</Button>
                                </Input>
                            {/* </Segment> */}
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Button onClick={this.handleLogout} style={{backgroundColor:"#B4C5E4", color:"3D52D5"}}>LOGOUT</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
               </Segment>
                {/* <Segment padded style={{maxWidth: "50%"}}>
                    <Header>
                        stuff
                    </Header>
                </Segment> */}
            </>
        )
    }
}

const mapStateToProps = state => ({
    eventSelected: !!state.events.selectedEvent,
    eventsPresent: !!state.events.eventsByLocation._embedded,
})

const mapDispatchToProps = (dispatch) => ({
    getEventsByLocation: (query) => dispatch(getEventsByLocation(query)),
    _setLoadStatus: (bool) => dispatch(setLoadStatus(bool)), 
    loadEventDetails: () => dispatch(loadEventDetails(false)),
    _resetSearch: () => dispatch(resetSearch()),
    _loadPosition: () => dispatch(loadPositional())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))