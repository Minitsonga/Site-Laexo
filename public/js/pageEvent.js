const holder = document.querySelector("#holder");

if (cur_event.title.length > 0) {
  var titleDiv = document.createElement("h1");
  titleDiv.classList.add("title");
  titleDiv.innerHTML = cur_event.title;
  holder.appendChild(titleDiv);
}
// if (cur_event.subtitle.length > 0) {
// var subtitleDiv = document.createElement("div");
// subtitleDiv.classList.add("subtitle");
// subtitleDiv.innerHTML = cur_event.subtitle;
// holder.appendChild(subtitleDiv);
// }

if (cur_event.img.length > 0) {
  var imgDiv = document.createElement("div");
  var imgElement = document.createElement("img");
  imgElement.src = "/img/" + cur_event.band_img;
  imgDiv.classList.add("pt-3", "center");
  imgDiv.appendChild(imgElement);
  holder.appendChild(imgDiv);
}

var buttonHolder = document.createElement("div");
buttonHolder.classList.add("buttons-holder");
if (cur_event.inscription.length > 0) {
  var inscriptionButton = document.createElement("button");
  inscriptionButton.type = "button";
  inscriptionButton.classList.add("btn", "btn-event", "btn-laexo-light");
  inscriptionButton.setAttribute(
    "onclick",
    `location.href+='/${cur_event.inscription}'`
  );
  inscriptionButton.innerHTML = "Inscriptions";
  buttonHolder.appendChild(inscriptionButton);
}

if (cur_event.reglement.length > 0) {
  var rulesButton = document.createElement("button");
  rulesButton.type = "button";
  rulesButton.classList.add("btn", "btn-event", "btn-laexo-rules");
  rulesButton.setAttribute(
    "onclick",
    `location.href+='/${cur_event.reglement}'`
  );
  rulesButton.innerHTML = "Règlement";
  buttonHolder.appendChild(rulesButton);
}

holder.appendChild(buttonHolder);

if (cur_event.presentation.length > 0) {
  var presentationTitleDiv = document.createElement("h3");
  presentationTitleDiv.classList.add("description-title");
  presentationTitleDiv.innerHTML = "PRESENTATION";

  var presentationDiv = document.createElement("div");
  presentationDiv.classList.add("description");
  presentationDiv.innerHTML = cur_event.presentation;
  holder.appendChild(presentationTitleDiv);
  holder.appendChild(presentationDiv);
}

holder.appendChild(document.createElement("br"));

if (cur_event.deroulement.length > 0) {
  var deroulementTitleDiv = document.createElement("h3");
  deroulementTitleDiv.classList.add("description-title");
  deroulementTitleDiv.innerHTML = "DEROULEMENT";

  var deroulementTextDiv = document.createElement("div");
  deroulementTextDiv.classList.add("description");
  deroulementTextDiv.innerHTML = cur_event.deroulement;
  holder.appendChild(deroulementTitleDiv);
  holder.appendChild(deroulementTextDiv);
}
