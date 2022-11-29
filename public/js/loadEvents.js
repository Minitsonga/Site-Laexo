const holder = document.querySelector("#holder");
const archived = document.querySelector("#archived");
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

events.forEach((list) => {
  const holderEvent = document.createElement("div");
  holderEvent.classList.add("container", "grid", "grid-band");

  const gridInfo = document.createElement("div");
  gridInfo.classList.add("grid-info");

  const gridText = document.createElement("div");
  gridText.classList.add("grid-text");

  let datesData = list.find((item) => item.dates != undefined).dates;
  if (datesData["dateStart"]?.length > 0) {
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.innerHTML = new Date(datesData["dateStart"]).toLocaleDateString(
      "fr-FR",
      options
    );
    gridInfo.appendChild(dateDiv);
  }

  list.forEach((e) => {
    if (e.img?.length > 0) {
      const imgElement = document.createElement("img");
      imgElement.src = "/img/" + e.img;
      imgElement.classList.add("grid-img");
      holderEvent.appendChild(imgElement);
    }

    //#region TEXT GRID IN MIDDLE

    if (e.title?.length > 0) {
      const titleGrid = document.createElement("h2");
      titleGrid.classList.add("title");
      titleGrid.innerHTML = e.title;
      gridText.appendChild(titleGrid);
    }

    if (e.subtitle?.length > 0) {
      const subtitleGrid = document.createElement("div");
      subtitleGrid.classList.add("subtitle");
      subtitleGrid.innerHTML = e.subtitle;
      gridText.appendChild(subtitleGrid);
    }

    //#endregion

    //#region INFO GRID WITH BUTTONS
    if (e.url_name?.length > 0) {
      const buttonSeeMore = document.createElement("button");
      buttonSeeMore.type = "button";
      buttonSeeMore.classList.add("btn", "btn-laexo-light");
      buttonSeeMore.setAttribute("onclick", `location.href+='/${e.url_name}'`);
      buttonSeeMore.innerHTML = "Voir plus";
      gridInfo.appendChild(buttonSeeMore);
    }

    if (e.buttons?.inscription?.length > 0) {
      const buttonInscription = document.createElement("button");
      buttonInscription.type = "button";
      buttonInscription.classList.add("btn", "btn-laexo-light");
      buttonInscription.setAttribute(
        "onclick",
        `window.open('${e.buttons.inscription}', '_blank');`
      );
      buttonInscription.innerHTML = "Inscriptions";
      gridInfo.appendChild(buttonInscription);
    }

    //#endregion
  });

  holderEvent.appendChild(gridText);
  holderEvent.appendChild(gridInfo);
  holder.appendChild(holderEvent);
});

archivedEvents.forEach((list) => {
  const archivedEvent = document.createElement("div");
  archivedEvent.classList.add("container", "grid", "grid-band");

  const gridInfo = document.createElement("div");
  gridInfo.classList.add("grid-info");

  const gridText = document.createElement("div");
  gridText.classList.add("grid-text");

  const dateDiv = document.createElement("div");
  dateDiv.style.opacity = "70%";
  dateDiv.innerHTML = "Évènement terminé";
  gridInfo.appendChild(dateDiv);

  list.forEach((e) => {
    if (e.img?.length > 0) {
      const imgElement = document.createElement("img");
      imgElement.src = "/img/" + e.img;
      imgElement.classList.add("grid-img");
      archivedEvent.appendChild(imgElement);
    }

    //#region TEXT GRID IN MIDDLE

    if (e.title?.length > 0) {
      const titleGrid = document.createElement("h2");
      titleGrid.classList.add("title");
      titleGrid.innerHTML = e.title;
      gridText.appendChild(titleGrid);
    }

    if (e.subtitle?.length > 0) {
      const subtitleGrid = document.createElement("div");
      subtitleGrid.classList.add("subtitle");
      subtitleGrid.innerHTML = e.subtitle;
      gridText.appendChild(subtitleGrid);
    }

    //#endregion

    //#region INFO GRID WITH BUTTONS

    //#endregion
  });

  archivedEvent.appendChild(gridText);
  archivedEvent.appendChild(gridInfo);
  archived.appendChild(archivedEvent);
});
