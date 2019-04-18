import React, { PureComponent } from 'react'
import {data} from '../../assets/usCities/usaCities'
import { Input } from 'semantic-ui-react';


class Autocomplete extends PureComponent {
    constructor(props) {
        super(props)
        this.cities = data.map(cities => cities.title)
        this.state = {
            suggest: [],
            value: ""
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
                    minWidth: 'inherit',
                    overflowY: 'auto',
                    maxHeight: '10em'
                    }
                }
            >
                {suggest.map((city, idx) => {
                    return (
                        <li key={`${city}-${idx}`} style={
                                {
                                    padding: '10px 5px',
                                    backgroundColor: this.state.activeItem === city ? 'cyan' : ''
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

    selectSuggestion(value) {
        this.setState({value: value, suggest: []})
    }

    cityNotFound = () => {
        return (
            <div style={{position:'absolute'}}>
                city not found
            </div>
        )
    }

    render() {
        console.log('activeitem', this.state.activeItem)
        return (
            < div style = {
                {
                    width: '100%',
                    borderBottom: '1px solid red',
                    fontFamily: 'Roboto, sans-serif',
                    lineHeight: '1em',
                    minWidth: '14em',
                    minHeight: '2.71428571em',
                    display: 'block',
                }
            } >
                <input 
                    placeholder="city"
                    style={{width:'inherit', border:'none', fontFamily: 'Roboto, sans-serif', outline: 'none', minHeight:'inherit'}}  
                    value={this.state.value} 
                    onChange={this.onTextChange} type="text" 
                />
                {this.renderSuggest()}
                {/* {this.state.activeItem ? this.cityNotFound()} */}
            </div>
        )
    }
}


export default Autocomplete