import axios from "axios";

const URL = "http://buildinglist.azurewebsites.net/api";

var headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
};

//response
//data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…},

//Sign in command
async function POSTsignIn(email, password) {
  const response = await axios({
    data: { email, password },
    method: "post",
    url: `${URL}/user/sign-in`,
    headers: headers,
    validateStatus: function(status) {
      return status < 500 && status > 199;
    }
  });
  return response;
}

//Register Account
async function POSTcreateAccount(
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

    if (response.data.status === "success") {
      console.log(response.data.data.message);
      return true;
    }
  } catch (ex) {
    alert(`Unsuccesful attempt at creating regitering an account`);
    return false;
  }
  return false;
}

//Register Account
async function GETsignOut() {
  const response = await axios({
    method: "get",
    url: `${URL}/user/sign-out`,
    headers: headers
  });
  console.log(response);
  return response;
}

//Register Account
async function POSTupdatePassword() {
  try {
    const response = await axios({
      method: "post",
      url: `${URL}/user/update-password`,
      headers: headers
    });
    if (response.data.status === "Success") {
      alert(response.data.message);
      return response.data.data;
    }
  } catch (ex) {
    console.log(ex);
    return false;
  }
  return false;
}

export default {
  POSTsignIn,
  POSTcreateAccount,
  GETsignOut,
  POSTupdatePassword
};
