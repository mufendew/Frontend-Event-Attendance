import React, { useState, useContext } from "react";
import {AppsContext} from "../context";
import './registerform.css';
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

const RegisterForm = (props) => {
    const [user, setUser] = useContext(AppsContext);

    const [warning, setWarning] = useState("");

    const [value, setValue] = useState({
        name:"",
        email : "",
        password : "",
        password_confirm : "",
        username : "",
    })

    var judul = props.isOrganizer ? "Organizer Register" : "Register";
    var linkLogin = props.isOrganizer ? "/organizer/" : "/";
    var linkApi = props.isOrganizer ? "/organizer/register" : "/register";
    var linkRedirect = props.isOrganizer ? "/organizer/" : "/";

    const handleChange = e => {
        setValue({
          ...value,
          [e.target.name]: e.target.value
        });
      };
    
    const onSubmit = () => {
    
        axios
          .post(linkApi, value)
          .then(function(response) {
            if (response.status === 201) {
                props.history.push ({
                    pathname : linkRedirect,
                    state: { detail: "data is successfully registered" }
                })
            }
          })
          .catch(function(error) {
              if (error.response.status===401) {
                setWarning("Wrong Email or Password");
              }else if (error.response.status===500){
                setWarning("Server Error");
              }
           
            console.log(error);
          });
      };
    
 
    return(
        <React.Fragment>
            <Card className="card-tumpul">
                <CardContent className="card-header">
                <h2 className="judul">{judul}</h2>
                </CardContent>
                <CardContent>
                    <form>
                    <TextField required fullWidth id="outlined-basic" onChange={handleChange} name="name" label="Name" variant="outlined" />
                    <TextField required style={{ marginTop: 10}} onChange={handleChange} name="username" fullWidth id="outlined-basic" label="Username" variant="outlined" />
                    <TextField required style={{ marginTop: 10}} onChange={handleChange} name="email" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                    <TextField required style={{ marginTop: 10}} onChange={handleChange} name="password" type="password" fullWidth id="outlined-basic" label="Password" variant="outlined" />
                    <TextField required style={{ marginTop: 10}} onChange={handleChange} name="password_confirmation" type="password" fullWidth id="outlined-basic" label="Password Confirm" variant="outlined" />
                    <Button onClick={onSubmit} className="register" size="large" fullWidth variant="contained" disableElevation>
                    Register
                    </Button>
                    <Link to={linkLogin} className="back-login" style={{ textDecoration: 'none' }}><div>Have an account ?</div></Link>

                    </form>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default withRouter(RegisterForm);