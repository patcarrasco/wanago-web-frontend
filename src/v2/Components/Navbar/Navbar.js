import React from 'react'
import Geohash from 'latlon-geohash'
import _ from 'lodash'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import { setLoadStatus, loadEventDetails, resetSearch} from '../../../store/actions/eventActions';
import {getEventsByLocation} from '../../../store/thunks/event'
import {loadPositional} from '../../../store/thunks/users'

import { Header, Segment, Menu, Input, Search, Button } from 'semantic-ui-react';
import {data as cityLoc} from '../../assets/usCities/usaCities'


class NavBar extends React.PureComponent {
    state = {searchLocation:"", searchPlaceholder: "controlled search"}

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }
    handleSignUpClick = (e, {name}) => name === 'signUp' && this.props.showSignup(true)
    // handleLocationSearch = (e) => this.setState({searchLocation: e.target.value})

    resetComponent = () => this.setState({searchLoading:false, results:[], searchLocation:""})

    handleLocationSearchChange = (e, {value}) => {
        this.setState({searchLocation: value}, () => {
            let filteredArray = cityLoc.filter(value => {
                return value.title.toUpperCase().includes(this.state.searchLocation.toUpperCase())
            })
            this.setState({
                searchPlaceholder: filteredArray[0].title
            })
        })
    }

    handleLocationSelect = (e, {result}) => this.setState({searchLocation: result.title})

    componentWillMount() {this.resetComponent()}

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
                        <Menu.Item> 
                            <div style={{display:'flex', alignItems:'center', justifyContent:"center", marginLeft:'1em'}}>
                                <Button circular icon = "user" style={{color:"3D52D5", backgroundColor:'#B4C5E4'}}/>
                                <Button circular icon = "comment alternate" style={{color:"3D52D5", backgroundColor:'#B4C5E4'}}/>
                                <Button circular icon = "feed" style={{color:"3D52D5", backgroundColor:'#B4C5E4'}}/>
                            </div>
                        </Menu.Item>
                        <Menu.Menu>
                            {/* POSSIBLE ADDITIONAL SEARCH TERM, MAYBE BY EVENT TYPE??? */}
                            <Menu.Item style={{position:"static", padding:'1'}}>
                                {/* <Input size='large' placeholder="search term"/>                            */}
                            </Menu.Item>
                            <Menu.Item style={{position:"static", padding:'0'}}>
                                FIND EVENTS NEAR YOU
                                <Input 
                                    placeholder={this.state.searchPlaceholder}
                                    name="searchLocation"
                                    value={this.state.searchLocation}
                                    onChange={this.handleLocationSearchChange}
                                />
                               
                                {/* <Input size='large' placeholder="autocomplete city....." value={this.state.searchLocation} onChange={this.handleLocationSearch} /> */}
                            </Menu.Item>
                            <Menu.Item>
                                <Button size='large' type='submit' style={{backgroundColor:"#B4C5E4", color:"3D52D5"}}>SEARCH</Button>
                            </Menu.Item>
                        </Menu.Menu>
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