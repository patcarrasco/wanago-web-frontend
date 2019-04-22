import React from 'react'
import SignInForm from '../SignInForm/SignInForm';
import { Responsive } from 'semantic-ui-react';


const LandingPageMainBackground = () => {

    const desktop = () => (
        < div style = {
            {
                width: "auto",
                height: "100vh",
                minHeight: "100vh",
                backgroundColor: '#3c3744',
                backgroundImage: `-webkit-linear-gradient(20deg, #b4c5e4 10%, transparent)`,
                backgroundSize: 'contain',
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
                        fontWeight: "300",
                        fontSize: "8em",
                        color: "#fbfff1"
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
                        fontWeight: "400",
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
                height: "100%",
                minHeight: "100%",
                // backgroundColor: '#3c3744',
                // backgroundImage: `-webkit-linear-gradient(20deg, #b4c5e4 10%, transparent)`,
                // backgroundSize: 'contain',
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
                        fontWeight: "300",
                        fontSize: "6em",
                        color: "#fbfff1"
                    }
                } > wanago </h1>
            </div>

            <div>
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