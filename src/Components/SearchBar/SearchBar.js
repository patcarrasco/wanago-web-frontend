import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import Geohash from 'latlon-geohash'
import {getEventsByLocation} from '../../store/thunks/event'

import { Icon, Input, Menu, Dropdown, Item, Button } from 'semantic-ui-react'
import { setLoadStatus } from '../../store/actions/eventActions';

class SearchBar extends PureComponent {
    state = {queryLocation: '', queryCat: ''}
    
    onChangeHandler = e => this.setState({[e.target.name]: e.target.value})
    dropdownHandler = (e, {value}) => this.setState({queryCat: value})
    
    eventSearchHandler = () => {
        // dispatch function that changes status to loading
        this.props._setLoadStatus(true)
        console.log('event search started')
        const {queryLocation, queryCat} = this.state
        console.log('querying with', queryLocation)
        let geocoder = new window.google.maps.Geocoder()
        
        geocoder.geocode({'address': queryLocation}, (res, status) => {
            console.log('starting geocode of inputed area')
            if (status.toUpperCase() === 'OK') {
                const {lng, lat} = res[0].geometry.location;
                const geohash = Geohash.encode(lat(), lng())
                const obj = {
                    queryCat: queryCat,
                    geohash: geohash,
                    latlong: `${lat()},${lng()}`
                }
                console.log('geocode success, with: ', obj)
                this.props.getEventsByLocation(obj)
            } else {
                alert('Geocode not succesfull:' + status)
            }
        })


    }
    
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
        ]

        return (
            <>
                <Menu.Item>
                    <Dropdown selection name='queryCat' value={this.state.queryCat} options={searchOptions} onChange={this.dropdownHandler} placeholder="category"/>
                </Menu.Item>
                <Menu.Item>
                    <Input 
                        name='queryLocation'
                        onChange={this.onChangeHandler}
                        value={this.state.queryLocation}
                        placeholder = {'city/address/location'} 
                    />
                </Menu.Item>
                <Item>
                    <Button fluid color='green' inverted onClick={this.eventSearchHandler}>
                        <Icon name='search'/>
                        FIND EVENTS
                    </Button>
                </Item>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getEventsByLocation: (query) => dispatch(getEventsByLocation(query)),
    _setLoadStatus: (bool) => dispatch(setLoadStatus(bool))
})

export default connect(null, mapDispatchToProps)(SearchBar)