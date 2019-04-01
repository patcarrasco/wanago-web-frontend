import React, { PureComponent } from 'react'
import { Button, Card, Grid, Icon} from "semantic-ui-react"
import {connect} from 'react-redux'
import {addHangout, loadAllHangouts, loadHangouts} from '../../../store/thunks/hangouts'


class HangoutFeed extends PureComponent {

    componentDidMount() {
        // this.props._loadHangouts()
        this.props._loadAllHangouts()
    }

    // componentDidUpdate() {
    //     this.props._loadAllHangouts()
    // }
    
    // myHangouts = () => {
    //     return this.props.myHangouts.map(e => <Header as='h3' key={e.id}>{e.name}</Header>) 
    // }

    addHangoutHandler = (id) => this.props._addHangout(id).then(res => {
        if (res.ok === true) {
            this.props._loadHangouts()
        }
    })

    hangoutFeedArray = () => {
        return this.props.hangouts.map((e, idx) => {
            return (
            <Grid.Row key={idx}>
                <Card>
                    <Card.Content color='blue'>
                        <Card.Header as='h4'>
                            {e.name}
                        </Card.Header>
                        <Card.Meta>
                            {e.username}
                        </Card.Meta>
                        <Card.Description>
                            {e.information}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button inverted fluid color='red' onClick={() => this.addHangoutHandler(e.id)}>
                            <Icon name='heart'/> add to map
                        </Button>
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
    _loadAllHangouts: () => dispatch(loadAllHangouts()),
    _addHangout: (id) => dispatch(addHangout(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(HangoutFeed)