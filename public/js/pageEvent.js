const holder = document.querySelector("#holder");

var titleDiv = document.createElement("div");
titleDiv.classList.add("title");
titleDiv.innerHTML = cur_event.title;

// var subtitleDiv = document.createElement("div");
// subtitleDiv.classList.add("subtitle");
// subtitleDiv.innerHTML = cur_event.subtitle;

var imgDiv = document.createElement("div");
var imgElement = document.createElement("img");
imgElement.src = "/img/" + cur_event.img;
imgElement.style = "height: auto; width: 50%";
imgDiv.classList.add("pt-3","center");
imgDiv.appendChild(imgElement);

var presentationTitleDiv = document.createElement("div");
presentationTitleDiv.classList.add("description-title");
presentationTitleDiv.innerHTML = "PRESENTATION";

var presentationDiv = document.createElement("div");
presentationDiv.classList.add("description");
presentationDiv.innerHTML = cur_event.presentation;

var deroulementTitleDiv = document.createElement("div");
deroulementTitleDiv.classList.add("description-title");
deroulementTitleDiv.innerHTML = "DEROULEMENT";

var deroulementTextDiv = document.createElement("div");
deroulementTextDiv.classList.add("description");
deroulementTextDiv.innerHTML = cur_event.deroulement;

var inscriptionButton = document.createElement("button");
inscriptionButton.type = "button";
inscriptionButton.classList.add("btn", "btn-laexo");
inscriptionButton.setAttribute("onclick", `location.href+='/${e.inscription}'`);
inscriptionButton.innerHTML = "S'inscrire";

var rulesButton = document.createElement("button");
rulesButton.type = "button";
rulesButton.classList.add("btn", "btn-laexo");
rulesButton.setAttribute("onclick", `location.href+='/${e.reglement}'`);
rulesButton.innerHTML = "Règlement";

holder.appendChild(titleDiv);
// holder.appendChild(subtitleDiv);
holder.appendChild(imgDiv);
holder.appendChild(presentationTitleDiv);
holder.appendChild(presentationDiv);
holder.appendChild(deroulementTitleDiv);
holder.appendChild(deroulementTextDiv);
