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

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Quote extends React.Component {
  
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
                          defaultValue="2021-09-01"
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



const QuoteF = (withStyles (useStyles) (Quote));
export { QuoteF as QuoteForm };


export default function DatePickers() {
  const classes = useStyles();}