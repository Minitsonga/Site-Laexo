const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("pages/conception");
});
  
module.exports = router;