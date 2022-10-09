const router = require("express").Router();
const fs = require("fs");
const axios = require("axios").default;

let listUserPP = [];
let listPP_LastUpdated = [];
let leaderboard = {
  rank: [],
  uptime: { week: [], month: [], global: [] },
  message: { week: [], month: [], global: [] },
};

async function getLeaderboard() {
  fs.readFile("img.json", (err, data) => {
    if (err) throw err;
    listUserPP = JSON.parse(data);
    console.log("load Image");
  });

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

  if (listPP_LastUpdated.length <= 0) {
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
    console.log(leaderboard.uptime.week);
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

getLeaderboard();

setInterval(() => {
  //getLeaderboard(); // Every 5 min Get data and check there is any new user to get his pp.
}, "300000");

setInterval(() => {
  listPP_LastUpdated = []; // reset list of users that we have recently update there pp
}, "3600000");


router.get("/", async (req, res) => {
  console.log(listUserPP);
  console.log(leaderboard);
  res.render("pages/leaderboard", { listUserPP, leaderboard });
});

module.exports = router;
