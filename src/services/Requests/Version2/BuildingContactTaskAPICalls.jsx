import axios from "axios";

const URL = "http://buildinglist.azurewebsites.net/api";

var headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
};

//Get’s all building contacts
async function GETallBuildingContacts() {
  let buildingID = localStorage.getItem("buildingID");
  try {
    const response = await axios({
      method: "get",
      url: `${URL}/building/${buildingID}/tasks/contacts`,
      headers: headers
    });
    console.log(response);
    return response.data.data;
  } catch (ex) {
    return null;
  }
}

//Get’s all building contacts
async function GETallBuildingContactsLabels() {
  let buildingID = localStorage.getItem("buildingID");
  try {
    const response = await axios({
      method: "get",
      url: `${URL}/building/${buildingID}/tasks/contacts`,
      headers: headers
    });
    console.log(response.data.data);
    //   response.data.data (3) [ {} {} {} ]
    let labels = response.data.data;
    let labelsObject = [{}];

    for (let i = 0; i < labels.length; i++) {
      labelsObject.push({
        label: labels[i].first_name,
        value: labels[i].last_name
      });
    }
    labelsObject.shift();
    return labelsObject;
  } catch (ex) {
    console.log(buildingID);
    return [];
  }
  return [];
}

//Get’s a single building contact by ID
async function GETsingleBuildingContact() {
  let buildingID = localStorage.getItem("buildingID");
  let contactId = localStorage.getItem("contactId");
  try {
    const response = await axios({
      method: "get",
      validateStatus: function(status) {
        return status < 500 && status > 200; // Reject only if the status code is greater than or equal to 500 and greater than 200
      },
      url: `${URL}/building/${buildingID}/tasks/contact/${contactId}`,
      headers: headers
    });
    if (response.data.status === "Success") {
      console.log("success: ", response.data);
      return response.data.data;
    }
  } catch (ex) {
    console.log(ex);
    return [];
  }
  return [];
}

//Deletes a building contact by id
async function DELETEsingleBuildingContact() {
  let buildingID = localStorage.getItem("buildingID");
  let contactId = localStorage.getItem("contactId");
  try {
    const response = await axios({
      method: "delete",
      url: `${URL}/building/${buildingID}/tasks/contact/${contactId}`,
      headers: headers
    });
    if (response.data.status === "Success") {
      console.log("success: ", response.data);
      return response.data;
    }
  } catch (ex) {
    console.log(ex);
    return "failed";
  }
  return "falied";
}

//Updates all buildings contact by id
async function PUTupdateBuildingContact(
  FirstName,
  LastName,
  Email,
  MobileNumber,
  PhoneNumber,
  ContactTypes
) {
  let buildingID = localStorage.getItem("buildingID");
  let contactId = localStorage.getItem("contactId");

  try {
    const response = await axios({
      data: {
        first_name: FirstName,
        last_name: LastName,
        email: Email,
        mobile: MobileNumber,
        phone: PhoneNumber,
        contact_type: ContactTypes
      },
      method: "put",
      url: `${URL}/building/${buildingID}/tasks/contact/${contactId}`,
      headers: headers
    });
    if (response.data.status === "Success") {
      console.log("success: ", response.data);
      return response.data.data;
    }
  } catch (ex) {
    console.log(ex);
    return "failed";
  }
  return "failed";
}

//Creates new contact in buildings
async function POSTnewBuildingContact(
  first_name,
  last_name,
  email,
  mobile,
  phone,
  contact_type
) {
  let buildingID = localStorage.getItem("buildingID");
  try {
    const response = await axios({
      validateStatus: function(status) {
        return status < 500 && status > 200; // Reject only if the status code is greater than or equal to 500 and greater than 200
      },
      method: "post",
      data: { first_name, last_name, email, mobile, phone, contact_type },
      url: `${URL}/building/${buildingID}/tasks/contact`,
      headers: headers
    });
    return response.data;
  } catch (ex) {
    console.log(ex);
    return [];
  }
  return [];
}

export default {
  GETallBuildingContactsLabels,
  POSTnewBuildingContact,
  GETallBuildingContacts,
  GETsingleBuildingContact,
  DELETEsingleBuildingContact,
  PUTupdateBuildingContact
};
