import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { userActions } from "../actions";
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const styles = ((theme) => ({
    paper: {
      marginTop: "15px",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
}));

class Quote extends React.Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let month =
      date.getMonth() <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
    let dateStr = `${date.getFullYear()}-${month}-${day}`;
    //console.log('data state '+date.getDate());

    this.state = {
        quote: {
        delivery : "",
        address : "",
        gallons : "",
        total : "",
        dateStr: dateStr, 
      },
      submitted: false,
      errors: {
        delivery : null,
        address : null,
        gallons : null,
        total : null,
      },
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

    if (name === "delivery") {
      // console.log('select date '+quote.dateStr+" : "+ value);

      let date = new Date(value);
      //date.setSeconds(0);
      //console.log(`dataselect ${name==='delivery'} :  ${quote.dateStr}` );
      quote.dateStr = value;


      let dateNow = new Date();
      if (date < dateNow) {
        errors[name] = `Delivery date can't be before today`;
      } else {
        errors[name] = null;
      }
    }

    if (name === "gallons_req" && !/^\d{0,1000}$/.test(value)) {
      errors[
        name
      ] = `${name} should be greater than 1 and less than or equal to 1000`;
    } else {
      errors[name] = null;
    }

    this.setState({
      quote: {
        ...quote,
        [name]: value,
      },
      errors: {
        ...errors,
      },
    });
  }
  /*onstructor(props) {
  this.handleSubmit = this.handleSubmit.bind(this);
  }
  */
  
  handleSubmit(e) {
    e.preventDefault();

    console.log("handle submit init");
    const gallons = this.state.quote.gallons_req;
    const address = this.state.address;
    const date = this.state.quote.delivery;

    if(date === void 0){
      console.error("no date chosen");
    }

    if(address === void 0){
      console.error("No address found yet")
      return;
    }
    if(gallons === void 0 || gallons === null){
      console.error("no gallons set yet")
      return;
    }
    if(this.state.errors.gallons_req){
      console.error("gallons has error:", this.state.errors.gallons_req)
      return;
    }
    if(this.state.errors.delivery){
      console.error("delivery has error:", this.state.errors.gallons_req)
      return;
    }

    console.log("suggested ready:", gallons, address)

    this.setState({ 
      submitted: true
    }, ()=>{
      const userProfile = JSON.parse(localStorage.getItem("user"));
      const username = userProfile.username
      fetch(`http://localhost:8080/quotes/${username}/order`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gallons: parseInt(gallons),
          address,
          date
        })
      }).then((response)=>{
        return response.json().then((json)=>{

          console.log("suggested result:", json);

          if(!response.ok){
            this.setState({ submitted: false})
          } else {
            this.setState({ submitted: false})
          }
        })
      })
  
    })

  }

  componentDidMount() {
    const userProfile = JSON.parse(localStorage.getItem("user"));
    const username = userProfile.username
    fetch(`http://localhost:8080/user/${username}/address`).then((response)=>{
      return response.json().then((json)=>{
        if(!response.ok){
          this.setState({ addresssError: json})
        } else {
          this.updateAddress(json.address)
        }
      })
    })
  }

  updateAddress(address){
    this.setState({ address }, ()=>{
      this.updateSuggestedPrice()
    })

  }

  updateDate(event){

    const { name, value } = event.target;
    const { quote, errors } = this.state;

    if (name === "delivery") {
      // console.log('select date '+quote.dateStr+" : "+ value);

      let date = new Date(value);
      // date.setSeconds(0);
      // console.log(`dataselect ${name==='delivery'} :  ${quote.dateStr}` );
      quote.dateStr = value;

      let dateNow = new Date();
      if (date < dateNow) {
        errors[name] = `Delivery date can't be before today`;
      } else {
        errors[name] = null;
      }
    }

    this.setState({
      quote: {
        ...quote,
        [name]: value,
      },
      errors: {
        ...errors,
      },
    }/*, ()=>{
      this.updateTotalPrice()
    }*/);

  }


  updateGallons(event){
    /* setting state */

    const { name, value } = event.target;
    const { quote, errors } = this.state;
    if (name === "gallons_req" && !/^([1-9][0-9]{0,3}|10000)$/.test(value)) {
      errors[
        name
      ] = `Gallons Requested should be greater than 1 and less than or equal to 10,000`;
    } else {
      errors[name] = null;
    }
    this.setState({
      quote: {
        ...quote,
        [name]: value,
      },
      errors: {
        ...errors,
      },
    }/*,()=>{
      this.updateSuggestedPrice()
    }*/);
  }

  updateSuggestedPrice(){
    const gallons = this.state.quote.gallons_req;
    const address = this.state.address;

    if(address === void 0){
      console.error("No address found yet")
      //this.setState({ suggestedPrice: void 0})
      return;
    }
    if(gallons === void 0 || gallons === null){
      console.error("no gallons set yet")
      //this.setState({ suggestedPrice: void 0})
      return;
    }
    if(this.state.errors.gallons_req){
      console.error("gallons has error:", this.state.errors.gallons_req)
      //this.setState({ suggestedPrice: void 0})
      return;
    }

    console.log("suggested ready:", gallons, address)

    this.setState({ 
      suggestedPrice: void 0
    }, ()=>{
      const userProfile = JSON.parse(localStorage.getItem("user"));
      const username = userProfile.username
      fetch(`http://localhost:8080/price/${username}/suggestedprice`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gallons: parseInt(gallons),
          address
        })
      }).then((response)=>{
        return response.json().then((json)=>{

          console.log("suggested result:", json);

          if(!response.ok){
            this.setState({ suggestedPriceError: json})
          } else {
            this.setState({
              suggestedPrice: json.pricePerGallon
            }, ()=>{
              this.updateTotalPrice()
            })
          }
        })
      })
  
    })
  }

  updateTotalPrice () {
    const gallons = this.state.quote.gallons_req;
    const suggestedPrice = this.state.suggestedPrice;

    if(gallons === void 0 || gallons === null){
      console.error("no gallons set yet")
      //this.setState({ totalPrice: void 0})
      return;
    }
    if(this.state.errors.gallons_req){
      console.error("gallons has error:", this.state.errors.gallons_req)
      //this.setState({ totalPrice: void 0})
      return;
    }

    if(suggestedPrice === void 0){
      console.error("suggestedPrice not available");
      //this.setState({ totalPrice: void 0})
      return;
    }
    console.log("success on total price")
    const total = parseInt(gallons) * suggestedPrice;
    this.setState({ totalPrice: total})

  }



  render() {
    // console.log(`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`);
    const userProfile = JSON.parse(localStorage.getItem("user"));
    //const address = userProfile.profile;

    const address = this.state.address;
    const bool = true;

    const classes = this.props.classes;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} >
          <Avatar alt="Remy Sharp">
            <AssessmentIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            Quote Form
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="delivery"
                label="Delivery date"
                type="date"
                name="delivery"
                value={this.state.quote.delivery}
                onChange={(e) => this.updateDate(e)}
                error={this.state.errors.delivery !== null}
                helperText={this.state.errors.delivery}
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
                onChange={(e) => this.updateGallons(e)}
                error={this.state.errors.gallons_req !== null}
                helperText={this.state.errors.gallons_req}
              />
            </Grid>
            {!address ? null : (
              <Grid item xs={12}>
                <h3>Address</h3>
                <div>{address.fullName}</div>
                <div>{address.address1}</div>
                <div>{address.address2}</div>
                <div>{address.city + ", " + address.us_state + " " + address.zip}</div>
                
                {/* can be removed since we don't need textfields? no input needed
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value = {address.fullName} 
                  disabled
                />*/}
              </Grid>
            )}
            <Grid item xs={12}>
              <h3>Suggested Price</h3>
              {
                this.state.suggestedPrice === void 0 ? <div>$0</div> : (
                  <div>${this.state.suggestedPrice}</div>
                )
              }
              {/*<TextField
                variant="outlined"
                fullWidth
                id="suggested_price"
                label="Suggested Price"
                name="suggested_price"
                value = {this.state.suggestedPrice} -->extra added but can be removed
                disabled
              />*/}
            </Grid>
            <Grid item xs={12}>
              <h3>Total Price:</h3>
              {
                this.state.suggestedPrice === void 0 ? <div>$0</div> : (
              <div>${this.state.totalPrice}</div>
              )
              }
              {/*<TextField
                variant="outlined"
                fullWidth
                id="total"
                label="Total"
                name="total"
                disabled
              /> */}
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={
                  this.state.quote.delivery === "" || this.state.quote.gallons_req === "" || this.state.address === "" ? true : false
                }
                onClick={() => {this.updateSuggestedPrice()}}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Get Quote
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
               disabled={
                  this.state.quote.delivery === "" || this.state.quote.gallons_req === "" || this.state.address === "" ? true : false
                }
                onClick={(e)=>{this.handleSubmit(e)}}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

const QuoteF = withStyles(styles)(Quote);
export { QuoteF as QuoteForm };


// export default function DatePickers() {
//   const classes = useStyles();}