const router = require("express").Router();
const getEventList = require("../../functions/getEventsList");

router.get("/", async (req, res) => {
  let events = JSON.parse(await getEventList());
  let result = [];
  events.forEach((e) => {
    e.forEach((item) => {
      if (new Date(item["launchDate"]).getTime() < Date.now()) result.push(e);
    });
  });
  events.forEach((e) => {
    e.forEach((item) => {
      if (new Date(item["launchDate"]).getTime() < Date.now()) result.push(e);
    });
  });

  //Faire marcher le events car element["truc"] marche pas (la il faut sort la liste result)

  // events.sort((a, b) => {
  //   return new Date(a.date) - new Date(b.date);
  // });

  // let events = [];
  // datas.forEach((e) => {
  //   console.log(e);
  //   if (new Date(e["launchDate"]).getTime() < Date.now()) events.push(e);
  // });

  events.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  // new Date(element["launchDate"]).getTime() < Date.now()

  console.log(result);

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
