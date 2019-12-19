import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Login from '../../components/forms/formTypes/login';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Carosuel from '../../components/animations/carousel';
import Fade from '@material-ui/core/Fade';

import LoadingIcon from '../../components/animations/loadingIcon';
import FooterNavBar from '../../components/dashboards/FooterBar';
import DashboardAppBar from '../../components/dashboards/DashboardAppBar';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
		useNextVariants: true
	},

	palette: {
		primary: {
			main: '#2196f3'
		},
		secondary: {
			main: '#CE1867'
		}
	}
});

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},

	responseRoot: {
		[theme.breakpoints.down('md')]: {
			margin: 'auto'
		},
		[theme.breakpoints.up('lg')]: {
			maxWidth: '100%'
		}
	},

	//Panel left is the container for the caros
	panelLeft: {
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			height: '-webkit-fill-available'
		},
		[theme.breakpoints.between('sm', 'lg')]: {
			width: '100%'
		},
		[theme.breakpoints.up('lg')]: {
			margin: 'auto',
			width: '50%',
			display: 'inline-block'
		}
	},

	//Panel right is the login form container
	panelRight: {
		[theme.breakpoints.down('sm')]: {
			background: 'rgba(255, 255, 255, 0.95)',
			width: '100%',
			margin: 'auto',
			display: 'inline-block',
			position: 'absolute',
			top: '20%'
		},
		[theme.breakpoints.between('sm', 'lg')]: {
			position: 'absolute',
			transform: 'translate(0%, -7%)',
			height: 'fit-content',
			width: '85%',
			borderRadius: '10px',
			padding: '1%',
			background: 'rgba(255, 255, 255, 0.95)'
		},
		[theme.breakpoints.up('lg')]: {
			position: 'relative',
			width: '50%',
			display: 'inline-block'
		}
	},

	img: {
		margin: 'auto',
		display: 'block',
		maxHeight: '100%'
	},

	//Login form is the container for the sign in
	loginForm: {
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '7%',
			paddingRight: '7%',
			paddingBottom: '10%',
			paddingTop: '6%'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			padding: '4%'
		},
		[theme.breakpoints.up('lg')]: {
			textAlign: 'left',
			marginLeft: '10%',
			maxWidth: '75%',
			transform: 'translate(0%, -19%)'
		}
	},

	//Response layout for the header
	formHeader: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '45px',
			height: '60px',
			textAlign: 'center'
		},
		[theme.breakpoints.between('sm', 'lg')]: {
			fontSize: '50px',
			height: '75px',
			textAlign: 'center'
		},
		[theme.breakpoints.up('lg')]: {
			fontSize: '60px',
			height: '120px',
			textAlign: 'left'
		}
	}
});

class LoginPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { classes, siginIn, loading, input, Email, Password } = this.props;

		return (
			// The man container for the login page including carousel, and login form
				<React.Fragment>
					<DashboardAppBar />
					<div className={classes.responseRoot}>
						<Fade in={true} {...(true ? { timeout: 1000 } : {})}>
							<Grid
								container
								spacing={0}
								justify={'center'}
								alignItems={'center'}
								alignContent={'center'}
							>
								<Grid item className={classes.panelLeft}>
									<Carosuel />
								</Grid>
								<Grid item className={classes.panelRight}>
									{loading === true ? (
										<div className={classes.loginForm}> <LoadingIcon IconSubText={`Validating sign in credentials`}/></div>
									) : (
										<div className={classes.loginForm}>
											<Typography
												color="primary"
												className={classes.formHeader}
												align="left"
												style={{ fontWeight: '300' }}
											>
												Sign in
											</Typography>
											<Login input={input} siginIn={siginIn} Email={Email} Password={Password} />
										</div>
									)}
								</Grid>
							</Grid>
						</Fade>
					</div>
					<FooterNavBar />
				</React.Fragment>
		);
	}
}
LoginPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);
