import React, { PureComponent } from 'react'
import {connect} from 'react-redux'

import { Segment, Grid, Responsive, Header } from 'semantic-ui-react';
import { getSavedEvents } from '../../../store/thunks/event';
import SavedEventItem from './SavedEventItem';
import HideButton from '../HideButton/HideButton';

class SavedEvents extends PureComponent {
    state = {safeMount: false, show: true}

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
        if (this.props.show !== prevProps.show) {
            if (!this.state.show) {
                this.setState({
                    show: true
                })
            }
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
            <Segment className={'content-box'} style={{maxWidth: "41%", minWidth:"41%", maxHeight:"81.5%", overflow:'auto', borderRadius:'unset', marginLeft:'14px', marginRight: '14px', marginTop:'14px', position:'fixed'}}  >
                {this.state.safeMount ? <><Header as='h2'style={{color:"#3c3744"}}>Saved</Header><Grid>{this.createSavedEventsList()}</Grid></>: null}
            </Segment>
        )
    }

    mobileView = () => {
        return (
            <>
                < Segment className = {
                    'content-box'
                }
                style = {
                    {
                        minHeight: '30vh',
                        maxHeight: '30vh',
                        minWidth: "-webkit-fill-available",
                        maxWidth: '-webkit-fill-available',
                        overflow: 'auto',
                        borderRadius: 'unset',
                        marginRight: '14px',
                        marginLeft: '14px',
                        padding: '14px',
                        paddingBottom: '0',
                        marginBottom: '0px',
                        display: this.state.show ? 'block' : 'none' 
                    }
                } >
                    {this.state.safeMount ? <><Header as='h2'style={{color:"#3c3744"}}>Saved</Header><Grid>{this.createSavedEventsList()}</Grid></>: null}
                </Segment>
                 <HideButton toggle={()=>this.setState({show:!this.state.show})} show={this.state.show} />
            </>
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
            <Responsive style={{display:'grid'}} minWidth={1000}>
                {this.desktopView()}
            </Responsive>
            <Responsive style={{display:'grid'}} maxWidth={999} minWidth={480}>
                {this.midView()}
            </Responsive>
            <Responsive style={{display:'grid', minWidth:"-webkit-fill-available"}} maxWidth={479}>
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