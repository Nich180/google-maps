import axios from "axios";

const api = "http://buildinglist.azurewebsites.net/api";

var headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
};

//POST create a new contact-type to the building contact types
async function POSTcontactType(contact) {
  const response = await axios({
    method: "post",
    data: { name: contact },
    url: `${api}/contact-type`,
    headers: headers,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  console.log(response);
  return response;
}

//DELETE a contact type
async function DELETEcontactType(ownerId) {
  const response = await axios({
    method: "delete",
    url: `${api}/contact-type/${ownerId}`,
    headers: headers,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  console.log(response);
  return response;
}

//Modify a singular contact type
async function PUTupdateContactType(update) {
  const response = await axios({
    data: { name: update },
    method: "put",
    url: `${api}/contact-type/${localStorage(`ContactID`)}`,
    headers: headers,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  console.log(response);
  return response;
}

//GET search contact-type (2)
async function GETcontactTypeAll() {
  const response = await axios({
    method: "get",
    url: `${api}/contact-types`,
    headers: headers,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  console.log(response);
  return response;
}

//GET search contact-type (2)
async function GETcontactTypeSearchName(name) {
  const response = await axios({
    method: "get",
    url: `${api}/contact-type/search/${name}`,
    headers: headers,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  console.log(response);
  return response;
}

//GET a singular contact type
async function GETsingularContactTypes() {
  const response = await axios({
    method: "get",
    url: `${api}/contact-type/${localStorage(`ContactID`)}`,
    headers: headers,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  console.log(response);
  return response;
}

// {
//     "status": "Success",
//     "data": {
//         "contact_type_id": 7,
//         "name": "New contact-type"
//     },
//     "message": null
// }

export default {
  POSTcontactType,
  DELETEcontactType,
  PUTupdateContactType,
  GETcontactTypeAll,
  GETsingularContactTypes,
  GETcontactTypeSearchName
};
