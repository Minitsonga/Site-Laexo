const router = require("express").Router();
const open = require("open");
const multer = require("multer");

let visible = false;

router.get("/login", (req, res) => {
  res.render("pages/login", { visible });
  visible = false;
});

router.post("/login", (req, res) => {
  let { userName, password } = req.body;
  console.log(req.body);

  if (
    userName == process.env.ADMIN_ID &&
    password == process.env.ADMIN_PASSWORD
  ) {
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

  res.render("pages/editor");
  // } else {
  //   console.log("dommage");
  //   res.redirect("/admin/login");
  // }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const cpUpload = upload.fields([{ name: "img"},{name: "band_img" }]);

router.post("/editor/preview", cpUpload, async (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  console.log(req.files);

  for(let image in req.files)
  {
    //data.push({});
  }

  //await open("http://localhost:3000/admin/editor/preview", {data});
  res.send("Ok");
});

router.get("/editor/preview", (req, res) => {
  //res.render("pages/preview")
});

module.exports = router;
