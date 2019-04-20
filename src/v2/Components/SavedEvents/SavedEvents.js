import React, { PureComponent } from 'react'
import {connect} from 'react-redux'

import { Segment, Grid, Responsive } from 'semantic-ui-react';
import { getSavedEvents } from '../../../store/thunks/event';
import SavedEventItem from './SavedEventItem';

class SavedEvents extends PureComponent {
    state = {safeMount: false}

    componentDidMount() {
        if (!this.props.myEvents) {
            this.props._getSavedEvents()
        } else {
            this.setState({safeMount: true})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.myEvents !== this.props.myEvents) {
            this.setState({safeMount: true})
        }
    } 

    createSavedEventsList = () => {
        if (this.props.myEvents.length < 1) {
            return (
                <div style={
                    {
                        display: 'flex', alignItems:'center', justifyContent: 'center', width: '100%', height: '100%',
                        position: 'absolute', fontSize: '2em'
                    }
                }>                   
                    There's nothing here ;(
                </div>
            )
        }
        return this.props.myEvents.map(event => {
            return <SavedEventItem key={event.identifier} {...event} />
        })
    }

    desktop = () => {
        return (
            <Segment className={'content-box'} style={{maxWidth: "50%", minWidth:"50%", maxHeight:"81.5%", minHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px'}}  >
                {this.state.safeMount ? <Grid>{this.createSavedEventsList()}</Grid>: null}
            </Segment>
        )
    }

    mobile = () => {
        return (
            <Segment className={'content-box'} style={{minWidth: "93%", minHeight: "20%", maxHeight:"85.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'16px', marginRight:'16px'}}  >
                {this.state.safeMount ? <Grid>{this.createSavedEventsList()}</Grid>: null}
            </Segment>
        )
    }

    content = () => (
        <>
            <Responsive minWidth={1000}>
                {this.desktop()}
            </Responsive>
            <Responsive maxWidth={999}>
                {this.mobile()}
            </Responsive>
        </>
    )

    render() {
        return this.props.show ? this.content(): null
    }
}

const mapStateToProps = state => ({
    myEvents: state.events.savedEvents,
    show: state.navbar.showSaved
})

const mapDispatchToProps = dispatch => ({
    _getSavedEvents: () => dispatch(getSavedEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedEvents)