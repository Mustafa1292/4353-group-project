import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = ((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Quote extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let month = date.getMonth() <=9 ? '0'+(date.getMonth()+1): date.getMonth()+1;
    let day = date.getDate() <=9 ? '0'+(date.getDate()): (date.getDate());
    let dateStr = `${date.getFullYear()}-${month}-${day}`;
//    console.log('data state '+date.getDate());

    this.state = {
        quote: {
          delivery : '',
          address : '',
          gallons : '',
          total : '',
          dateStr: dateStr, 
        },
        submitted: false,
        errors: {
          delivery : null,
          address : null,
          gallons : null,
          total : null,
        }
    };
  }


    handleChange(event) {
      const { name, value } = event.target;
      const { quote, errors } = this.state;
      console.log("event ${JSO}" + JSON.stringify(quote) + " : ");
      if (value.length < 8 || value.length > 50) {
        errors[name] = `${name} should be greater than 8 and less than 50`;
      } else {
        errors[name] = null;
      }
  
      // if (address1.length < 8 || address1.length > 100) {
      //   errors[name] = `${name} should be greater than 8 and less than 50`;
      // } else {
      //   errors[name] = null;
      // }
  
      // if (address2.length < 8 || address2.length > 100) {
      //   errors[name] = `${name} should be greater than 8 and less than 50`;
      // } else {
      //   errors[name] = null;
      // }
      
      if (name==='delivery' ) {
        // console.log('select date '+quote.dateStr+" : "+ value);
        
        let date = new Date(value);
//        date.setSeconds(0);
//        console.log(`dataselect ${name==='delivery'} :  ${quote.dateStr}` );
        quote.dateStr = value;


        let dateNow = new Date();
        if(date < dateNow) {
          errors[name] = `${name} date can't be before today`;
        }else{
          errors[name] = null;
        }
      }
      
      if(name === 'gallons_req' && !(/^\d{0,1000}$/.test(value))){
        errors[name] = `${name} should be greater than 1 and less than or equal to 1000`;
      }else{
        errors[name] = null;
      }
      
      this.setState({
        quote: {
          ...quote,
          [name]: value
        },
        errors: {
          ...errors
        }
      });
    }
  /*onstructor(props) {
  this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { delivery } = this.state;
    if (delivery) {
        this.props.quoteFormSub(delivery);
    }
}*/


    render() {
      // console.log(`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`);

      const classes = this.props.classes
        return (
          <Container component="main" maxWidth="xs">
            <div>
            <Avatar alt="Remy Sharp">
            <AssessmentIcon />
          </Avatar>
                <Typography component="h1" variant="h5">
                QuoteForm
                    </Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                          id="delivery"
                          label="Delivery date"
                          type="date"
                          name="delivery"
                          value={this.state.quote.dateStr}
                          onChange={e => this.handleChange(e)}
                          error={this.state.errors.delivery!==null}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      
                <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="gallons"
                            label="Gallons Requested"
                            name="gallons_req"
                            onChange={e => this.handleChange(e)}
                            error={this.state.errors.gallons_req!==null}
                            helperText={this.state.errors.gallons_req}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            disabled
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="suggested_price"
                            label="Suggested Price"
                            name="suggested_price"
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="total"
                            label="Total"
                            name="total"
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12}>
                        <Button
                    onSubmit={this.handleSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Submit
                  </Button></Grid>

                        </Grid>
            </div>
            </Container>
        );
    }

    
}



const QuoteF = (withStyles (styles) (Quote));
export { QuoteF as QuoteForm };


// export default function DatePickers() {
//   const classes = useStyles();}