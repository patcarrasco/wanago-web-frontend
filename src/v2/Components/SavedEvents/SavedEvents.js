import React, { PureComponent } from 'react'
import {connect} from 'react-redux'

import { Segment, Grid, Responsive, Header } from 'semantic-ui-react';
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
                <div style={{fontSize: '22px'}}>    
                    <br/>               
                    < p > You haven't saved any events :( </p>
                    <br/>
                </div>
            )
        }
        return this.props.myEvents.map(event => {
            return <SavedEventItem key={event.identifier} {...event} />
        })
    }

    desktop = () => {
        return (
            <Segment className={'content-box'} style={{maxWidth: "50%", minWidth:"50%", maxHeight:"81.5%", overflow:'auto', borderRadius:'unset', marginLeft:'14px', marginRight: '14px'}}  >
                {this.state.safeMount ? <><Header as='h2'style={{color:"#3c3744"}}>Saved</Header><Grid>{this.createSavedEventsList()}</Grid></>: null}
            </Segment>
        )
    }

    mobile = () => {
        return (
            < Segment className = {
                'content-box'
            }
            style = {
                {
                    minHeight: '25%',
                    minWidth: "-webkit-fill-available",
                    maxHeight: '-webkit-fill-available',
                    maxWidth: '-webkit-fill-available',
                    overflow: 'auto',
                    borderRadius: 'unset',
                    marginRight: '14px',
                    marginLeft: '14px'
                }
            } >
                {this.state.safeMount ? <><Header as='h2'style={{color:"#3c3744"}}>Saved</Header><Grid>{this.createSavedEventsList()}</Grid></>: null}
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