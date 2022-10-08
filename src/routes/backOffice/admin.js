const router = require("express").Router();

router.get("/events/login", (req,res) =>{
   
    console.log(req.session.loggedin);
    res.render("pages/login");
});

router.post("/events/login", (req,res) =>{
    let {userName, password} = req.body;
    console.log(req.body);

    if(userName == process.env.ADMIN_ID && password == process.env.ADMIN_PASSWORD)
    {
        console.log("C bon");
        req.session.loggedin = true;
        res.redirect("/admin/events/login");
    }else
    {
        console.log("pas bon");
        res.sendStatus(400);
        
    }

});

module.exports = router;