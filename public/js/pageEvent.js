const holder = document.querySelector("#holder");

cur_event.forEach((element) => {
  if (element["title"]?.length > 0) {
    var titleDiv = document.createElement("h1");
    titleDiv.classList.add("title");
    titleDiv.innerHTML = element["title"];
    holder.appendChild(titleDiv);
  }

  if (element["subtitle"]?.length > 0) {
    var subtitleDiv = document.createElement("div");
    subtitleDiv.classList.add("subtitle");
    subtitleDiv.innerHTML = element["subtitle"];
    holder.appendChild(subtitleDiv);
  }

  if (element["band_img"]?.length > 0) {
    var imgDiv = document.createElement("div");
    var imgElement = document.createElement("img");
    imgElement.src = "/img/" + element["band_img"];
    imgDiv.classList.add("pt-3", "center");
    imgDiv.appendChild(imgElement);
    holder.appendChild(imgDiv);
    holder.appendChild(document.createElement("br"));
  }

  if (element["inscription"]?.length > 0 || element["reglement"]?.length > 0) {
    var buttonHolder = document.createElement("div");
    buttonHolder.classList.add("buttons-holder");

    if (element["inscription"]?.length > 0) {
      var inscriptionButton = document.createElement("button");
      inscriptionButton.type = "button";
      inscriptionButton.classList.add("btn", "btn-event", "btn-laexo-light");
      inscriptionButton.setAttribute(
        "onclick",
        `window.open('${element["inscription"]}', '_blank');`
      );
      inscriptionButton.innerHTML = "Inscriptions";
      buttonHolder.appendChild(inscriptionButton);
    }

    if (element["reglement"]?.length > 0) {
      var rulesButton = document.createElement("button");
      rulesButton.type = "button";
      rulesButton.classList.add("btn", "btn-event", "btn-laexo-rules");
      rulesButton.setAttribute(
        "onclick",
        `window.open('${element["reglement"]}', '_blank');`
      );
      rulesButton.innerHTML = "Règlement";
      buttonHolder.appendChild(rulesButton);
    }

    holder.appendChild(buttonHolder);
  }

  if (element["alerte_msg"]?.length > 0) {
    var alerteDiv = document.createElement("div");
    var alerteText = document.createElement("a");
    alerteDiv.role = "alert";
    alerteDiv.classList.add("alert", "text-center", "fw-bold");
    alerteText.classList.add("alert-link");
    alerteText.innerHTML = element["alerte_msg"];
    //alerteText.href = element["alerte_msg"];
    alerteText.target = "_blank";

    alerteDiv.innerHTML = element["alerte_msg"] + "<br>Discord : ";
    alerteDiv.appendChild(alerteText);
    holder.appendChild(alerteDiv);
  }

  if (element["small_Title"]?.length > 0) {
    var presentationTitleDiv = document.createElement("h3");
    presentationTitleDiv.classList.add("description-title");
    presentationTitleDiv.innerHTML = element["small_Title"];
    holder.appendChild(presentationTitleDiv);
    holder.appendChild(document.createElement("br"));
  }

  if (element["description"]?.length > 0) {
    var deroulementTextDiv = document.createElement("div");
    deroulementTextDiv.classList.add("description");
    deroulementTextDiv.innerHTML = element["description"];
    holder.appendChild(deroulementTextDiv);
    holder.appendChild(document.createElement("br"));
  }
});
