import React, { useState, useContext } from "react";
import {AppsContext} from "../context";
import './loginform.css';
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

const Loginform = (props) => {
    const [user, setUser] = useContext(AppsContext);

    const [warning, setWarning] = useState("");

    const [value, setValue] = useState({
        email : "",
        password : "",
    })

    var judul = props.isOrganizer ? "Organizer Login" : "Login";
    var linkRegister = props.isOrganizer ? "/organizer/register" : "/register";
    var linkApi = props.isOrganizer ? "/organizer/login" : "/login";
    var linkRedirect = props.isOrganizer ? "/organizer/dashboard" : "/dashboard";

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
            if (response.status === 200) {
                console.log(response)
                setUser({...user,token: response.data.token})
                sessionStorage.setItem('token', response.data.token);
                
                props.history.push (linkRedirect)
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
                    {props.location.state && (
                        <Alert severity="success">{props.location.state.detail}</Alert>
                    )}
                    {warning && (
                        <Alert severity="error">{warning}</Alert>
                    )}
                    
                    <form>
                    <TextField required  onChange={handleChange} name="email" fullWidth id="outlined-basic" label="Email" style={{ marginTop: 20}} variant="outlined" />
                    <TextField required  onChange={handleChange} name="password" type="password" style={{ marginTop: 20}} fullWidth id="outlined-basic" label="Password  &#9;" variant="outlined" />
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="Remember Me"
                    />
                    <Button onClick={onSubmit} className="login-button" size="large" fullWidth variant="contained" disableElevation>
                    Login
                    </Button>
                    <Divider style={{margin:"20px", borderWidth:"5px"}} light />
                    <div className="divider"><span>Or</span></div>
                    <Link to={linkRegister} style={{ textDecoration: 'none' }}>
                        <Button className="register-button" size="large" fullWidth variant="contained" disableElevation>
                        Register
                        </Button>
                    </Link>
                    
                    </form>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default withRouter(Loginform);