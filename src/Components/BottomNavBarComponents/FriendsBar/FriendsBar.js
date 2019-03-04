import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import { Header, Grid, Segment } from 'semantic-ui-react'


class FriendsBar extends PureComponent {

    render() {
        return(
            <Grid columns='equal'>
                <Grid.Column>
                    <Segment>
                        <Header as='h1'>Friendslist</Header>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Header as='h1'>Friends Feed</Header>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

// export default connect()(FriendsBar)
export default FriendsBar