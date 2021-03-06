import React, { PureComponent } from 'react'

import {Menu, Dropdown, Button, Label, Responsive, Form, Header} from 'semantic-ui-react'

import {connect} from 'react-redux'

import { setLoadStatus, showSearchResults } from '../../../store/actions/eventActions';
import {searchForEvents} from '../../../store/thunks/event'
import Autocomplete from '../Autocomplete/Autocomplete';
import { toggleVenue } from '../../../store/actions/navbarActions';



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
        let regex = new RegExp("^[a-zA-Z0-9 ,'-]{4,}$", 'i')
        return regex.test(item)
    }
    
    searchStartHandler = () => {
        this.props._toggleVenue(false)
        if (this.validateLocation(this.state.searchLocation)) {
            this.setState({error: false, searched: true})
            // dispatch function that changes status to loading
            const {searchLocation, searchCategory} = this.state
            let geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({'address': searchLocation}, (res, status) => {
                if (status.toUpperCase() === 'OK') {
                    this.props._setLoadStatus(true)
                    this.props._showSearchResults()
                    !!this.props.closeModal && this.props.closeModal()
                    const {lng, lat} = res[0].geometry.location;
                    const obj = {
                        queryCat: searchCategory === 'all' ? '' : searchCategory,
                        latlong: `${lat()},${lng()}`
                    }
                    this.props._searchForEvents(obj)
                } else {
                    this.setState({error: true, errorMessage: "City not found. Please enter a valid location"})
                }
            })
        } else {
            this.setState({error: true, errorMessage: "Invalid Location. Please enter location in this format: Address / City, State"})
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
                <Responsive minWidth={879} style={{display: "flex", backgroundColor:'#ffffff', borderRadius:'16px'}}>
                    <Menu.Item style={{position:'static', padding:'1'}}>
                        <Dropdown selection name='searchCategory' style={{borderRadius:'16px'}} value={this.state.searchCategory} options={searchOptions} onChange={this.dropdownHandler} placeholder="category"/>
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
                        <Button disabled={!this.props.mapReady} icon="search" circular size='large' type='submit' style={{backgroundColor:"#B4C5E4", color:"3D52D5"}} onClick={this.searchStartHandler}></Button>
                    </Menu.Item>
                </Responsive>
                <Responsive maxWidth={878}>
                    < Form >
                        <Form.Field style={{color:"#3c3744"}}>
                            <Header as="h3">
                                Find events by city
                            </Header>
                        </Form.Field>
                        <Form.Field>
                            <Dropdown selection name='searchCategory' style={{borderRadius:'unset'}} value={this.state.searchCategory} options={searchOptions} onChange={this.dropdownHandler} placeholder="category"/>
                        </Form.Field>
                        <Form.Field>
                            <div style = {
                                {
                                    width: '100%',
                                    fontFamily: 'Roboto, sans-serif',
                                    lineHeight: '1em',
                                    minWidth: '14em',
                                    minHeight: '2.71428571em',
                                    border: 'none',
                                    display: 'block',
                                }
                            } >
                                <Autocomplete locationInput={this.locationInput} searched={this.state.searched} />
                                {this.state.error && this.erorrField()}
                            </div>
                        </Form.Field>
                        <Form.Field>
                            < Button disabled = {
                                !this.props.mapReady
                            }
                            fluid size = 'large'
                            type = 'submit'
                            style = {
                                {
                                    backgroundColor: "#3d52d5",
                                    color: "#fbfff1",
                                    borderRadius: 'unset',
                                    fontSize: '16px',
                                    fontWeight: '400'
                                }
                            }
                            onClick = {
                                this.searchStartHandler
                            } > Search </Button>
                        </Form.Field>
                    </Form>
                </Responsive>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    _searchForEvents: (query) => dispatch(searchForEvents(query)),
    _setLoadStatus: (bool) => dispatch(setLoadStatus(bool)),
    _showSearchResults: () => dispatch(showSearchResults(true)),
    _toggleVenue: (bool) => dispatch(toggleVenue(bool)),

})

export default connect(null, mapDispatchToProps)(EventSearch)