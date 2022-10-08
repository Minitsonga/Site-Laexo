const router = require("express").Router();

router.get("/events/editor", (req, res) => {
  res.render("pages/editor");
});

module.exports = router;
