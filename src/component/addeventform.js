import React, { useState, useContext } from "react";
import {AppsContext} from "../context";
import './addeventform.css';
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

const AddEventForm = (props) =>{
    const [user, setUser] = useContext(AppsContext);

    const [warning, setWarning] = useState("");

    const [value, setValue] = useState({
        name : "",
        description : "",
        location : "",
        time_from: "",
        time_until : "",
    })


    const handleChange = e => {
        setValue({
          ...value,
          [e.target.name]: e.target.value
        });
      };
    
    const onSubmit = () => {
    
        axios
          .post("organizer/event", value)
          .then(function(response) {
            if (response.status === 201) {
                console.log(response);
                props.history.push ("/organizer/dashboard")

            }
          })
          .catch(function(error) {
              console.log(error.response)
              if (error.response.status===401) {
                setWarning("Wrong Email or Password");
              }else if (error.response.status===500){
                setWarning("Server Error");
              }
           
            console.log(error);
          });
      };

    return (
        <React.Fragment>
            {console.log(value)}
            <Card className="card-tumpul">
                <CardContent className="card-header" style={{backgroundColor:"#e74c3c"}}>
                <h2 className="judul">Add Event</h2>
                </CardContent>
                <CardContent>
                    <form>
                    <TextField size="small" required fullWidth id="outlined-basic" onChange={handleChange} name="name" label="Event Name" variant="outlined" />
                    <TextField size="small" required style={{ marginTop: 10}} onChange={handleChange} name="description" fullWidth id="outlined-basic" label="Description" multiline rows={4} variant="outlined" />
                    <TextField  required style={{ marginTop: 10}} onChange={handleChange} name="location" fullWidth id="outlined-basic" label="location" variant="outlined" />
                    <TextField
                        
                        id="datetime-local"
                        style={{ marginTop: 10}}
                        variant="outlined"
                        label="Start Date"
                        type="datetime-local"
                        fullWidth
                        name="time_from"
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        
                        id="datetime-local"
                        style={{ marginTop: 10}}
                        variant="outlined"
                        label="Start Date"
                        type="datetime-local"
                        fullWidth
                        name="time_until"

                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button onClick={onSubmit} className="register" size="large" fullWidth variant="contained" disableElevation>
                    Add
                    </Button>

                    </form>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default withRouter(AddEventForm);