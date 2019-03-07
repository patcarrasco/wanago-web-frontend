import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import { Header, Grid, Form } from 'semantic-ui-react'
import {load_following, load_followers, loadUsers, followAUser} from '../../../store/thunks/users'


class FriendsBar extends PureComponent {
    state = {}

    clickHandler = () => {
    }

    componentDidMount() {
        this.props._loadFollowers()
        this.props._loadFollowing()
        this.props._loadUsers()
    }

   
    followingList = () => {
        return this.props.following.map(e => {
            return (
                <Grid.Row key={e.uuid}>
                    <Header as='h3' inverted>{e.username}</Header>
                </Grid.Row>
            )
        })
    }

    searchHandler = (e, {value}) => this.setState({value})

    followUserHandler = () => {
        // console.log(this.state.value)
        this.props._followUser(this.state.value).then(()=>this.props._loadFollowing())
    }

    userSearch = () => {
        const {value} = this.state
        return (
            <Grid.Row>
                <Form>
                    <Form.Group inline>
                        <Form.Dropdown
                            search 
                            selection 
                            placeholder='add a user' 
                            onChange={this.searchHandler} 
                            options={this.userSearchOptions()} 
                            value={value}
                        />
                        <Form.Button fluid icon='plus' color='green' onClick={this.followUserHandler}/>
                    </Form.Group>
                </Form>
            </Grid.Row>
        )
    }

    userSearchOptions = () => {
        return this.props.users.data.map(e => {
            return {
                key: e.id,
                value: e.attributes.uuid,
                text: e.attributes.username
            }
        })
    }

    render() {
        console.log(this.props.users)
        return ( 
            <>
                {this.props.users.data && this.props.users.data.length > 0 && this.userSearch()}
                {this.followingList()}
            </>
        )
        
    }
}

const mapStateToProps = state => ({
    following: state.users.following,
    followers: state.users.followers,
    users: state.users.users
})

const mapDispatchToProps = dispatch => ({
    _loadFollowers: () => dispatch(load_followers()),
    _loadFollowing: () => dispatch(load_following()),
    _loadUsers: () => dispatch(loadUsers()),
    _followUser: (id) => dispatch(followAUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsBar)
// export default FriendsBar