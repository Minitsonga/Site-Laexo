const router = require("express").Router();

router.get("/", async (req, res) => {
    res.render("pages/planning");
  });
  

module.exports = router;