import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import { Header, Grid, Segment, Button } from 'semantic-ui-react'
import {load_following, load_followers} from '../../../store/thunks/users'


class FriendsBar extends PureComponent {

    clickHandler = () => {
    }

    componentDidMount() {
        this.props._loadFollowers()
        this.props._loadFollowing()
    }

    followingList = () => {
        return this.props.following.map(e => <Header key={e.uuid}>{e.username}</Header>)
    }

    followerList = () => {
        return this.props.followers.map(e => <Header key={e.uuid}>{e.username}</Header>)
    }

    render() {
        console.log(this.props.followers)
        return(
            <Grid columns={'equal'}>
                <Grid.Column>
                    <Segment style={{overflowY: 'auto', maxHeight: '300px'}}>
                        <Header as='h1'>following</Header>
                        {this.followingList()}
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment style={{overflowY: 'auto', maxHeight: '300px'}}>
                        <Header as='h1'>followers</Header>
                        {this.followerList()}
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    following: state.users.following,
    followers: state.users.followers
})

const mapDispatchToProps = dispatch => ({
    _loadFollowers: () => dispatch(load_followers()),
    _loadFollowing: () => dispatch(load_following())
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsBar)
// export default FriendsBar