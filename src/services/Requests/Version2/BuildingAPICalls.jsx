import axios from 'axios';
const api = 'http://buildinglist.azurewebsites.net/api';

var headers = {
	'Content-Type': 'application/json',
	Authorization: localStorage.getItem('token')
};

//GET building information
async function GETbuildingInfo(cancel) {
	try {
		const response = await axios({
			cancelToken: cancel,
			method: 'get',
			url: `${api}/building/${localStorage.getItem(`buildingID`)}`,
			headers: headers,
			validateStatus: function(status) {
				return status < 500 && status > 199;
			}
		});
    console.log(response)
		return response.data.data;
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log(error);
		}
	}
}

//Fetch tags    search, zoomLevel,
async function POSTbuildings(myCancelToken, search, zoomLevel, topLeftLat, botRightLat, topLeftLng, botRightLng) {
	headers = {
		'Content-Type': 'application/json',
		Authorization: localStorage.getItem('token')
	};
	const response = await axios({
		cancelToken: myCancelToken,
		method: 'post',
		url: `${api}/buildings`,
		data: {
			search: search,
			zoom_level: zoomLevel,
			top_left_lat: -5.295,
			bot_right_lat: -48.912,
			top_left_long: 113.73,
			bot_right_long: 186.24
		},
		validateStatus: function(status) {
			return status > 199 && status < 500;
		},
		headers: headers
	});
	console.log(`called`);
	return response.data.data;
}

///api/building/tasks/contact
async function POSTbuildingsFilter(topLeftLat, botRightLat, topLeftLng, botRightLng) {
	try {
		const response = await axios({
			method: 'post',
			url: `${api}/buildings/filter`,
			data: {
				top_left_lat: topLeftLat,
				bot_right_lat: botRightLat,
				top_left_long: topLeftLng,
				bot_right_long: botRightLng
			},
			headers: headers
		});
		if (response.data.status === 'Success') {
			return response.data.data;
		}
	} catch (ex) {
		console.log(ex);
		return [];
	}
	return [];
}

//Fetch filter building Owners
async function POSTbuildingsOwners(owner) {
	try {
		const response = await axios({
			method: 'post',
			url: `${api}/buildings/owners`,
			data: {
				owner
			},
			headers
		});
		if (response.data.status === 'Success') {
			let filteredEmptyNames = [ {} ];

			// Originally the request call would return hundreds of
			// empty labels, this for loop deletes those empty labels
			for (let i = 0; i < response.data.data.length; i++) {
				if (response.data.data[i].label.length > 1) {
					filteredEmptyNames.push(response.data.data[i]);
				}
			}
			return filteredEmptyNames;
		}
	} catch (ex) {
		console.log(ex);
		return [];
	}
	return [];
}

//Fetch filter building Owners
async function GETsearchOwners(owner) {
	const response = await axios({
		method: 'get',
		url: `${api}/buildings/search/${owner}`,
		headers,
		validateStatus: function(status) {
			return status < 500 && status > 199; // Reject only if the status code is greater than or equal to 500 and greater than 200
		}
	});
	console.log(response.data.data)
	return response;
}
export default {
	GETbuildingInfo,
	GETsearchOwners,
	POSTbuildingsFilter,
	POSTbuildingsOwners,
	POSTbuildings
};
