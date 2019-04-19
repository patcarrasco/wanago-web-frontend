import React, { PureComponent } from 'react'

import {Menu, Dropdown, Button, Input, Label, Message} from 'semantic-ui-react'

import {connect} from 'react-redux'

import { setLoadStatus } from '../../../store/actions/eventActions';
import {searchForEvents} from '../../../store/thunks/event'
import Autocomplete from '../Autocomplete/Autocomplete';



class EventSearch extends PureComponent {
    state = {searchLocation: '', searchCategory: '', error: false, searched: false}
    
    onChangeHandler = e => this.setState({[e.target.name]: e.target.value})
    dropdownHandler = (e, {value}) => this.setState({searchCategory: value})

    
    locationInput = (val) => {
        this.setState({
            searchLocation: val,
            error: false,
            searched: false,
        })
    }

    validateLocation(item) {
        let regex = new RegExp("^[a-zA-Z ,']{6,}$", 'i')
        return regex.test(item)
    }
    
    searchStartHandler = () => {

        if (this.validateLocation(this.state.searchLocation)) {
            this.setState({error: false, searched: true})
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
                    this.props._searchForEvents(obj)
                } else {
                    alert('Geocode not succesfull:' + status)
                    this.setState({error: true, errorMessage: "City not found. Please enter a valid location"})
                }
            })
        } else {
            this.setState({error: true, errorMessage: "Invalid Location. Please enter location in this format: City, State"})
        }

    }

    erorrField() {
        return (
            <div style={{position: "absolute"}}>
                <Label basic pointing color="red">
                    {this.state.errorMessage}
                </Label>
            </div>
        )
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
                        < div style = {
                            {
                                width: '100%',
                                borderBottom: '1px solid #3d52d5',
                                fontFamily: 'Roboto, sans-serif',
                                lineHeight: '1em',
                                minWidth: '14em',
                                minHeight: '2.71428571em',
                                display: 'block',
                            }
                        } >
                            <Autocomplete locationInput={this.locationInput} searched={this.state.searched} />
                            {this.state.error && this.erorrField()}
                        </div>
                </Menu.Item>
                <Menu.Item>
                    <Button size='large' type='submit' style={{backgroundColor:"#B4C5E4", color:"3D52D5"}} onClick={this.searchStartHandler}>SEARCH</Button>
                </Menu.Item>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    _searchForEvents: (query) => dispatch(searchForEvents(query)),
    _setLoadStatus: (bool) => dispatch(setLoadStatus(bool))
})

export default connect(null, mapDispatchToProps)(EventSearch)