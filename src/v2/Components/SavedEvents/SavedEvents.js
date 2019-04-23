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

    desktopView = () => {
        return (
            <Segment className={'content-box'} style={{maxWidth: "41%", minWidth:"41%", maxHeight:"81.5%", overflow:'auto', borderRadius:'unset', marginLeft:'14px', marginRight: '14px', position:'fixed'}}  >
                {this.state.safeMount ? <><Header as='h2'style={{color:"#3c3744"}}>Saved</Header><Grid>{this.createSavedEventsList()}</Grid></>: null}
            </Segment>
        )
    }

    mobileView = () => {
        return (
            < Segment className = {
                'content-box'
            }
            style = {
                {
                    minHeight: '30vh',
                    maxHeight: '30vh',
                    minWidth: "-webkit-fill-available",
                    maxWidth: '-webkit-fill-available',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    borderRadius: 'unset',
                    marginRight: '14px',
                    marginLeft: '14px',
                    padding: '14px'
                }
            } >
                {this.state.safeMount ? <><Header as='h2'style={{color:"#3c3744"}}>Saved</Header><Grid>{this.createSavedEventsList()}</Grid></>: null}
            </Segment>
        )
    }

    midView = () => (
        < Segment className = {'content-box'}
            style = {
                {
                    minHeight: '15vh',
                    maxHeight: '-webkit-fill-available',
                    minWidth: "402px",
                    maxWidth: '402px',
                    overflow: 'auto',
                    borderRadius: 'unset',
                    marginRight: '14px',
                    marginLeft: '14px'
                }
            } 
        >
            {this.state.safeMount ? <><Header as='h2'style={{color:"#3c3744"}}>Saved</Header><Grid>{this.createSavedEventsList()}</Grid></>: null}
        </Segment>
    )

    content = () => (
        <>
            <Responsive style={{position:'fixed'}} minWidth={1000}>
                {this.desktopView()}
            </Responsive>
            <Responsive style={{position:'fixed'}} maxWidth={999} minWidth={480}>
                {this.midView()}
            </Responsive>
            <Responsive style={{position:'fixed', maxWidth:"max-content"}} maxWidth={479}>
                {this.mobileView()}
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