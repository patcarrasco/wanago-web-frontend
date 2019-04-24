import React from 'react'
import {connect} from 'react-redux'

import { Grid, Button } from 'semantic-ui-react'

import Moment from 'react-moment'
import 'moment-timezone'
import { addEvent, deleteEvent } from '../../../store/thunks/event';

import { setActiveMarker } from '../../../store/actions/mapActions';

class EventCard extends React.Component {
    state={markerActive: false, savedActive: false}

    addToSaved = () => {

        if (!this.state.savedActive) {
            this.setState({ savedActive: true})
            this.props._addEvent(this.props)
        } else {
            this.setState({ savedActive: false})
            this.props._deleteEvent(this.props.id)
        }
    }

    addMarker = () => {
        let {venues} = this.props
        let {props} = this
        const {latitude, longitude} = venues[0].location
        const latlng = new props.map.props.google.maps.LatLng(latitude, longitude)
        
        return new props.map.props.google.maps.Marker({
            key: props.id,
            position: latlng,
            map: props.map.map,
            icon:{
                // size: new props.map.props.google.maps.Size(60, 30.26),
                // anchor: new props.map.props.google.maps.Point(30, 30.26),
                // url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/134893/pin-red.svg',
                url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/134893/pin-red.svg',
                anchor: new window.google.maps.Point(30, 34),
                scaledSize: new window.google.maps.Size(100, 50)
            }
        })
    }

    centerMapOnMarker = () => {
        if (!this.state.markerActive) {
            const {props} = this
            console.log('marker active')
            this.setState({markerActive: true})
            props._setActiveMarker(props.id)
            const marker = this.addMarker()
            props.addMarkerToRecord(marker)
            props.map.map.setZoom(15)
            props.map.map.panTo(marker.position)
            props.map.map.panBy(0, 0)
        }
    }

  
    formatTime(time) {
        return <Moment tx="America/New_York" format="h:mm a">{time}</Moment>
    }

    mobile = () => {
        const {props} = this
        let {name, venues, dates, priceRanges} = props // {image, attractions}
        let date = dates.start.dateTime
        let endDate = !!dates.end ? dates.end.dateTime : false
        let venueName = !!venues ? venues[0].name : ""
        if (venueName.length > 40) {
            venueName = venueName.slice(0,37) + "..."
        }
        if (name.length > 50) {
            name = name.slice(0,47) + "..."
        }

        let max = null
        let min = null
        if (!!priceRanges) {
            for (let i = 0; i < priceRanges.length; i++) {
                if (min === null || priceRanges[i].min < min) {
                    min = priceRanges[i].min
                }
                if (max === null || priceRanges[i].max > max) {
                    max = priceRanges[i].max
                }
            }
        }

        return (
            <Grid.Row columns={2} style={{borderBottom:"1px solid #b4c5e4", minHeight: "9.5em", maxHeight:"9.5em", fontSize:'12px'}}>
                <Grid.Column width={4}>
                    <div>
                        <div style={{fontSize:"22px", color:"#090c9b", alignItems:'center'}}>
                            <Moment tz="America/New_York" format="ddd">{date}</Moment>
                        </div>
                        {!!endDate ? <>ends <Moment tz="America/New_York" format="MMM DD">{endDate}</Moment></> : <Moment tz="America/New_York" format="MMM DD">{date}</Moment>}
                    </div>
                    <div>
                        {this.formatTime(date)}
                    </div>
                </Grid.Column>
                <Grid.Column width={10} style={{padding:'0px 14px 0px 0px'}}>
                    <div style={{fontSize:'14px', color:"#090c9b"}}>
                        {name}
                    </div>
                    <div>
                        {venueName}
                    </div>
                    <div>
                        {(!!max && !!min) ? <a href={props.url} rel="noopener noreferrer" target="_blank"> ${min} - ${max}</a> : 'prices n/a'}
                    </div>
                </Grid.Column>
                <Grid.Column width={2} style={{display:'flex', flexDirection: 'column', justifyContent:"space-evenly", padding:'0px 0px 0px 0px'}}>
                    <div>
                        <Button size="tiny" circular icon="map marker" onClick={this.centerMapOnMarker} style={{margin:'4px', backgroundColor: this.state.markerActive ? '#3d52d5' : '#b4c5e4', color: this.state.markerActive ? 'rgb(244,81,39)' : ""}}/>
                    </div>
                    <div>
                        <Button size="tiny" circular icon='heart' onClick={this.addToSaved} style={{margin:'4px', backgroundColor: this.state.savedActive ? '#3d52d5' : '#b4c5e4', color: this.state.savedActive ? 'white' : ""}}/>
                    </div>
                </Grid.Column>
            </Grid.Row>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.markerActive && nextState.markerActive) {
            return true
        }

        if (this.props.activeMarker === this.props.id) {
            return true
        }

        if (this.state.markerActive && this.props.activeMarker !== nextProps.activeMarker) {
            return true
        }

        if (this.state.savedActive !== nextState.savedActive) {
            return true
        }

        if (this.state.markerActive !== nextState.markerActive) {
            return true
        }

        return false
    }
    
    componentDidUpdate() {
        if (!!this.state.markerActive && this.props.activeMarker !== this.props.id) {
            this.setState({markerActive: false})
        }
    }

    componentDidMount() {
        if (this.props.checkSaved(this.props.id)) {
            this.setState({savedActive: true})
        }
    }

    render() {
        return this.mobile()
    }
}

const mapStateToProps = state => ({
    activeMarker: state.map.activeMarker,
    checkSaved: (value) => state.events.savedEventIds.includes(value),
    map: state.map.map,
})

const mapDispatchToProps = dispatch => ({
    _addEvent: (data) => dispatch(addEvent(data)),
    _setActiveMarker: (marker) => dispatch(setActiveMarker(marker)),
    _deleteEvent: (id) => dispatch(deleteEvent(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventCard)
