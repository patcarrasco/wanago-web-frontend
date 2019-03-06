import React, { PureComponent } from 'react'
import { Button, Header, Card, Segment, Container, Grid} from "semantic-ui-react"
import {connect} from 'react-redux'
import {loadHangouts, loadAllHangouts} from '../../store/thunks/hangouts'


class HangoutFeed extends PureComponent {

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
            <Grid.Row key={idx}>
                <Card>
                    <Header color='red'>
                        {e.name}
                    </Header>
                    <Card.Content color='blue'>
                        <Header as='h4'>
                            {e.information}
                        </Header>
                    </Card.Content>
                    <Card.Content extra>
                        <Button circular icon='heart' color='red' />
                    </Card.Content>
                </Card>
            </Grid.Row>
            )
        }) 
    }


    render() {
        return this.hangoutFeedArray()
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