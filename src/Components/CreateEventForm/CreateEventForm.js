import React, { PureComponent } from 'react'
import { Form, Header, Segment, Grid, Button } from 'semantic-ui-react'

class CreateEventForm extends PureComponent {

    render() {
        return(
            <Grid columns={2} centered>
                <Grid.Row>
                    <Grid.Column>
                        <Form>
                            <Form.Field>
                                <Form.Input placeholder="Event Name"/>
                            </Form.Field>
                            <Form.Field>
                                <Form.Input placeholder="Date"/>
                            </Form.Field>
                        </Form>
                        <Segment>
                            More options here
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Header>
                            Calender goes here
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            Search List for people with friend's list
                        </Segment>
                        <Button>Create Event</Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            Chats/Groups you belong too/ options to invite
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default CreateEventForm