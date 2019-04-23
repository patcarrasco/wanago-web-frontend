import React from 'react'
import SignInForm from '../SignInForm/SignInForm';
import { Responsive } from 'semantic-ui-react';

import treelights from '../../assets/images/treelights.jpeg'
const LandingPageMainBackground = () => {

    const desktop = () => (
        < div style = {
            {
                width: "auto",
                height: "100vh",
                minHeight: "100vh",
                backgroundColor: '#3d52d5',
                backgroundImage: `url(${treelights})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10em"
            }
        } >
            <div style={
                    {
                        alignItems:"center", 
                        marginBottom:'20px',
                        borderBottom:"solid",
                        borderColor: "#E75A7C",
                    }
                }>
                < h1 style = {
                    {
                        fontFamily: "Roboto, sans-serif",
                        // fontWeight: "bold",
                        fontSize: "8em",
                        color: "#f45b69"
                    }
                } > wanago </h1>
            </div>

            < div style = {
                {
                    width: "max-content",
                    height: "20%",
                    justifySelf: "center",
                    display:"flex",
                    alignItems:"center",
                    justifyContent: "center",
                }
            } >
                < h2 style = {
                    {
                        fontFamily: "Roboto, san-serif",
                        fontSize: "50px",
                        color: "#fbfff1",
                    }
                } >
                    Live tonight. Find events near you.      
                </h2>
            </div>
            <div style = {
                {
                    marginTop: '20px',
                    maxWidth:"40%",
                    minWidth:"40%"
                }
            }>
                <SignInForm />
            </div>
        </div>
    ) 

    const mobile = () => (
        < div style = {
            {
                width: "auto",
                maxHeight: "-webkit-fill-available",
                minHeight: "-webkit-fill-available",
                // backgroundImage: `url(${treelights})`,
                // backgroundSize: 'cover',
                // backgroundRepeat: 'no-repeat',
                // backgroundPosition:'center',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "6em"
            }
        } >
            <div style={
                    {
                        flexDirection:"row", 
                        alignItems:"center", 
                        justifyContent:"space-between", 
                        alignContent:"flex-start",
                        borderBottom:"solid",
                        borderColor: "#E75A7C",
                        marginBottom: '14px'
                    }
                }>
                < h1 style = {
                    {
                        fontFamily: "Roboto, sans-serif",
                        // fontWeight: "bold",
                        fontSize: "6em",
                        color: "#f45b69"
                    }
                } > wanago </h1>
            </div>

            <div style={{maxWidth:'min-content'}}>
                <SignInForm />
            </div>
        </div>
    )

    return (
        <>
            <Responsive minWidth={1000}>
                {desktop()}
            </Responsive>
            <Responsive maxWidth={999}>
                {mobile()}
            </Responsive>
        </>
    )


}

export default LandingPageMainBackground