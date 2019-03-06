import React, { PureComponent } from 'react'
import { Button, Header, Card} from "semantic-ui-react"
import {connect} from 'react-redux'
import {loadHangouts, loadAllHangouts} from '../../store/thunks/hangouts'


class HangoutFeed extends PureComponent {
   state = {page: 0}


    componentDidMount() {
        this.props._loadHangouts()
        this.props._loadAllHangouts()
        window.addEventListener('scroll', this.onScroll, false)
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false)
    }

    onScroll = () => {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && this.handoutFeedArray().length) {
            this.props.onPaginatedSearch();
        }
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


    render() {
        return(
            <>
                <Header> All Hangouts </Header>
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


export default connect(mapStateToProps, mapDispatchToProps)(HangoutFeed)