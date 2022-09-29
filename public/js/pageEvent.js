const holder = document.querySelector("#holder");

var titleDiv = document.createElement("div");
titleDiv.classList.add("title");
titleDiv.innerHTML = title;

var subtitleDiv = document.createElement("div");
subtitleDiv.classList.add("subtitle");
subtitleDiv.innerHTML = subtitle;

var imgDiv = document.createElement("div");
var imgElement = document.createElement("img");
imgElement.src = "/img/" + img;
imgElement.style = "height: auto; width: 50%";
imgDiv.classList.add("pt-3");
imgDiv.classList.add("center");
imgDiv.appendChild(imgElement);


var descriptionTitleDiv = document.createElement("div");
descriptionTitleDiv.classList.add("description-title");
descriptionTitleDiv.innerHTML = "DESCRIPTION";

var descriptionDiv = document.createElement("div");
descriptionDiv.classList.add("description");
descriptionDiv.innerHTML = description;

holder.appendChild(titleDiv);
holder.appendChild(subtitleDiv);
holder.appendChild(imgDiv);
holder.appendChild(descriptionTitleDiv);
holder.appendChild(descriptionDiv);
