const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("pages/stream");
});

module.exports = router;
