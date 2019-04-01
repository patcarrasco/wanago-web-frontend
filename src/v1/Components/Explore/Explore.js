import React, { PureComponent } from 'react'
import {Button} from 'semantic-ui-react'

class Explore extends PureComponent {

    buttonHandler = () => {
    }

    render(){
        return (
            <Button size='huge' onClick={this.buttonHandler}>Explore events</Button>
        )
    }
}

export default Explore