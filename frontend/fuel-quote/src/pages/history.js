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

const styles = {
  table: {
    minWidth: 650,
  },
};

  
function createData(id, gals, address, date, price, total) {
    return { id, gals, address, date, price, total };
}
const rows = [
    createData(1, 20, '123 Rainbow Rd.', '6/29/2021', 104.0, 200),
    createData(2, 16, '123 Rainbow Rd.', '6/27/2021', 102.0, 210),
];
class HistoryTable extends React.Component {
    render() {
        const classes = this.props.classes
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
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.gals}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
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



// const History = {};
// export { HistoryTable as History };

const HistoryT = (withStyles (styles) (HistoryTable));
export { HistoryT as History };
