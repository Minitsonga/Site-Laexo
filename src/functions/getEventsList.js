const { promises: fes } = require("fs");

async function getEventsList() {
    const encoding = "utf-8";
    return fes.readFile("eventList2.json", { encoding });
  }
  
  module.exports = getEventsList;