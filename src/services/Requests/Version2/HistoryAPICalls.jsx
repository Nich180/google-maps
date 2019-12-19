import axios from "axios";
const URL = "http://buildinglist.azurewebsites.net/api";

var headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
};

// Building Task History API calls
// !POST api/buildings/:building_id/tasks/history/:index/:num_of_records
//   (requires bearer token)
// Description
//                Returns a list of building tasks associated with building,
//                needs a index and the number of records to be returned as
//                  URL parameters
// Usage
//  api/building/600/tasks/history/0/100
// On success

// {
//     "status": "Success",
//     "data": [
//         {
//             "operation": "Delete Contact ",
//             "completed_by": "peter@glaziers.com",
//             "completed_on": "2019-03-07T02:51:26.000Z"
//         },
//         {
//             "operation": "Create Contact Reception",
//             "completed_by": "peter@glaziers.com",
//             "completed_on": "2019-03-07T02:51:19.000Z"
//         }
//     ],
//     "message": null
// }

//Fetch tags
async function GEThistoryRecords(index, numOfRecords, myCancelToken) {
  console.log("my cancel token in api call", myCancelToken)
  const response = await axios({
    method: "get",
    validateStatus: function(status) {
      return status < 500 && status > 199; // Reject only if the status code is greater than or equal to 500 and greater than 200
    },
    url: `http://buildinglist.azurewebsites.net/api/building/${localStorage.getItem(
      "buildingID"
    )}/tasks/history/0/100`,
    headers: headers,
  }); 
  console.log(response)
  return response;
}

export default {
  GEThistoryRecords
};

// {age: 45, name: "Marty McFly"})