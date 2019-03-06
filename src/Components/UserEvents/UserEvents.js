import React, { PureComponent } from 'react'
import { Header } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getSavedEvents} from '../../store/thunks/event'

class UserEvents extends PureComponent {

    componentDidMount(){
        this.props._loadEvents()
    }

    eventList = () => {
        console.log(this.props.events)
        if (this.props.events) {
            return this.props.events.map((e, idx) => <Header as='h3' key={idx}>{e.name}</Header>)
        }
        return null
    }

    render(){
        console.log(this.props.events)
        // return "stuff"
        return <Header> {this.props.events ? this.eventList(): "not loaded"} </Header>
    }
}

const mapStateToProps = (state) => ({
    events: state.events.savedEvents.events
})

const mapDispatchToProps = dispatch => ({
    _loadEvents: () => dispatch(getSavedEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEvents)
