const router = require("express").Router();
const oauth = require("./oauth");
const stream = require("./mainWebSite/stream");
const classement = require("./mainWebSite/classement");
const events = require("./mainWebSite/events");
const planning = require("./mainWebSite/planning");
const conception = require("./mainWebSite/conception");
const aboutme = require("./mainWebSite/quisuisje");

const admin = require("./backOffice/admin");

router.use("/oauth", oauth);
router.use("/stream", stream);
router.use("/classement", classement);
router.use("/events", events);
router.use("/planning", planning);
router.use("/conception", conception);
router.use("/quisuisje", aboutme);

//router.use('/admin', admin);

module.exports = router;
