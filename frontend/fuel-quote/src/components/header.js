import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const navigation = useHistory();


  const handleClick = (e) =>{
      console.log(JSON.stringify(e));
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" id="login" onClick={ e => handleClick(e)}>Login</Button>
          <Button color="inherit" id="profile" onClick={e => handleClick(e)}>Profile</Button>
          <Button color="inherit" id="quote" onClick={e => handleClick(e)}>Quote</Button>
          <Button color="inherit" id="history" onClick={e => handleClick(e)}>History</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
