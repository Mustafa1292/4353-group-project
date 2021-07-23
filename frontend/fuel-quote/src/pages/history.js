import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { API_URL } from "../constants/api"

const styles = {
  table: {
    minWidth: 650,
  },
};

  
function createData(id, gals, address, date, price, total) {
    return { id, gals, address, date, price, total };
}

function AddressCell(props){
  const address = props.address;

  console.log(address);

  return (
    <ul>
      <li>fullName: {address.fullName}</li>
      <li>address1: {address.address1}</li>
      <li>address2: {address.address2}</li>
      <li>city: {address.city}</li>
      <li>us_state: {address.us_state}</li>
      <li>zip: {address.zip}</li>
    </ul>
  )
}

class HistoryTable extends React.Component {
  state = {
    rows: []
  };

  componentDidMount(){
    const userProfile = JSON.parse(localStorage.getItem("user"));
    const username = userProfile.username
    fetch(`${API_URL}/quotes/${username}`).then((response)=>{
      return response.json().then((json)=>{
        if(!response.ok){
          console.error(json);
        } else {
          this.setState({ rows: json.quotes })
        }
      })
    })
  }

    render() {
        const classes = this.props.classes
        const rows = this.state.rows;
        console.log("rows:", rows); //better log
        return (
            <div>
                <h1>HistoryTable</h1>

                <Container component="main" maxWidth="m">

                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Gallons</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.gallons}</TableCell>
              <TableCell align="right">
                <AddressCell address={row.address}/>
              </TableCell>
              <TableCell align="right">{row.delivery}</TableCell>
              <TableCell align="right">{row.suggestedPrice}</TableCell>
              <TableCell align="right">{row.suggestedPrice * row.gallons}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Container>
            </div>
        );
    }
}

const HistoryT = (withStyles (styles) (HistoryTable));
export { HistoryT as History };
