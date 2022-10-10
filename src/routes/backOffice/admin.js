const router = require("express").Router();

let visible = false;

router.get("/events/login", (req, res) => {
  res.render("pages/login", { visible });
  visible = false;
});

router.post("/events/login", (req, res) => {
  let { userName, password } = req.body;
  console.log(req.body);

  if (userName == process.env.ADMIN_ID && password == process.env.ADMIN_PASSWORD) {
    req.session.loggedin = true;
    visible = false;
    res.redirect("/admin/events/editor");
  } else {
    visible = true;
    res.redirect("/admin/events/login");
  }

  res.end();
});

router.get("/events/editor", (req, res) => {
  if (req.session.loggedin) {
    console.log("Editor");
    res.render("pages/editor");
  } else {
    console.log("dommage");
    res.redirect("/admin/events/login");
  }
});

module.exports = router;
