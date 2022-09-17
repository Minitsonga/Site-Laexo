require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const routes = require("./src/routes/routes.js");
const axios = require("axios").default;

const session = require("express-session");
const crypto = require('crypto');
const name = 'braitsch';
var hash = crypto.createHash('md5').update(name).digest('hex');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(
  session({
    secret: hash,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 30 * 60 * 1000,
    },
    rolling: true,
  })
);

app.use("", routes);

let user_data = {}; // user data

let leaderboard = {
  rank: [],
  uptime: { week: [], month: [], global: [] },
  message: { week: [], month: [], global: [] },
};
let listUserPP = [];
let listPP_LastUpdated = [];

async function getLeaderboard() {
  if (listUserPP.length <= 0) {
    fs.readFile("img.json", (err, data) => {
      if (err) throw err;
      listUserPP = JSON.parse(data);
      console.log("JSON data is loaded.");
    });
  }

  //#region Get Setup Leaderboard List from wizebot api

  await axios
    .get(
      "https://api.wizebot.tv:8030/v2/laexo/channel_rank.json?include_keys=1"
    )
    .then((res) => (leaderboard.rank = res.data.datas));

  await axios
    .get(
      "https://wapi.wizebot.tv/api/ranking/c476492c15def796d57a7f0952228757/top/uptime/week/50"
    )
    .then((res) => (leaderboard.uptime.week = res.data.list));

  await axios
    .get(
      "https://wapi.wizebot.tv/api/ranking/c476492c15def796d57a7f0952228757/top/uptime/month/50"
    )
    .then((res) => (leaderboard.uptime.month = res.data.list));

  await axios
    .get(
      "https://wapi.wizebot.tv/api/ranking/c476492c15def796d57a7f0952228757/top/uptime/global/50"
    )
    .then((res) => (leaderboard.uptime.global = res.data.list));

  await axios
    .get(
      "https://wapi.wizebot.tv/api/ranking/c476492c15def796d57a7f0952228757/top/message/week/50"
    )
    .then((res) => (leaderboard.message.week = res.data.list));

  await axios
    .get(
      "https://wapi.wizebot.tv/api/ranking/c476492c15def796d57a7f0952228757/top/message/month/50"
    )
    .then((res) => (leaderboard.message.month = res.data.list));

  await axios
    .get(
      "https://wapi.wizebot.tv/api/ranking/c476492c15def796d57a7f0952228757/top/message/global/50"
    )
    .then((res) => (leaderboard.message.global = res.data.list));

  //#endregion

  if (listPP_LastUpdated.length >= 1) {
    // need to be <= 0 to work (here is to block while in dev)

    let lengthPP = listUserPP.length;

    for (let i = 0; i < 50; i++) {
      const member = leaderboard.rank[i];

      let ppUserData = listUserPP.find(
        (element) => member.viewer_uid == element.user_uid
      );
      let userUpdated = listPP_LastUpdated.find(
        (element) => member.viewer_uid == element.user_uid
      );

      if (userUpdated == undefined) {
        let img;
        await axios
          .get(
            `https://wapi.wizebot.tv/api/avatars/${member.viewer_name}/sized/300x300`
          )
          .then(
            (res) => (img = "https://" + res.request.host + res.request.path)
          )
          .catch((e) => {
            console.log(e);
            return;
          });

        if (ppUserData == undefined) {
          listUserPP.push({
            user_name: member.viewer_name,
            user_uid: member.viewer_uid,
            img,
          });
        } else {
          let index = listUserPP.findIndex(
            (element) => member.viewer_uid == element.user_uid
          );
          listUserPP[index].img = img;
        }

        listPP_LastUpdated.push({ user_uid: member.viewer_uid });
      }
    }

    //#region  Getting img user from Uptime Lists
    console.log(leaderboard.uptime.week)
    for (let i = 0; i < leaderboard.uptime.week.length; i++) {
      const member = leaderboard.uptime.week[i];

      let ppUserData = listUserPP.find(
        (element) => member.user_uid == element.user_uid
      );
      let userUpdated = listPP_LastUpdated.find(
        (element) => member.user_uid == element.user_uid
      );

      if (userUpdated == undefined) {
        console.log("user to update", member);
        let img;

        await axios
          .get(
            `https://wapi.wizebot.tv/api/avatars/${member.user_name}/sized/300x300`
          )
          .then(
            (res) => (img = "https://" + res.request.host + res.request.path)
          )
          .catch((e) => {
            console.log(e);
            return;
          });

        if (ppUserData == undefined) {
          console.log("member added uptime week");
          listUserPP.push({
            user_name: member.user_name,
            user_uid: member.user_uid,
            img,
          });
        } else {
          let index = listUserPP.findIndex(
            (element) => member.user_uid == element.user_uid
          );
          listUserPP[index].img = img;
          console.log("member updated uptime week");
        }

        listPP_LastUpdated.push({ user_uid: member.user_uid });
      }
    }

    for (let i = 0; i < leaderboard.uptime.month.length; i++) {
      const member = leaderboard.uptime.month[i];
      let ppUserData = listUserPP.find(
        (element) => member.user_uid == element.user_uid
      );
      let userUpdated = listPP_LastUpdated.find(
        (element) => member.user_uid == element.user_uid
      );

      if (userUpdated == undefined) {
        console.log("user to update", member);
        let img;

        await axios
          .get(
            `https://wapi.wizebot.tv/api/avatars/${member.user_name}/sized/300x300`
          )
          .then(
            (res) => (img = "https://" + res.request.host + res.request.path)
          )
          .catch((e) => {
            console.log(e);
            return;
          });

        if (ppUserData == undefined) {
          console.log("member added uptime month");
          listUserPP.push({
            user_name: member.user_name,
            user_uid: member.user_uid,
            img,
          });
        } else {
          let index = listUserPP.findIndex(
            (element) => member.user_uid == element.user_uid
          );
          listUserPP[index].img = img;
          console.log("member updated uptime month");
        }

        listPP_LastUpdated.push({ user_uid: member.user_uid });
      }
    }

    for (let i = 0; i < leaderboard.uptime.global.length; i++) {
      const member = leaderboard.uptime.global[i];
      let ppUserData = listUserPP.find(
        (element) => member.user_uid == element.user_uid
      );
      let userUpdated = listPP_LastUpdated.find(
        (element) => member.user_uid == element.user_uid
      );

      if (userUpdated == undefined) {
        console.log("user to update", member);
        let img;

        await axios
          .get(
            `https://wapi.wizebot.tv/api/avatars/${member.user_name}/sized/300x300`
          )
          .then(
            (res) => (img = "https://" + res.request.host + res.request.path)
          )
          .catch((e) => {
            console.log(e);
            return;
          });

        if (ppUserData == undefined) {
          console.log("member added uptime global");
          listUserPP.push({
            user_name: member.user_name,
            user_uid: member.user_uid,
            img,
          });
        } else {
          let index = listUserPP.findIndex(
            (element) => member.user_uid == element.user_uid
          );
          listUserPP[index].img = img;
          console.log("member updated uptime global");
        }

        listPP_LastUpdated.push({ user_uid: member.user_uid });
      }
    }

    //#endregion

    //#region  Getting img user from Message Lists

    for (let i = 0; i < leaderboard.message.week.length; i++) {
      const member = leaderboard.message.week[i];

      let ppUserData = listUserPP.find(
        (element) => member.user_uid == element.user_uid
      );
      let userUpdated = listPP_LastUpdated.find(
        (element) => member.user_uid == element.user_uid
      );

      if (userUpdated == undefined) {
        console.log("user to update", member);
        let img;

        await axios
          .get(
            `https://wapi.wizebot.tv/api/avatars/${member.user_name}/sized/300x300`
          )
          .then(
            (res) => (img = "https://" + res.request.host + res.request.path)
          )
          .catch((e) => {
            console.log(e);
            return;
          });

        if (ppUserData == undefined) {
          console.log("member added msg week");
          listUserPP.push({
            user_name: member.user_name,
            user_uid: member.user_uid,
            img,
          });
        } else {
          let index = listUserPP.findIndex(
            (element) => member.user_uid == element.user_uid
          );
          listUserPP[index].img = img;
          console.log("member updated msg week");
        }

        listPP_LastUpdated.push({ user_uid: member.user_uid });
      }
    }

    for (let i = 0; i < leaderboard.message.month.length; i++) {
      const member = leaderboard.message.month[i];

      let ppUserData = listUserPP.find(
        (element) => member.user_uid == element.user_uid
      );
      let userUpdated = listPP_LastUpdated.find(
        (element) => member.user_uid == element.user_uid
      );

      if (userUpdated == undefined) {
        console.log("user to update", member);
        let img;

        await axios
          .get(
            `https://wapi.wizebot.tv/api/avatars/${member.user_name}/sized/300x300`
          )
          .then(
            (res) => (img = "https://" + res.request.host + res.request.path)
          )
          .catch((e) => {
            console.log(e);
            return;
          });

        if (ppUserData == undefined) {
          console.log("member added msg month");
          listUserPP.push({
            user_name: member.user_name,
            user_uid: member.user_uid,
            img,
          });
        } else {
          let index = listUserPP.findIndex(
            (element) => member.user_uid == element.user_uid
          );
          listUserPP[index].img = img;
          console.log("member updated msg month");
        }

        listPP_LastUpdated.push({ user_uid: member.user_uid });
      }
    }

    for (let i = 0; i < leaderboard.message.global.length; i++) {
      const member = leaderboard.message.global[i];

      let ppUserData = listUserPP.find(
        (element) => member.user_uid == element.user_uid
      );
      let userUpdated = listPP_LastUpdated.find(
        (element) => member.user_uid == element.user_uid
      );

      if (userUpdated == undefined) {
        console.log("user to update", member);
        let img;

        await axios
          .get(
            `https://wapi.wizebot.tv/api/avatars/${member.user_name}/sized/300x300`
          )
          .then(
            (res) => (img = "https://" + res.request.host + res.request.path)
          )
          .catch((e) => {
            console.log(e);
            return;
          });

        if (ppUserData == undefined) {
          console.log("member added msg global");
          listUserPP.push({
            user_name: member.user_name,
            user_uid: member.user_uid,
            img,
          });
        } else {
          let index = listUserPP.findIndex(
            (element) => member.user_uid == element.user_uid
          );
          listUserPP[index].img = img;
          console.log("member updated msg global");
        }

        listPP_LastUpdated.push({ user_uid: member.user_uid });
      }
    }

    if (lengthPP < listUserPP.length) {
      fs.writeFile("img.json", JSON.stringify(listUserPP), (err) => {
        if (err) throw err;
        console.log("JSON data is saved.");
      });
    }
  }

  //#endregion

  console.log("Check Finished");
}

getLeaderboard(); //Initialisation

setInterval(() => {
  getLeaderboard(); // Every 5 min Get data and check there is any new user to get his pp.
}, "300000");

setInterval(() => {
  listPP_LastUpdated = []; // reset list of users that we have recently update there pp
}, "3600000");

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
    console.log("validate", token_validation);
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
    console.log("end");
  }


}

app.get("/stream", async (req, res) => {
  await getUserDatas();

  res.render("pages/stream", { user: user_data });
});

app.get("/classement", async (req, res) => {
  await getUserDatas();

  res.render("pages/leaderboard", { user: user_data, listUserPP, leaderboard });
});

app.get("/event", async (req, res) => {
  await getUserDatas();

  res.render("pages/events", { user: user_data });
});

app.get("/planning", async (req, res) => {
  await getUserDatas();

  res.render("pages/planning", { user: user_data });
});

app.post("/revoke", async (req, res) => {
  await axios.post(
    "https://id.twitch.tv/oauth2/revoke",
    new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID,
      token: process.env.GET_TOKEN,
    })
  );
  res.send("Done");
});

app.get("/reseaux", (req, res) => {
  res.render("pages/reseaux");
});

app.listen(process.env.PORT, () =>
  console.log(`Listening at http://localhost:${process.env.PORT}/stream`)
);
