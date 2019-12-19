import axios from "axios";

const api = "http://buildinglist.azurewebsites.net/api";

var headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
};

//POST add a owner to a building
async function POSTaddOwner(ownerId) {
  const response = await axios({
    method: "post",
    url: `${api}/building/${localStorage.getItem(
      "buildingID"
    )}/tasks/owner/${ownerId}`,
    headers: headers,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  console.log(response)
  return response;
}

//DELETE an owner from a building
async function DELETEowner(ownerId) {
  const response = await axios({
    method: "delete",
    url: `${api}/building/${localStorage.getItem(
      "buildingID"
    )}/tasks/owner/${ownerId}`,
    headers: headers,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  console.log(response)
  return response;
}

//GET all owners of the buildings
async function GETallOwners() {
  const response = await axios({
    method: "get",
    url: `${api}/building/${localStorage.getItem("buildingID")}/tasks/owners`,
    headers: headers,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  console.log(response)
  return response;
}

export default {
  POSTaddOwner,
  DELETEowner,
  GETallOwners
};
