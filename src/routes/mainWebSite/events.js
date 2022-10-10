const router = require("express").Router();
const getEventList = require("../../functions/getEventsList");

router.get("/", async (req, res) => {
  let events = JSON.parse(await getEventList()).filter(
    (element) => new Date(element.launchDate).getTime() < Date.now()
  );

  events.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  console.log(events);

  res.render("pages/events", { events });
});

router.get("/:eventName", async (req, res) => {
  var { eventName } = req.params;
  let listEvent = JSON.parse(await getEventList());
  let event = listEvent.find((e) => e.url_name == eventName);

  if (event != undefined) res.render("pages/eventInfo", { event });
  else res.redirect("/error");
});

module.exports = router;
