import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import Geohash from 'latlon-geohash'
import {getEventsByLocation} from '../../store/thunks/event'

import { Icon, Input, Menu, Dropdown, Header, Item } from 'semantic-ui-react'

class SearchBar extends PureComponent {
    state = {queryLocation: '', queryCat: ''}
    
    onChangeHandler = e => this.setState({[e.target.name]: e.target.value})
    dropdownHandler = (e, {value}) => this.setState({queryCat: value})
    
    eventSearchHandler = () => {
        const {queryLocation, queryCat} = this.state
        console.log('querying with', queryLocation)
        // console.log(Geocode.fromAddress({address:'new york'})
        let geocoder = new window.google.maps.Geocoder()
        
        geocoder.geocode({'address': queryLocation}, (res, status) => {
            if (status == 'OK') {
                const {lng, lat} = res[0].geometry.location;
                const geohash = Geohash.encode(lat(), lng())
                const obj = {
                    queryCat: queryCat,
                    geohash: geohash,
                    latlong: `${lat()},${lng()}`
                }
                this.props.getEventsByLocation(obj)
            } else {
                alert('Geocode not succesfull:' + status)
            }
        })


    }
    
    render() {
        const searchOptions = [
            {
                text: 'music',
                value: 'music',
            },
            {
                text: 'sports',
                value: 'sports'
            }
        ]

        return (
            <>
                <Item >
                    <Dropdown selection name='queryCat' value={this.state.queryCat} options={searchOptions} onChange={this.dropdownHandler} placeholder="category"/>
                </Item>
                <Item>
                    <Input 
                        name='queryLocation'
                        onChange={this.onChangeHandler}
                        value={this.state.queryLocation}
                        placeholder = {'location'} 
                        icon={
                            <Icon 
                                name='search'
                                inverted
                                circular
                                link
                                color='violet'
                                onClick={this.eventSearchHandler}
                            />
                        }
                    />
                </Item>
            </>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    getEventsByLocation: (query) => dispatch(getEventsByLocation(query))
})

export default connect(null, mapDispatchToProps)(SearchBar)