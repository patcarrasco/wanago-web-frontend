import React, { PureComponent } from 'react'
import {Button} from 'semantic-ui-react'

import {getEvents} from '../../helpers/ticketmaster'


class Explore extends PureComponent {

    buttonHandler = () => {
        getEvents()
    }

    render(){
        return (
            <Button size='huge' onClick={this.buttonHandler}>Explore events</Button>
        )
    }
}

export default Explore