const holder = document.querySelector("#holder");

cur_event.forEach((element) => {
  if (element["title"]?.length > 0) {
    var titleDiv = document.createElement("h1");
    titleDiv.classList.add("title");
    titleDiv.innerHTML = element["title"];
    holder.appendChild(titleDiv);
  }

  // if (element["subtitle"]?.length > 0) {
  //   var subtitleDiv = document.createElement("div");
  //   subtitleDiv.classList.add("subtitle");
  //   subtitleDiv.innerHTML = element["subtitle"];
  //   holder.appendChild(subtitleDiv);
  // }

  if (element["band_img"]?.length > 0) {
    var imgDiv = document.createElement("div");
    var imgElement = document.createElement("img");
    imgElement.src = "/img/" + element["band_img"];
    imgDiv.classList.add("pt-3", "center");
    imgDiv.appendChild(imgElement);
    holder.appendChild(imgDiv);
    holder.appendChild(document.createElement("br"));
  }

  if (element["buttons"]) {
    //console.log(element["buttons"]);
    var buttonHolder = document.createElement("div");
    buttonHolder.classList.add("buttons-holder");

    if (element["buttons"]["inscription"]?.length > 0) {
      var inscriptionButton = document.createElement("button");
      inscriptionButton.type = "button";

      if (
        element["buttons"]["reglement"]?.length === undefined ||
        element["buttons"]["reglement"]?.length <= 0
      ) {
        inscriptionButton.style.margin = "auto";
      }
      inscriptionButton.classList.add("btn", "btn-event", "btn-laexo-light");
      inscriptionButton.setAttribute(
        "onclick",
        `window.open('${element["buttons"]["inscription"]}', '_blank');`
      );
      inscriptionButton.innerHTML = "Inscriptions";
      buttonHolder.appendChild(inscriptionButton);
    }

    if (element["buttons"]["reglement"]?.length > 0) {
      var rulesButton = document.createElement("button");
      rulesButton.type = "button";

      if (
        element["buttons"]["inscription"]?.length === undefined ||
        element["buttons"]["inscription"]?.length <= 0
      ) {
        rulesButton.style.margin = "auto";
      }

      rulesButton.classList.add("btn", "btn-event", "btn-laexo-rules");
      rulesButton.setAttribute(
        "onclick",
        `window.open('${element["buttons"]["reglement"]}', '_blank');`
      );
      rulesButton.innerHTML = "Règlement";
      buttonHolder.appendChild(rulesButton);
    }

    holder.appendChild(buttonHolder);
  }

  if (element["customBtn"] != undefined) {
    var buttonHolder = document.createElement("div");
    buttonHolder.classList.add("buttons-holder");
    //console.log(element["customBtn"]["url"].length);
    if (
      element["customBtn"]["name"].length > 0 &&
      element["customBtn"]["url"].length > 0
    ) {
      var customButton = document.createElement("button");
      customButton.type = "button";
      customButton.style.margin = "auto";
      customButton.style.color = element["customBtn"]["colorText"];
      customButton.style.backgroundColor = element["customBtn"]["colorBg"];
      customButton.style.outline = element["customBtn"]["colorBg"];

      customButton.classList.add("btn", "btn-event");
      customButton.setAttribute(
        "onclick",
        `window.open('${element["customBtn"]["url"]}', '_blank');`
      );
      customButton.innerHTML = element["customBtn"]["name"];
      buttonHolder.appendChild(customButton);
    }

    holder.appendChild(buttonHolder);
  }

  if (element["alerte_msg"]?.length > 0) {
    var alerteDiv = document.createElement("div");
    var alerteText = document.createElement("a");
    alerteDiv.role = "alert";
    alerteDiv.classList.add("alert", "text-center", "fw-bold");

    alerteDiv.innerHTML = formatText(element["alerte_msg"]);
    alerteDiv.appendChild(alerteText);
    holder.appendChild(alerteDiv);
  }

  if (element["small_Title"]?.length > 0) {
    var presentationTitleDiv = document.createElement("h3");
    presentationTitleDiv.classList.add("description-title");
    presentationTitleDiv.innerHTML = element["small_Title"];
    holder.appendChild(presentationTitleDiv);
  }

  if (element["description"]?.length > 0) {
    var deroulementTextDiv = document.createElement("div");
    deroulementTextDiv.classList.add("description");

    deroulementTextDiv.innerHTML = formatText(element["description"]);
    holder.appendChild(deroulementTextDiv);
    holder.appendChild(document.createElement("br"));
  }
});

function formatText(text) {
  let paragraphe = text;

  //#region Handling dark blue links
  let links = Array.from(paragraphe.matchAll(/\[(?<content>[^\[\]]+)\]/g)).map(
    ({ groups: { content } }) => content
  );

  links.forEach((e) => {
    if (paragraphe.match(/\[(.*?)\]/) === undefined) return;
    if (paragraphe.match(/\[(.*?)\]/)[1] === e) {
      paragraphe = paragraphe.replace(
        paragraphe.match(/\[(.*?)\]/)[0],
        `<a class="alert-link" href="${e}"> ${e}</a>`
      );
    }
  });
  //#endregion

  //#region Handling light blue text
  let blueText = Array.from(
    paragraphe.matchAll(/\{(?<content>[^\{\}]+)\}/g)
  ).map(({ groups: { content } }) => content);

  blueText.forEach((e) => {
    if (paragraphe.match(/\{(.*?)\}/) === undefined) return;
    if (paragraphe.match(/\{(.*?)\}/)[1] === e) {
      paragraphe = paragraphe.replace(
        paragraphe.match(/\{(.*?)\}/)[0],
        `<span> ${e}</span>`
      );
    }
  });
  //#endregion

  return paragraphe;
}
