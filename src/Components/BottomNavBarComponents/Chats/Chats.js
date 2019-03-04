import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import { Header } from 'semantic-ui-react'


class Chats extends PureComponent {

    render() {
        return(
            <Header>Chats Go here!</Header>
        )
    }
}

// export default connect()(Chats)
export default Chats