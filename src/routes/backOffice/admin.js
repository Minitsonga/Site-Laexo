const router = require("express").Router();

router.get("/events/login", (req,res) =>{
    res.render("pages/login");
});

module.exports = router;