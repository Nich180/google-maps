import axios from "axios";

const api = "http://buildinglist.azurewebsites.net/api";

//POST create an owner
async function POSTcreateOwner(name) {
  const response = await axios({
    data: { name },
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${api}/owner/`,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  console.log(`Create owner ${response}`);
  return response;
}

//POST to search contact designed for nav bar
async function POSTownersearch(name) {
  const response = await axios({
    data: { name },
    method: "post",
    url: `${api}/owners/search`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  return response.data.data;
}

//Get’s owners designed for assigning owner to a building
async function GETowners() {
  const response = await axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    url: `${api}/owners`,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  return response;
}

//POST
async function PUTupdateOwner(name) {
  const response = await axios({
    data: { name },
    method: "put",
    url: `${api}/owners/search`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  return response;
}

//PUT Update owners name detail
// async function PUTupdateOwner(ownerId) {
//   const response = await axios({
//     method: "post",
//     url: `${api}/owner/${ownerId}`,
//     headers: headers,
//     validateStatus: function(status) {
//       return status < 500 && status > 199;
//     }
//   });
//   return response.data.data;
// }

export default {
  POSTcreateOwner,
  POSTownersearch,
  GETowners,
  PUTupdateOwner
};
