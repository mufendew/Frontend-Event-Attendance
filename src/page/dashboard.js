import React, { useState, useContext } from "react";
import {AppsContext} from "../context";
import LoginForm from "../component/loginform";
import { StylesProvider } from '@material-ui/core/styles';
import ListEvent from "../component/listevent";
import { withRouter } from 'react-router-dom';
import axios from "axios";

import logo from '../assets/image/logo.png';
import logoo from '../assets/image/logoo.png';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

const Dashboard = (props) => {
    const [user, setUser] = useContext(AppsContext);
    const logOut = () => {
        axios
          .post('/logout')
          .then((response) => {
            sessionStorage.removeItem('token');
            setUser({
              ...user, 
              name : "",
              role : ""
            });
            props.history.push ("/");
          })
      }

    return(
        <div style={{backgroundColor:"#deddd8", height:"100vh"}}>
            <StylesProvider injectFirst>
                <AppBar position="static" style={{backgroundColor:"white"}}>
                    <div className="containerrr">
                        <div className="nav-container">
                            <img src={logo} alt="Logo" style={{width:"150px"}} />
                            <Button onClick={logOut} variant="contained" className="register" style={{float:"right", marginTop:"5px"}}>Logout</Button>
                        </div>
                    </div>
                </AppBar>
                <Grid className="containerrr" container justify="center" spacing={5}>
                    <Grid justify="center" item xs={12}>
                        <ListEvent></ListEvent>
                    </Grid>
                </Grid>
            
            </StylesProvider>
        </div>
    )
}

export default withRouter(Dashboard);