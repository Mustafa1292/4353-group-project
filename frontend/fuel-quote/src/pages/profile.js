import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';

const styles = ((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));

class Profileform extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        profile: {
            fullName: '',
            address1: '',
            address2: '',
            city: '',
            us_state: '',
            zip: '',
        },
        submitted: false,
        errors: {
          fullName: null,
          address1: null,
          address2: null,
          city: null,
          us_state: null,
          zip: null,
        }
    };

    this.us_states=['TX','CA','NY'];

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
}

  handleChange(event) {
    const { name, value } = event.target;
    const { profile, errors } = this.state;
    console.log("event ${JSO}" + JSON.stringify(profile) + " : "+ this.us_states);
    if (value.length < 8 || value.length > 50) {
      errors[name] = `${name} should be greater than 8 and less than 50`;
    } else {
      errors[name] = null;
    }

    if (name==='address1' && (value.length < 8 || value.length > 100)) {
      errors[name] = `${name} should be greater than 8 and less than 50`;
    } else {
      errors[name] = null;
    }

    if (name==='address2' && (value.length < 8 || value.length > 100)) {
      errors[name] = `${name} should be greater than 8 and less than 50`;
    } else {
      errors[name] = null;
    }
    
    if (name==='city' && (value.length < 8 || value.length > 100) && !(/^[a-zA-Z]+$/.test(value)) ) {
      errors[name] = `${name} should be greater than 8 and less than 50`;
    }  else if(name === 'zip' && (value.length<5 || value.length > 9) && !(/^\d{5,8}$/.test(value))){
      errors[name] = `${name} should be greater than 5 and less than or equal to 9`;
    }else if(name === 'us_state' && !(this.us_states.includes(value))){
      errors[name] = `Select a valid state`;
    }else{
      errors[name] = null;
    }
    this.setState({
      profile: {
        ...profile,
        [name]: value
      },
      errors: {
        ...errors
      }
    });
  }

    render() {
        const classes = this.props.classes
        return (
    <Container component="main" maxWidth="xs">
            <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Profile Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full name"
            fullWidth
            autoComplete="full-name"
            error={this.state.errors.fullName !==null}
            onChange={e => this.handleChange(e)}
            helperText={this.state.errors.fullName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"

            error={this.state.errors.address1 !==null}
            onChange={e => this.handleChange(e)}
            helperText={this.state.errors.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"

            error={this.state.errors.address2 !==null}
            onChange={e => this.handleChange(e)}
            helperText={this.state.errors.address2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"

            error={this.state.errors.city !==null}
            onChange={e => this.handleChange(e)}
            helperText={this.state.errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField id="state" name="state" label="State/Province/Region" fullWidth /> */}
        
        
          <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={this.state.profile.us_state}
          onChange={e=> this.handleChange(e)}
          name="us_state"
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>Select State</em>
          </MenuItem>
          <MenuItem value={'TX'}>TX</MenuItem>
          <MenuItem value={'CA'}>CA</MenuItem>
          <MenuItem value={'NY'}>NY</MenuItem>
        </Select>
        <FormHelperText>{this.state.errors.us_state}</FormHelperText>
      </FormControl>



          {/* <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value='TX'
        //   onChange={}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>TX</MenuItem>
          <MenuItem value={20}>CA</MenuItem>
          <MenuItem value={30}>NY</MenuItem>
        </Select>
      </FormControl> */}
        
        
        
        
        
        
        
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"

            error={this.state.errors.zip}
            onChange={e => this.handleChange(e)}
            helperText={this.state.errors.zip}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Save address for future"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>

                <React.Fragment>
                    <div>

                        <Button className={classes.button}>
                            Submit
                        </Button>

                    </div>
                </React.Fragment>


            </Container>
        );
    }
}

const ProfileP = (withStyles (styles) (Profileform));

export { ProfileP as Profile };

