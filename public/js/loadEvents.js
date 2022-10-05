var holder = document.querySelector("#holder");

events.forEach((e) => {
  var holderEvent = document.createElement("div");
  holderEvent.classList.add("container", "grid", "grid-band");

  if (e.img.length > 0) {
    var imgElement = document.createElement("img");
    imgElement.src = "/img/" + e.img;
    imgElement.classList.add("grid-img");
    holderEvent.appendChild(imgElement);
  }

  //#region TEXT GRID IN MIDDLE

  var gridText = document.createElement("div");
  gridText.classList.add("grid-text");

  if (e.title.length > 0) {
    var titleGrid = document.createElement("h2");
    titleGrid.classList.add("title");
    titleGrid.innerHTML = e.title;
    gridText.appendChild(titleGrid);
  }

  if (e.subtitle.length > 0) {
    var subtitleGrid = document.createElement("div");
    subtitleGrid.classList.add("subtitle");
    subtitleGrid.innerHTML = e.subtitle;
    gridText.appendChild(subtitleGrid);
  }

  //#endregion

  //#region INFO GRID WITH BUTTONS

  var gridInfo = document.createElement("div");
  gridInfo.classList.add("grid-info");

  if (e.date.length > 0) {
    var dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.innerHTML = e.date;
    gridInfo.appendChild(dateDiv);
  }

  if (e.title.length > 0) {
    var buttonSeeMore = document.createElement("button");
    buttonSeeMore.type = "button";
    buttonSeeMore.classList.add("btn", "btn-laexo-light");
    buttonSeeMore.setAttribute("onclick", `location.href+='/${e.url_name}'`);
    buttonSeeMore.innerHTML = "Voir plus";
    gridInfo.appendChild(buttonSeeMore);
  }

  if (e.inscription.length > 0) {
    var buttonInscription = document.createElement("button");
    buttonInscription.type = "button";
    buttonInscription.classList.add("btn", "btn-laexo-light");
    buttonInscription.setAttribute(
      "onclick",
      `location.href+='/${e.inscription}'`
    );
    buttonInscription.innerHTML = "Inscriptions";
    gridInfo.appendChild(buttonInscription);
  }

  //#endregion

  
  holderEvent.appendChild(gridText);
  holderEvent.appendChild(gridInfo);
  holder.appendChild(holderEvent);
});
