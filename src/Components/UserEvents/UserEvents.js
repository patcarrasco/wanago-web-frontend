import React, { PureComponent } from 'react'
import { Header, Card, Grid, Button, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getSavedEvents} from '../../store/thunks/event'

class UserEvents extends PureComponent {

    componentDidMount(){
        this.props._loadEvents()
    }

    eventList = () => {
        console.log(this.props.events)
        if (this.props.events) {
            return (
                this.props.events.map((e, idx) => {
                    return (
                    <Grid.Row>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    {e.name}
                                </Card.Header>
                                <Card.Description>
                                    {e.date} - {e.time}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button inverted color='red'>
                                        <Icon name='trash' /> 
                                    </Button>

                                    <Button inverted color='orange' position='right'>
                                        <Icon name='map marker' /> find
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Row>
                    ) 
                })
            )
        }
        return null
    }

    render() {
        return this.eventList()
    }
}

const mapStateToProps = (state) => ({
    events: state.events.savedEvents.events
})

const mapDispatchToProps = dispatch => ({
    _loadEvents: () => dispatch(getSavedEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEvents)
