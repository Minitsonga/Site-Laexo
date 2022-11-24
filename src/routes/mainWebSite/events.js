const router = require("express").Router();
const getEventsList = require("../../functions/getEventsList");

router.get("/", async (req, res) => {
  let events = JSON.parse(await getEventsList());
  let result = [];
  let dates = [];
  let archivedEvents = [];
  events.forEach((event) => {
    dates.push(event.find((a) => a["dateStart"])?.dateStart);
    event.forEach((item) => {
      if (new Date(item["launchDate"]).getTime() < Date.now()) {
        event.forEach((element) => {
          if (element["dateEnd"] == undefined) return;

          if (
            new Date(element["dateEnd"]).getTime() + 604800000 <=
            Date.now()
          ) {
            archivedEvents.push(event);
          } else {
            result.push(event);
          }
        });
      }
    });
  });

  console.log(result);

  console.log(dates);

  dates.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  let sortedEvents = [];
  let sortedArchivedEvents = [];

  dates.forEach((date) => {
    result.forEach((element) => {
      if (date === element.find((a) => a["dateStart"])?.dateStart) {
        sortedEvents.push(element);
      }
    });

    archivedEvents.forEach((element) => {
      if (date === element.find((a) => a["dateStart"])?.dateStart) {
        sortedArchivedEvents.push(element);
      }
    });
  });

  console.log(sortedEvents);

  res.render("pages/events", {
    events: sortedEvents,
    archivedEvents: sortedArchivedEvents,
  });
});

router.get("/:eventName", async (req, res) => {
  var { eventName } = req.params;

  let listEvent = JSON.parse(await getEventsList());

  let event = [];
  listEvent.forEach((element) => {
    if (eventName === element.find((e) => e["url_name"])?.url_name) {
      event = element;
    }
  });

  console.log(event);

  if (event != undefined) res.render("pages/eventInfo", { event });
  else res.redirect("/error");
});

module.exports = router;
