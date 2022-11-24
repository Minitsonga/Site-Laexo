const router = require("express").Router();
const open = require("open");
const multer = require("multer");
const fs = require("fs");
const getEventsList = require("../../functions/getEventsList");
const e = require("express");
const { ok } = require("assert");

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

router.get("/editor", async (req, res) => {
  //if (req.session.loggedin) {
  const dataEvents = JSON.parse(await getEventsList());
  let data = [];
  dataEvents.forEach((element) => {
    let url_name = "";
    let title = "";
    element.forEach((e) => {
      if (e["url_name"]?.length > 0) url_name = e["url_name"];
      if (e["title"]?.length > 0) title = e["title"];
    });

    data.push({ url_name, title });
  });

  console.log(data);

  res.render("pages/editor", { data });
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

const planningStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype != "image/png") return null;
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + ".png");
  },
});

const upload = multer({ storage: storage });

const cpUpload = upload.fields([{ name: "img" }, { name: "band_img" }]);
let data = [];
router.post("/editor/preview/images", cpUpload, async (req, res) => {
  res.send("Ok");
});

router.post("/editor/preview", async (req, res) => {
  data = JSON.parse(JSON.stringify(req.body));

  data[0]["url_name"] = data[0]["url_name"].split(" ").join("");

  if (data[0]["url_name"].length <= 2) return res.send("Pas bon");

  await open("http://localhost:3000/admin/editor/preview");
  res.send("Ok");
});

router.get("/editor/preview", (req, res) => {
  if (data.length <= 0) return res.redirect("/admin/editor");
  console.log(data);
  res.render("pages/preview", { data });
  data = [];
});

router.post("/editor", async (req, res) => {
  const savedData = JSON.parse(await getEventsList());
  console.log(savedData);
  data = JSON.parse(JSON.stringify(req.body));

  if (data.value != undefined) {
    let founded = false;
    savedData.forEach((element) => {
      element.forEach((e) => {
        if (e["url_name"] == data.value) {
          savedData.pop(element);
          founded = true;
        }
      });
    });

    if(!founded) return res.sendStatus(404);
  }

  if (data.length > 0) {
    data[0]["url_name"] = data[0]["url_name"].split(" ").join("");

    if (data[0]["url_name"].length <= 2) return res.send("Pas bon");

    savedData.push(data);
  }

  fs.writeFile("eventList2.json", JSON.stringify(savedData), (err) => {
    if (err) throw err;
    console.log("JSON data editor is saved.");
  });

  res.send("Ok");
});

const planningUpload = multer({ storage: planningStorage });
const plannings = planningUpload.fields([
  { name: "planning" },
  { name: "planning2" },
]);
router.post("/editor/planning", plannings, async (req, res) => {
  console.log(req.files);
  await open("http://localhost:3000/planning");
  res.send("Ok");
});

module.exports = router;
