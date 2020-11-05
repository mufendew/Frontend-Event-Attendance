import React, { useState, useContext } from "react";
import {AppsContext} from "../context";
import LoginForm from "../component/loginform";
import { StylesProvider } from '@material-ui/core/styles';

import logo from '../assets/image/logo.png';
import logoo from '../assets/image/logoo.png';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Login = () => {
    const [user, setUser] = useContext(AppsContext);
    return(
        <React.Fragment>
            <StylesProvider injectFirst>
            <Grid className="containerrr" container justify="center" spacing={5}>
                <Grid justify="center" item xs={6}>
                    <img src={logo} alt="Logo" style={{width:"300px", margin:"0px auto", display: "block"}} />
                </Grid>
                <Grid item xs={7}>
                    <img src={logoo} alt="Logo" style={{width:"350px", display: "block", margin:"0px auto"}} />
                    <h2 className="font" style={{color:"#2c2c2c", marginTop:"20px", marginBottom:"0px"}}>Event Attendance</h2>
                    <p style={{color:"#2c2c2c"}}>Adalah website untuk melihat event dan proses absensi, pendaftaran event, dan lain-lain. dan untuk memenuhi tugas dari kapital boost</p>
                    <Button variant="outlined" size="large" disableElevation>
                    About Us
                    </Button>
                </Grid>
                <Grid item xs={5}>
                    <LoginForm isOrganizer={true}></LoginForm>
                </Grid>
                
            </Grid>
            </StylesProvider>
        </React.Fragment>
    )
}

export default Login;