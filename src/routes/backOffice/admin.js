const router = require("express").Router();

let visible = false;

router.get("/login", (req, res) => {
  res.render("pages/login", { visible });
  visible = false;
});

router.post("/login", (req, res) => {
  let { userName, password } = req.body;
  console.log(req.body);

  if (userName == process.env.ADMIN_ID && password == process.env.ADMIN_PASSWORD) {
    req.session.loggedin = true;
    visible = false;
    res.redirect("/admin/editor");
  } else {
    visible = true;
    res.redirect("/admin/login");
  }

  res.end();
});

router.get("/editor", (req, res) => {
  //if (req.session.loggedin) {
    console.log("Editor");
    res.render("pages/editor");
  // } else {
  //   console.log("dommage");
  //   res.redirect("/admin/login");
  // }
});

module.exports = router;
