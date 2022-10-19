const select = document.querySelector("#floatingSelectGrid");

let prev_targetID;
let prev_value;

let targetID = select.options[select.selectedIndex].getAttribute("for");
let value = select.options[select.selectedIndex].value;

if (prev_value != undefined) {
  ToggleElement(prev_targetID, true);
}

if (prev_value != value) {
  let elementTarget = ToggleElement(targetID, false);
  SetupElement(value, elementTarget);
}

prev_targetID = targetID;
prev_value = value;

select.addEventListener("change", () => {
  targetID = select.options[select.selectedIndex].getAttribute("for");
  value = select.options[select.selectedIndex].value;

  if (prev_value != undefined) {
    ToggleElement(prev_targetID, true);
  }

  if (prev_value != value) {
    let elementTarget = ToggleElement(targetID, false);
    SetupElement(value, elementTarget);
  }

  prev_targetID = targetID;
  prev_value = value;
});

function SetupElement(selectValue, element) {
  if (selectValue == "img_mini") {
    //console.log(element.querySelector("label"));
    element.querySelector("label").innerHTML = "Image Miniature (7:3)";
  }

  if (selectValue == "img_band") {
    //console.log(element.querySelector("label"));
    element.querySelector("label").innerHTML = "Image Bande (7:3)";
  }

  if (selectValue == "title") {
    console.log(element.querySelector("label"));
    element.querySelector("label").innerHTML = "Titre";
  }

  if (selectValue == "subtitle") {
    element.querySelector("label").innerHTML = "Entrer un petit texte";
  }

  if (selectValue == "alerteTxt") {
    element.querySelector("label").innerHTML = "Entrer un texte important";
  }

  if (selectValue == "inscription") {
    element.querySelector("label").innerHTML = "Entrer le lien d'inscription";
  }

  if (selectValue == "reglement") {
    element.querySelector("label").innerHTML = "Entrer le lien du règlement";
  }
}

function ToggleElement(targetID, hide) {
  const element = document.querySelector(`#${targetID}`);

  if (hide) {
    if (!element.classList.contains("hide")) element.classList.add("hide");
  } else {
    if (element.classList.contains("hide")) element.classList.remove("hide");
  }
  return element;
}

// console.log((2100/900 == 1200/450)); Check if 2 resolution have the same ratio
