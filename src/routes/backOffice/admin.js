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

const cpUpload = upload.fields([{ name: "img" }, { name: "band_img" }]);
let data = [];
router.post("/editor/preview", cpUpload, async (req, res) => {
  data = JSON.parse(JSON.stringify(req.body));
  data.url_name = data.url_name.split(" ").join("");

  if (data.url_name.length <= 2) return res.send("Ok");

  if (req.files["img"] != undefined) data.img = req.files["img"][0].path;
  if (req.files["band_img"] != undefined) {
    data.band_img = [];
    req.files["band_img"].forEach((element) => {
      data.band_img.push(element.path);
    });
  }

  console.log(data);

  await open("http://localhost:3000/admin/editor/preview");
  res.send("Ok");
});

router.get("/editor/preview", (req, res) => {
  console.log(data);
  if (data.length <= 0) return res.redirect("/admin/editor");
  res.render("pages/preview", { data });
  //TODO afficher la page avec script js 
  data = [];
});

module.exports = router;
