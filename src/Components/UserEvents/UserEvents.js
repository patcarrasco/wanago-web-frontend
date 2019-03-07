import React, { PureComponent } from 'react'
import { Card, Grid, Button, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getSavedEvents, deleteEvent} from '../../store/thunks/event'

class UserEvents extends PureComponent {

    componentDidMount(){
        this.props._loadEvents()
    }

    deleteHandler = (id) => {
        this.props._loadEvents()
        this.props._deleteEvent(id)
    }

    eventList = () => {
        console.log(this.props.events)
        if (this.props.events) {
            return (
                this.props.events.map((e, idx) => {
                    return (
                    <Grid.Row key={idx}>
                        <Card>
                            <Card.Content>
                                <Card.Header as='h5'>
                                    {e.name}
                                </Card.Header>
                                <Card.Description>
                                    {e.date} - {e.time}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button inverted color='red' disabled onClick={() => this.deleteHandler(e.id)}>
                                        <Icon name='trash' /> 
                                    </Button>

                                    <Button inverted color='orange' position='right' disabled>
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
    _loadEvents: () => dispatch(getSavedEvents()),
    _deleteEvent: (id) => dispatch(deleteEvent())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEvents)
