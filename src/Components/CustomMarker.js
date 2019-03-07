import React, { Component } from 'react';
import { Marker, InfoWindow } from 'google-maps-react';
class CustomMarker extends Component {
    state = {
        showInfoWindow: false
    };
    handleMouseOver = e => {
        console.log('moused over')
        this.setState({
            showInfoWindow: true
        });
    };
    handleMouseExit = e => {
        this.setState({
            showInfoWindow: false
        });
    };
    render() {
        const { showInfoWindow } = this.state;
        const { name } = this.props;
        return (
            <Marker 
            onMouseOver={this.handleMouseOver} 
            onMouseOut={this.handleMouseExit}
            {...this.props}
            >
                {showInfoWindow && (
                    <InfoWindow>
                        <h4>{name}</h4>
                    </InfoWindow>
                )}
            </Marker>
        );
    }
}
export default CustomMarker;