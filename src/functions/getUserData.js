require("dotenv").config();
const axios = require("axios").default;

let user_data = {}; // user data

async function getUserDatas() {
  if (process.env.GET_TOKEN) {
    var options_validate = {
      method: "GET",
      url: "https://id.twitch.tv/oauth2/validate",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.GET_TOKEN, // token from authentication
      },
    };

    let token_validation; //get json data from token (if valide return details token) else status error 401

    await axios
      .request(options_validate) //get all user in chat (Need to check if we are in live)
      .then((res) => (token_validation = res.data))
      .catch(function (error) {
        user_data = {};
        process.env.GET_TOKEN = "";
      });

    //Check if token is still valide (if login exist = true)
    //console.log("validate", token_validation);
    if (token_validation == undefined || token_validation.login == undefined) {
      user_data = {};
      process.env.GET_TOKEN = "";
      return;
    }

    var header = {
      "Content-Type": "application/json",
      "Client-ID": process.env.TWITCH_CLIENT_ID, // ID of registered app in twitch console
      Authorization: "Bearer " + process.env.GET_TOKEN,
    };

    var options = {
      method: "GET",
      url: "https://api.twitch.tv/helix/users",
      headers: header,
    };

    await axios
      .request(options)
      .then((res) => (user_data = res.data.data[0]))
      .catch(function (error) {});
    //console.log("end");
  }
}



module.exports = getUserDatas();
