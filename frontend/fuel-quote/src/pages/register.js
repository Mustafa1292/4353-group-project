import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {default as MLink} from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

const styles = ((theme) => ({
     paper: {
       marginTop: "15px",
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
     }
    // avatar: {
    //   margin: theme.spacing(1),
    //   backgroundColor: theme.palette.secondary.main,
    // },
    // form: {
    //   width: '100%', // Fix IE 11 issue.
    //   marginTop: theme.spacing(3),
    // },
    // submit: {
    //   margin: theme.spacing(3, 0, 2),
    // },
  }));

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false,
            errors:{
              username: null,
              password: null
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleChange(event) {
        const { name, value } = event.target;
        const { user, errors } = this.state;
        console.log("event ${JSO}"+ JSON.stringify(errors));
        if(value.length<8 || value.length >50){
          errors[name] = `${name} should be greater than 8 and less than 50`;
        }else{
          errors[name] = null;
        }
        this.setState({
            user: {
                ...user,
                [name]: value
            },
            errors: {
              ...errors
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        console.log('User in state', user);
        if (user.username && user.password) {
            this.props.register(user);
        }
    }



    render() {
        const classes = this.props.classes
            return (
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                      <Grid container spacing={2}>
                        {/* <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            error={""}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                          />
                        </Grid> */}
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="UserName"
                            name="username"
                            autoComplete="username"
                            value={this.state.user.username}
                            error={this.state.errors.username}
                            onChange={e => this.handleChange(e)}
                            helperText={this.state.errors.username}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.user.password}
                            error={this.state.errors.password}
                            onChange={e => this.handleChange(e)}
                            helperText={this.state.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                          {/* <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive future fuel quotes."
                          /> */}
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Sign Up
                      </Button>
                      <Grid container justify="flex-end">
                        <Grid item>
                          <MLink href="/login" variant="body2">
                            Already have an account? Sign in
                          </MLink>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </Container>
              );
        
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(withStyles (styles) (RegisterPage));
export { connectedRegisterPage as RegisterPage };