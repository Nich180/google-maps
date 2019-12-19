import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import InfoWindowButton from './InfoWindowComponents/infoWindowButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ReactInfoWindow from './InfoWindowComponents/infoWindow';
import Paper from '@material-ui/core/Paper';

import { withTheme } from '@material-ui/core';

class ReactMarker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isClicked: false,
			hoverScale: 9,
			hoverColor: `rgb(33, 150, 243)`,
			status: false
		};

		this.handleClicked = this.handleClicked.bind(this);
		this.handleOnMouseHover = this.handleOnMouseHover.bind(this);
		this.handleCloseInfoWindow = this.handleCloseInfoWindow.bind(this);
		this.handleWindowStatus = this.handleWindowStatus.bind(this);
		this.escFunction = this.escFunction.bind(this);
	}
	escFunction(event) {
		if (event.keyCode === 27 && this.state.status) {
			this.setState({
				status: false,
				isClicked: false,
				hoverColor: `rgb(33, 150, 243)`
			});
		}
	}
	handleRemovals = () => {
		if (this.state.status) {
			this.setState({
				status: false,
				isClicked: false,
				hoverColor: `rgb(33, 150, 243)`
			});
		}
	};
	componentDidMount() {
		document.addEventListener('keydown', this.escFunction, false);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.escFunction, false);
	}

	handleWindowStatus = () => {
		this.setState({ status: true });
	};

	handleClicked = () => {
		this.setState({ isClicked: true, hoverColor: `red`, hoverScale: 10 });
		localStorage.setItem('buildingID', this.props.id);
	};

	handleCloseInfoWindow = () => {
		this.setState({
			status: false,
			isClicked: false,
			hoverColor: `rgb(33, 150, 243)`
		});
	};

	handleOnMouseHover = (scale, color) => {
		if (!this.state.isClicked) this.setState({ hoverScale: scale, hoverColor: color });
	};

	render() {
		const { id, position, markerClicked, name, address, animation, markerColor, markerScale } = this.props;

		const { status, hoverScale, hoverColor } = this.state;

		return (

			// This file is all about the Marker, from here you can access many import functions. Such as the tasks, history, building drawer, and more.
			<React.Fragment>
				<Marker
					clickable
					class={`ReactMarkerStyle`}
					defaultLabel={{
						text: ' ',
						color: 'white',
						fontSize: '19px',
						fontWeight: 'bold'
					}}
					icon={{
						path: window.google.maps.SymbolPath.CIRCLE,
						scale: hoverScale,
						fillColor: hoverColor,
						fillOpacity: 1,
						strokeWeight: 2,
						strokeColor: `#fff`
					}}
					id={id}
					position={position}
					name={name}
					onClickableChanged={() => console.log('changed')}
					onMouseOut={() => this.handleOnMouseHover(9, `rgb(33, 150, 243)`)}
					onMouseOver={() => this.handleOnMouseHover(12, `#3f51b5`)}
					onClick={() => {
						this.handleWindowStatus();
						this.handleClicked();
					}}
					defaultAnimation={animation}
				/>
				<ReactInfoWindow
					closeInfoWindow={this.handleCloseInfoWindow}
					position={position}
					status={status}
					name={name}
					address={address}
				/>
			</React.Fragment>
		);
	}
}
export default ReactMarker;
