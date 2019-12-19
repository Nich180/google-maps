import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#CE1867'
    },
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    textAlign: 'center',
  },

  grow: {
  [theme.breakpoints.down('sm')]: {
    fontSize: '7px',
    maxWidth: '95%',
    margin: 'auto'
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '11px',
    maxWidth: '85%',
    margin: 'auto'
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '15px!important',
    maxWidth: '75%',
    margin: 'auto'
  },
},

  footerPadding: {
    [theme.breakpoints.down('up')]: {
      margin: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '7px',
      paddingTop: '10px',
      paddingBottom: '10px'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '11px',
      paddingTop: '10px',
      paddingBottom: '10px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '15px',
      paddingTop: '20px',
      paddingBottom: '20px'
    }
  },
  
  //responsive layout for width of text

  [theme.breakpoints.down('sm')]: {
    fontSize: '9px',
    width: '90%',
    margin: 'auto',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '80%',
    margin: 'auto',
  },
  [theme.breakpoints.up('lg')]: {

    width: '75%',
    margin: 'auto',    
  }
});

const centerStyle = {
};

const maxW = {
    textAlign: 'center',
    margin: 'auto',
};

function FooterNavBar(props) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="relative" 
              color="primary" 
              style={{boxShadow: '0px 0px 0px 0px white'}}
      >
        <Toolbar className={classes.footerPadding} > 
        <Grid container spacing={24} >
            <Grid item md={12} xs={12} sm={12} style={centerStyle}> 
                <Typography variant="h6" color="inherit" className={classes.grow} align="center" >
                            Excepteur occaeuiecat cupidatat.
                </Typography>  
            </Grid>
            <Grid item style={maxW}>
                <Typography variant="h6" color="inherit" className={classes.grow} align="center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                </Typography> 
            </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
    </div>
    </MuiThemeProvider>
  );
}

FooterNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterNavBar);