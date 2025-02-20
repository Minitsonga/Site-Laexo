const router = require("express").Router();
const open = require("open");
const multer = require("multer");
const fs = require("fs");
const getEventsList = require("../../functions/getEventsList");

let visible = false;
let dataFormPreview = [];

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
    req.session.loggedIn = true;
    visible = false;
    res.redirect("/admin/editor");
  } else {
    visible = true;
    res.redirect("/admin/login");
  }

  res.end();
});

router.get("/editor", async (req, res) => {
  if (req.session.loggedIn) {
    const dataEvents = JSON.parse(await getEventsList());
    let eventsInfos = [];
    dataEvents.forEach((element, i) => {
      let title = "";
      element.forEach((e) => {
        if (element[0]["url_name"]?.length > 0) {
          if (e["title"]?.length > 0) title = e["title"];
        }
      });

      eventsInfos.push({ id: i, title });
    });

    res.render("pages/editor", { data: eventsInfos });
  } else {
    res.redirect("/admin/login");
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //console.log(file);
    cb(null, file.originalname.replace(/ /g, ""));
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

router.post("/editor/preview/images", cpUpload, async (req, res) => {
  res.send("Ok");
});

router.post("/editor/preview", async (req, res) => {
  dataFormPreview = JSON.parse(JSON.stringify(req.body));

  dataFormPreview[0]["url_name"] = dataFormPreview[0]["url_name"].replace(
    / /g,
    ""
  ); // Removing space

  if (dataFormPreview[0]["url_name"].length <= 2) return res.sendStatus(404);

  await open("http://localhost:3000/admin/editor/preview");
  res.send("Ok");
});

router.get("/editor/preview", (req, res) => {
  if (dataFormPreview.length <= 0) return res.redirect("/admin/editor");
  console.log("Preview loading");
  res.render("pages/preview", { data: dataFormPreview });
  dataFormPreview = [];
});

router.post("/editor", async (req, res) => {
  const savedData = JSON.parse(await getEventsList());

  let req_Data = JSON.parse(JSON.stringify(req.body));

  if (req_Data.value != undefined) {
    // if req_Data the id of an event)
    if (!savedData[req_Data.value]) return res.sendStatus(404);
    savedData.pop(savedData[req_Data.value]);
  }

  let canSend = true;

  if (req_Data.length > 0) {
    // if req_Data is a list of item (= event)
    req_Data[0]["url_name"] = req_Data[0]["url_name"].replace(/ /g, "");

    if (req_Data[0]["url_name"].length <= 2) return res.sendStatus(403);

    savedData.every((element, i) => {
      if (element[0]["url_name"] === req_Data[0]["url_name"]) {
        canSend = false;
        res.sendStatus(403);
        return false;
      }

      return true;
    });

    if (canSend) savedData.push(req_Data);
  }

  if (canSend) {
    fs.writeFile("eventList2.json", JSON.stringify(savedData), (err) => {
      if (err) throw err;
      console.log("JSON data editor is saved.");
    });
    res.send("Ok");
  }
});

router.post("/editor/updateEvent", async (req, res) => {
  let req_Data = JSON.parse(JSON.stringify(req.body));

  const savedData = JSON.parse(await getEventsList());
  let hasUpdated = false;

  if (req_Data.length <= 0) return res.sendStatus(403);

  // if req_Data is a list of item (= event)
  req_Data[0]["url_name"] = req_Data[0]["url_name"].split(" ").join("");

  if (req_Data[0]["url_name"].length <= 2) return res.sendStatus(402);

  const updatedEvents = savedData;

  savedData.every((element, i) => {
    if (element[0]["url_name"] === req_Data[0]["url_name"]) {
      if (hasUpdated) return res.sendStatus(404);
      updatedEvents[i] = req_Data;
      hasUpdated = true;
      return false;
    }

    return true;
  });

  if (!hasUpdated) return res.sendStatus(404);
  fs.writeFile("eventList2.json", JSON.stringify(updatedEvents), (err) => {
    if (err) throw err;
    console.log("JSON data editor is saved.");
  });
  res.send("Ok");
});

router.post("/editor/getevent", async (req, res) => {
  const eventData = JSON.parse(await getEventsList());

  let reqEvent = JSON.parse(JSON.stringify(req.body));

  if (reqEvent.value != undefined) {
    // if data the id of an event)
    //console.log(eventData[reqEvent.value]);
    res.send(eventData[reqEvent.value]);
  }
});

const planningUpload = multer({ storage: planningStorage });
const plannings = planningUpload.fields([
  { name: "planning" },
  { name: "planning2" },
]);
router.post("/editor/planning", plannings, async (req, res) => {
  await open("http://localhost:3000/planning");
  res.send("Ok");
});

module.exports = router;
