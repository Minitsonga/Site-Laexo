const router = require("express").Router();
let {leaderboard, listUserPP} = require("../../functions/getLeaderboard");

router.get("/", async (req, res) => {
    res.render("pages/leaderboard", {listUserPP, leaderboard });
  });

module.exports = router;