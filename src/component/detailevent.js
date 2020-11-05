import React, { useState, useContext, useEffect } from "react";
import {AppsContext} from "../context";
import './detailevent.css';
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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const DetailEvent = (props) =>{
    const [user, setUser] = useContext(AppsContext);

    const [warning, setWarning] = useState("");

    const [Data, setData] = useState();


    useEffect(() => {
        axios
        .get("organizer/event/"+props.history.location.state.id)
        .then(function(response) {
            if (response.status === 200) {
                console.log  (response);
                setData(response.data.attendance);

            }
        })
        .catch(error => {
            console.log(error.message);
        });
    },[]);



    

    return (
        <React.Fragment>
            <Grid container  spacing={3} style={{marginTop: 10}}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                        <Button onClick={() =>props.history.push('/organizer/dashboard')} className="register" variant="contained" style={{float: 'right'}}>Back to Dashboard</Button>
                            <Typography className="text-kedua" color="textSecondary">
                            Event
                            </Typography>
                            <Typography className="Judul-list" variant="h6" component="h2" sty>
                            {props.history.location.state.name}
                            </Typography>
                            <Typography color="textSecondary">
                            {props.history.location.state.location}
                            </Typography>
                            <Typography color="textSecondary" style={{marginTop: 20}}>
                            {props.history.location.state.description}
                            </Typography>
                            
           
                        </CardContent>
                        <CardContent>
                            <Card>
                                <CardContent className="card-header">
                                    <h2 className="judul-table" style={{padding:0}}>Attendance</h2>
                                </CardContent>
                                <CardContent>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell ><b>Nama</b></TableCell>
                                            <TableCell ><b>Email</b></TableCell>
                                            <TableCell ><b>Jam</b></TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {Array.isArray(Data) ? (
                                            Data.map((row) => (
                                                <TableRow key={row.id}>
                                                <TableCell >{row.name}</TableCell>
                                                <TableCell >{row.email}</TableCell>
                                                <TableCell >{row.created_at}</TableCell>
                                                </TableRow>
                                            ))) : (
                                                <div>loading.....</div>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardActions>
                            
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            
        </React.Fragment>
    )
}

export default withRouter(DetailEvent);