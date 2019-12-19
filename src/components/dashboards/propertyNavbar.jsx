import React from 'react' 
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import Grid from '@material-ui/core/Grid';
import RenderPropsMenu from '../materialUiComponents/profileAvatar';
import SearchBar from '../materialUiComponents/searchbar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import '../../App.css'

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
    error: {
      main: `red`
    }
  }
})

const styles = {
  textField: {
    
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Margin = {
}

class PropertyNavbar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  constructor (props) {
    super(props)
    this.state = { searchBoxActive: false }
    this.handleSearchToggle = this.handleSearchToggle.bind(this)
  }

  handleSearchToggle () {
    this.setState(state => ({
      searchBoxActive: !state.searchBoxActive
    }))
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleChange = event => {
    this.setState({ anchorEl: null});
  };

  handleConsole = () => {
    console.log("google maps menu");
  };

  render () {
    // const { classes } = this.props;
    // const { auth, anchorEl } = this.state;
    // const open = Boolean(anchorEl);

    return (
      <MuiThemeProvider theme={theme}> 
          <AppBar 
            className='app-bar' 
            color="primary" 
            style={{boxShadow: '0px 0px 0px 0px white'}} 
            position="static">
              <Toolbar variant="dense"
                      style={Margin}>

                

                { /** 
                * !This section is the drawer for the filter settings menu, currently disabled
                */}

                <div style={{ width: 'calc(100%)', textAlign: '-webkit-center', padding: '1%', }}>
                  <SearchBar 
                    
                  />
                </div>
                <div className='grow'/>
              </Toolbar>
              <div style={{ position: 'absolute', right: '5%'}}>
                <RenderPropsMenu />
              </div>
          </AppBar>
      </MuiThemeProvider>
    )
  }
}


export default withStyles(styles)(PropertyNavbar);
