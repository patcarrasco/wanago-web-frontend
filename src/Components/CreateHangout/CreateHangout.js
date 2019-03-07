import React, { PureComponent } from 'react'
import { Form, Grid, Button, TextArea} from 'semantic-ui-react'
import Calendar from 'react-calendar'
import {connect} from 'react-redux'
import {createHangout} from '../../store/thunks/hangouts'

class CreateHangout extends PureComponent {
    state = {date: new Date(), name:'', information:'', lat: null, lng: null, location: ''}

    onChangeCalendar = date => this.setState({date})
    onChange = e => this.setState({[e.target.name]: e.target.value})

    submitHandler = e => {
        if (this.state.location.length > 2) {
            let geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({'address': this.state.location}, (res, status) => {
                if (status.toUpperCase() === 'OK') {
                    const {lng, lat} = res[0].geometry.location;
                    const obj = {...this.state, long:lng(), lat:lat()}
                    this.props._createHangout(obj)
                    return true
                } else {
                    alert('Enter address again, in a better way...?')
                }
            })

        } else {
            console.log('no location present, just doing things')
            this.props._createHangout({...this.state})
        }
    }

 
    render() {
        return(
            <>
                <Grid.Row>
                        <Form>
                            <Form.Field>
                                <Form.Input name="name" value={this.state.name} placeholder="Event Name" onChange={this.onChange}/>
                            </Form.Field>
                                <Form.Input name='location' value={this.state.location} placeholder="Enter an Address" onChange={this.onChange}/>
                            <Form.Field>
                                <TextArea name="information" value={this.state.information} placeholder='Tell us about the hangout...' onChange={this.onChange}/>
                            </Form.Field>
                            <Form.Field>
                                <Calendar 
                                    onChange={this.onChangeCalendar}
                                    value={this.state.date}
                                />
                            </Form.Field>
                        </Form>
                </Grid.Row>
                <Grid.Row>
                     <Button fluid color="green" onClick={this.submitHandler} >Create Event</Button>
                </Grid.Row>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    _createHangout: (eventInfo) => dispatch(createHangout(eventInfo))
})

export default connect(null, mapDispatchToProps)(CreateHangout)