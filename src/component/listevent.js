import React, { useState, useContext, useEffect } from "react";
import {AppsContext} from "../context";
import './listevent.css';
import { Link,Redirect, withRouter } from 'react-router-dom';
import axios from "axios";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ListEvent = (props) =>{
    const [user, setUser] = useContext(AppsContext);

    const [warning, setWarning] = useState("");

    const [Data, setData] = useState();

    var judul = props.isOrganizer ? "Lihat Event" : "Masuk";

    useEffect(() => {
        if(props.isOrganizer){
            axios
            .get("/organizer/event")
            .then(function(response) {
                if (response.status === 200) {
                    console.log  (response);
                    setData(response.data);

                }
            })
            .catch(error => {
                console.log(error.message);
            });
            
        }else{
            
            axios
            .get("/dashboard")
            .then(function(response) {
                if (response.status === 200) {
                    console.log  (response);
                    setData(response.data);

                }
            })
            .catch(error => {
                console.log(error.message);
            });
        }
        
    },[]);

    const onSubmit = (item) => {
        if(props.isOrganizer){
            props.history.push ({
                pathname : "/organizer/dashboard/event",
                state: item
            })
        }else{
            axios
                .post("dashboard/register", {event_code:item.event_code})
                .then(function(response) {
                if (response.status === 200) {
                    console.log(response)
                    setWarning("Berhasil masuk ke event "+item.name)
                }
                })
                .catch(function(error) {
                    // if (error.response.status===401) {
                    // setWarning("Wrong Email or Password");
                    // }else if (error.response.status===500){
                    // setWarning("Server Error");
                    // }
                
                console.log(error);
            });
        }
    
        
      };


    

    return (
        <React.Fragment>
            {warning && (
                        <Alert severity="success">{warning}</Alert>
                    )}
            <Grid container  spacing={3} style={{marginTop: 10}}>
            
            {Array.isArray(Data) ? (
                  Data.map(item => (
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography className="text-kedua" color="textSecondary">
                            Event
                            </Typography>
                            <Typography className="Judul-list" variant="h6" component="h2" sty>
                            {item.name}
                            </Typography>
                            <Typography color="textSecondary">
                            {item.location}
                            </Typography>
           
                        </CardContent>
                        <CardActions>
                            <Button onClick={()=>onSubmit(item)} className="register" size="large" fullWidth variant="contained">{judul}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                ))) : (
                    <div>asdsa</div>
                )}
            </Grid>
            
        </React.Fragment>
    )
}

export default withRouter(ListEvent);