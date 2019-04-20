import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import { Header, Grid, Segment, Card, Button} from 'semantic-ui-react'

import {loadHangouts, loadAllHangouts} from '../../../../store/thunks/hangouts'


class EventsBar extends PureComponent {
    state = {page: 0}

    nextCardHandler = () => {
        if (this.state.page === this.hangoutFeedArray().length - 1) {
            this.setState({page: 0})
        } else {
            this.setState({page: this.state.page + 1})
        }
    }
    prevCardHandler = () => {
        if (this.state.page === 0) {
            this.setState({page: this.hangoutFeedArray().length-1})
        } else {
            this.setState({page: this.state.page - 1})
        }
    }

    componentDidMount() {
        this.props._loadHangouts()
        this.props._loadAllHangouts()
    }

    // myHangouts = () => {
    //     return this.props.myHangouts.map(e => <Header as='h3' key={e.id}>{e.name}</Header>) 
    // }

    hangoutFeedArray = () => {
        // console.log('in hangout feed array')
        return this.props.hangouts.map((e, idx) => {
            // console.log('in hangoutfeedarray map')
            return (
            <Card key={idx} >
                <Header color='red'>
                    {e.name}
                </Header>
                <Card.Content color='blue'>
                    <Header as='h4'>
                        {e.information}
                    </Header>
                </Card.Content>
                <Card.Content extra>
                    <Button icon='heart'/>
                </Card.Content>
            </Card>
            )
        }) 
    }

    renderHangoutCard = (idx) => {
        // console.log('in render hangoutcard')
        // console.log('in render hangout card')
        const val = this.hangoutFeedArray().find(e => {
            return parseInt(e.key) === idx
        })
        return val
    }



    render() {
        return(
            <>
                <Button onClick={this.nextCardHandler} >next event</Button>
                <Button onClick={this.prevCardHandler}>prev event</Button>
                <Header> All Hangouts </Header>
                {this.renderHangoutCard(this.state.page)}
            </>

        )
    }
}

const mapStateToProps = (state) => ({
    myHangouts: state.hangouts.myHangouts,
    hangouts: state.hangouts.hangouts
})

const mapDispatchToProps = (dispatch) => ({
    _loadHangouts: () => dispatch(loadHangouts()),
    _loadAllHangouts: () => dispatch(loadAllHangouts())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsBar)
// export default EventsBar2