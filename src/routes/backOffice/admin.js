const router = require("express").Router();

router.get("/events/login", (req,res) =>{
    let visible = false;
    res.render("pages/login", {visible});
});

router.post("/events/login", (req,res) =>{
    let {userName, password} = req.body;
    console.log(req.body);

    if(userName == process.env.ADMIN_ID && password == process.env.ADMIN_PASSWORD)
    {
        console.log("C bon");
        res.redirect("/admin/events/editor");
    }else
    {
        console.log("pas bon");
        res.sendStatus(400);
        
    }

});

module.exports = router;