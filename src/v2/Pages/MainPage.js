import React from 'react'
import MapContainer from '../Components/MapContainer/MapContainer';
import Navbar from '../Components/Navbar/Navbar';
import EventFeed from '../Components/EventFeed/EventFeed';
import VenueFeed from '../Components/VenueFeed/VenueFeed';
import SearchResultBox from '../Components/SearchResultBox/SearchResultBox';
import SavedEvents from '../Components/SavedEvents/SavedEvents';


function MainPage(props) {
        return (
                <>
                        <div style={{height:'100%', backgroundColor:'white'}}>
                                <MapContainer/>  
                        </div>
                        <div style={{position:'fixed', width:'100%'}}>
                                <Navbar/>
                                <EventFeed />
                                <VenueFeed />
                                <SearchResultBox />
                                <SavedEvents />
                        </div>
                </>
        )  
}

export default MainPage