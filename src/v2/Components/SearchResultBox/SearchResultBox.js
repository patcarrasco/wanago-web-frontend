import React, { PureComponent } from 'react'
import {connect} from 'react-redux'

import {setLoadStatus, loadSearchEvents} from '../../../store/actions/eventActions'

import { Segment, Header, Button, Loader } from 'semantic-ui-react';

class SearchResultBox extends PureComponent {
    



    content = () => {
        if (this.props.loading) {
            return (
                <Loader active> 
                    Loading...
                </Loader>
            )
        } else {
            return (
                <Segment>
                    <Button onClick={()=>this.props.close()}>close</Button>
                    <Header> Search Results.... </Header>
                </Segment>
            ) 
        }
    }

    render() {
        console.log(this.props.searchedEvents)
        return this.props.searchedEvents.length > 0 ? this.content() : null
    }
}

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(loadSearchEvents([]))
})

const mapStateToProps = state => ({
    searchedEvents: state.events.searchedEvents,
    loading: state.events.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultBox)