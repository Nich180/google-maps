import axios from "axios";

const URL = "http://buildinglist.azurewebsites.net/api";
var logged = false;

//Sign in command
async function postUser(email, password) {
  try {
    const response = await axios.post(`${URL}/user/sign-in`, {
      email,
      password

    });
    if (response.data.status === "Success") {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("username", response.data.data.first_name);

      let account = { accountName: response.data.data.first_name };

      return account;
    }
    return true;
  } catch (ex) {
    console.log(ex);
    return alert(`Error message: ${ex}`);
  }
  return false;
}

//Register Account
async function postRegisterAccount(
  admin,
  first_name,
  last_name,
  email,
  password,
  phone
) {
  try {
    const response = await axios.post(`${URL}/user/create-account`, {
      admin,
      first_name,
      last_name,
      email,
      password,
      phone
    });
  } catch (ex) {
    console.log(`Post Register Account error: ${ex}`);
  }
}

var headers = {
  "Content-Type": "application/json",
  Authorization:
   localStorage.getItem("token")
};

//Fetch tags
async function postCoordinates(
  topLeftLat,
  botRightLat,
  topLeftLng,
  botRightLng
) {
  try {
    const response = await axios({
      method: "post",
      url: `${URL}/buildings`,
      data: {
        top_left_lat: topLeftLat,
        bot_right_lat: botRightLat,
        top_left_long: topLeftLng,
        bot_right_long: botRightLng
      },
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

///api/building/tasks/contact
async function postBuildingTasksContact(
  firstName,
  lastName,
  email,
  mobile,
  phone,
  contactType
) {
  try {
    const response = await axios({
      method: "post",
      url: `${URL}/building/${localStorage.getItem("buildingID")}/tasks/contact`,
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile: mobile,
        phone: phone,
        contact_type: contactType
      },
      headers: headers
    });
    if (response.data.status === "Success") {
      alert(response.data.message)
      return response.data.data;
    }
  } catch (ex) {
    console.log(firstName, lastName, email, mobile, phone, contactType)
    console.log(ex);
    return [];
  }
  return [];
}

//Fetch filter building Owners
async function postBuildingOwners(owner) {
  try {
    const response = await axios({
      method: "post",
      url: `${URL}/buildings/owners`,
      data: {
        owner
      },
      headers
    });
    if (response.data.status === "Success") {
      let filteredEmptyNames = [{}];

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

export default {
  postBuildingTasksContact,
  postBuildingOwners,
  postUser,
  postCoordinates,
  postRegisterAccount,
  logged
};
