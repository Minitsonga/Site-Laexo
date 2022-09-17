require("dotenv").config();
const router = require("express").Router();

router.get("/twitch", (req, res) => {
  res.redirect(
    `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user%3Aedit&force_verify=true`
  );
});

router.get("/twitch/redirect", (req, res) => {
  res.render("pages/twitch_oauth");
});

router.post("/twitch/redirect", (req, res) => {
  process.env.GET_TOKEN = req.body.access_token;
  res.send("Ok");
});

module.exports = router;
