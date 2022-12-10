const router = require("express").Router();
const getEventsList = require("../../functions/getEventsList");

router.get("/", async (req, res) => {
  let events = JSON.parse(await getEventsList());
  let result = [];
  let datesList = [];
  let archivedEvents = [];

  events.forEach((event) => {
    if (event.find((item) => item.dates != undefined) == undefined) return; // if event doesn't have dates => return
    // if there is dates check if any of them is invalid (we need all of them to be valid)

    let { dates } = event.find((item) => item.dates != undefined);

    if (
      isNaN(new Date(dates["dateStart"]).getTime()) ||
      isNaN(new Date(dates["dateEnd"]).getTime()) ||
      isNaN(new Date(dates["launchDate"]).getTime())
    )
      return;

    datesList.push(dates["dateStart"]);

    if (new Date(dates["launchDate"]).getTime() < Date.now()) {
      if (dates["dateEnd"] == undefined) return;

      if (new Date(dates["dateEnd"]).getTime() <= Date.now()) {
        archivedEvents.push(event);
      } else {
        result.push(event);
      }
    }
  });

  datesList.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  let sortedEvents = [];
  let sortedArchivedEvents = [];

  datesList.forEach((cur_date) => {
    result.forEach((element) => {
      let { dates } = element.find((item) => item.dates != undefined);
      if (cur_date === dates["dateStart"]) {
        sortedEvents.push(element);
      }
    });

    archivedEvents.forEach((archivedElement) => {
      let { dates } = archivedElement.find((item) => item.dates != undefined);
      if (cur_date === dates["dateStart"]) {
        sortedArchivedEvents.push(archivedElement);
      }
    });
  });
  res.render("pages/events", {
    events: sortedEvents,
    archivedEvents: sortedArchivedEvents,
  });
});

router.get("/:eventName", async (req, res) => {
  var { eventName } = req.params;

  let listEvent = JSON.parse(await getEventsList());

  let event = [];
  listEvent.every((element) => {
    if (eventName === element[0]["url_name"]) {
      event = element;
      return false;
    }
    return true;
  });

  console.log(event);

  if (event.length > 0) res.render("pages/eventInfo", { event });
  else res.redirect("/error");
});

module.exports = router;
