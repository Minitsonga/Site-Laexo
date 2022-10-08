const router = require("express").Router();

router.get("/", async (req, res) => {
    res.render("pages/aboutme");
  });

module.exports = router;