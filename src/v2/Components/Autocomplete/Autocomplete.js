import React, { PureComponent } from 'react'
import {data} from '../../assets/usCities/usaCities'

class Autocomplete extends PureComponent {
    constructor(props) {
        super(props)
        this.cities = data.map(cities => cities.title)
        this.state = {
            suggest: [],
            value: "",
        }
    }

    onTextChange = (e) => {
        const value = e.target.value
        let suggest = []
        if (value.length > 5) {
            const regex = new RegExp(`^${value}`, 'i')
            // suggest = this.cities.sort().filter(c => c.toUpperCase().includes(value.toUpperCase()))
            suggest = this.cities.sort().filter(c => regex.test(c))
        }
        this.setState({suggest, value, activeItem: ''})
        this.props.locationInput(value)
    }

    renderSuggest() {
        const {suggest} = this.state
        if (suggest.length === 0) {
            return null
        }
        return (
            <ul 
                style={
                    {
                    listStyleType:'none', 
                    textAlign:'left', 
                    margin: '0', 
                    padding: '0', 
                    position: 'absolute', 
                    backgroundColor:'white',
                    border: '1px solid grey',
                    borderRadius: '4px',
                    minWidth: 'inherit',
                    overflowY: 'auto',
                    maxHeight: '10em',
                    color:'black',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px'
                    }
                }
            >
                {suggest.map((city, idx) => {
                    return (
                        <li key={`${city}-${idx}`} tabIndex="1" style={
                                {
                                    padding: '10px 5px',
                                    backgroundColor: this.state.activeItem === city ? '#b4c5e4' : ''
                                }
                            } 
                            onClick={()=> this.selectSuggestion(city)} 
                            onMouseEnter={()=>this.setState({activeItem: city})}
                            // onMouseLeave={()=> console.log('out', city)}
                        >
                            {city}
                        </li>
                        )
                    })
                }
            </ul>
        )
    }

    listSelectorMouse = (city) => {
        this.setState({activeItem: city})
    }

    selectSuggestion(city) {
        this.setState({value: city, suggest: []})
        this.props.locationInput(city)
    }

    render() {
        return (
            <>
                <input 
                    placeholder="address, city, state"
                    style = {
                        {
                            width: 'inherit',
                            border: 'none',
                            borderRadius: 'unset',
                            borderBottom: '1px solid #3d52d5',
                            fontFamily: 'Roboto, sans-serif',
                            outline: 'none',
                            minHeight: 'inherit',
                            fontSize: '16px'
                        }
                    }
                    value={this.state.value} 
                    onChange={this.onTextChange} type="text" 
                />
                {this.renderSuggest()}
            </>
        )
    }
}


export default Autocomplete