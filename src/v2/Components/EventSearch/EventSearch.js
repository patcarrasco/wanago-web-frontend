import React, { PureComponent } from 'react'

import {Menu, Dropdown, Button, Input} from 'semantic-ui-react'

import {connect} from 'react-redux'

import { setLoadStatus } from '../../../store/actions/eventActions';
import {getEventsByLocation} from '../../../store/thunks/event'
import Autocomplete from '../Autocomplete/Autocomplete';



class EventSearch extends PureComponent {
    state = {searchLocation: '', searchCategory: ''}
    
    onChangeHandler = e => this.setState({[e.target.name]: e.target.value})
    dropdownHandler = (e, {value}) => this.setState({searchCategory: value})
    
    searchStartHandler = () => {
        // dispatch function that changes status to loading
        this.props._setLoadStatus(true)
        const {searchLocation, searchCategory} = this.state
        let geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({'address': searchLocation}, (res, status) => {
            if (status.toUpperCase() === 'OK') {
                const {lng, lat} = res[0].geometry.location;
                const obj = {
                    queryCat: searchCategory === 'all' ? '' : searchCategory,
                    latlong: `${lat()},${lng()}`
                }
                this.props.getEventsByLocation(obj)
            } else {
                alert('Geocode not succesfull:' + status)
            }
        })
    }

    componentDidMount() {console.log('Event Search Mounted')}

    render() {
        const searchOptions = [
            {
                text: 'Music',
                value: 'music',
            },
            {
                text: 'Sports',
                value: 'sports'
            },
            {
                text: 'All',
                value: 'all',
            }
        ]
        return (
            <>
                <Menu.Item style={{position:'static', padding:'1'}}>
                    <Dropdown selection name='searchCategory' style={{borderRadius:'unset'}} value={this.state.searchCategory} options={searchOptions} onChange={this.dropdownHandler} placeholder="category"/>
                </Menu.Item>
                <Menu.Item style={{position: 'static', padding:'0'}}>
                    <Autocomplete />
                </Menu.Item>
                <Menu.Item>
                    <Button size='large' type='submit' style={{backgroundColor:"#B4C5E4", color:"3D52D5"}} onClick={this.searchStartHandler}>SEARCH</Button>
                </Menu.Item>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getEventsByLocation: (query) => dispatch(getEventsByLocation(query)),
    _setLoadStatus: (bool) => dispatch(setLoadStatus(bool))
})

export default connect(null, mapDispatchToProps)(EventSearch)