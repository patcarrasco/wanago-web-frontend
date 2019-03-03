import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {getEventsByLocation} from '../../store/thunks/event'

import { Icon, Input, Menu, Dropdown } from 'semantic-ui-react'

class SearchBar extends PureComponent {
    state = {queryLocation: '', queryCat: ''}
    
    onChangeHandler = e => this.setState({[e.target.name]: e.target.value})
    dropdownHandler = (e, {value}) => this.setState({queryCat: value})
    
    eventSearchHandler = () => {this.props.getEventsByLocation(this.state)}
    
    render() {
        const searchOptions = [
            {
                text: 'music',
                value: 'music',
            },
            {
                text: 'sports',
                value: 'sports'
            }
        ]

        return (
            <>
                <Menu.Item>
                    <Dropdown selection name='queryCat' value={this.state.queryCat} options={searchOptions} onChange={this.dropdownHandler}/>
                </Menu.Item>
                <Menu.Item>
                    <Input 
                        name='queryLocation'
                        onChange={this.onChangeHandler}
                        value={this.state.queryLocation}
                        placeholder = {'search by city'} 
                        icon={
                            <Icon 
                                name='search'
                                inverted
                                circular
                                link
                                color='violet'
                                onClick={this.eventSearchHandler}
                            />
                        }
                    />
                </Menu.Item>
            </>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    getEventsByLocation: (query) => dispatch(getEventsByLocation(query))
})

export default connect(null, mapDispatchToProps)(SearchBar)