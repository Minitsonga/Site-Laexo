var holder = document.querySelector("#holder");

events.forEach((e) => {
  var holderEvent = document.createElement("div");
  holderEvent.classList.add("container", "grid", "grid-band");

  var imgElement = document.createElement("img");
  imgElement.src = "/img/" + e.img;
  imgElement.classList.add("grid-img");
  imgElement.width = "350";
  imgElement.height = "150";

  //#region TEXT GRID IN MIDDLE

  var gridText = document.createElement("div");
  gridText.classList.add("grid-text");

  var titleGrid = document.createElement("h2");
  titleGrid.classList.add("title");
  titleGrid.innerHTML = e.title;

  var subtitleGrid = document.createElement("div");
  subtitleGrid.classList.add("subtitle");
  subtitleGrid.innerHTML = e.subtitle;

  gridText.appendChild(titleGrid);
  gridText.appendChild(subtitleGrid);

  //#endregion

  //#region INFO GRID WITH BUTTONS

  var gridInfo = document.createElement("div");
  gridInfo.classList.add("grid-info");

  var dateDiv = document.createElement("div");
  dateDiv.classList.add("date");
  dateDiv.innerHTML = e.date;

  var buttonSeeMore = document.createElement("button");
  buttonSeeMore.type = "button";
  buttonSeeMore.classList.add("btn", "btn-laexo");
  buttonSeeMore.setAttribute("onclick", `location.href+='/${e.title}'`);
  buttonSeeMore.innerHTML = "Voir plus";

  var buttonInscription = document.createElement("button");
  buttonInscription.type = "button";
  buttonInscription.classList.add("btn", "btn-laexo");
  buttonInscription.setAttribute("onclick", `location.href+='/${e.inscription}'`);
  buttonInscription.innerHTML = "Inscriptions";

  gridInfo.appendChild(dateDiv);
  gridInfo.appendChild(buttonSeeMore);
  gridInfo.appendChild(buttonInscription);

  //#endregion

  holderEvent.appendChild(imgElement);
  holderEvent.appendChild(gridText);
  holderEvent.appendChild(gridInfo);

  holder.appendChild(holderEvent);
});
