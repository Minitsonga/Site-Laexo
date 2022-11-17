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
    element.querySelector("input").setAttribute("name", "img");
    element.querySelector("label").innerHTML = "Image Miniature (7:3)";
  }

  if (selectValue == "img_band") {
    element.querySelector("input").setAttribute("name", "band_img");
    element.querySelector("label").innerHTML = "Image Bande (7:3)";
  }

  if (selectValue == "title") {
    element.querySelector("input").setAttribute("name", "small_Title");
    element.querySelector("label").innerHTML = "Titre";
  }

  if (selectValue == "subtitle") {
    element.querySelector("input").setAttribute("name", "subtitle");
    element.querySelector("label").innerHTML = "Entrer un petit texte";
  }

  if (selectValue == "alerteTxt") {
    element.querySelector("input").setAttribute("name", "alerte_msg");
    element.querySelector("label").innerHTML = "Entrer un texte important";
  }

  if (selectValue == "inscription") {
    element.querySelector("input").setAttribute("name", "inscription");
    element.querySelector("label").innerHTML = "Entrer le lien d'inscription";
  }

  if (selectValue == "reglement") {
    element.querySelector("input").setAttribute("name", "reglement");
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

let validateBtn = document.querySelector(".validate");

validateBtn.addEventListener("click", () => {
  let curElement = ToggleElement(targetID, false).cloneNode(true);
  curElement.removeAttribute("class");
  curElement.removeAttribute("id");

  curElement.classList.add("form-group", "flex-column", "d-flex");
  if (value == "img_mini" || value == "img_band")
    curElement.style = "align-items:start;";

  if (value == "customButton")
    curElement.setAttribute("id", "customButtonHolder");

  let div = document.createElement("div");
  div.id = "reduce";
  div.classList.add("row", "justify-content-between", "parent");

  div.appendChild(curElement);

  let form = document.querySelector(".form-card");

  form.insertBefore(div, form.children[form.children.length - 2]);
});

// console.log((2100/900 == 1200/450)); Check if 2 resolution have the same ratio

function deleteElement(element) {
  element.closest(".parent").remove();
}

//Submit preview + validation (confirmation avant le post des données)
// preview = post des données et affichage de la page sur un nouvel onglet;

function fileValidation(button) {
  const allowedExtensions = /\.png$/i;
  if (!allowedExtensions.exec(button.value)) {
    alert("Mauvais format d'image. Il faut des images en png");
    button.value = "";
    return false;
  }
}

async function previewForm(button) {
  const form = button.closest("#mainForm");
  const listInputs = form.querySelectorAll(".inputData");

  const myDATA = [];
  for (let i = 0; i < listInputs.length; i++) {
    const element = listInputs[i];
    const nameInput = element.name;
    let value;
    if (nameInput === "img" || nameInput === "band_img") {
      value = element.value.replaceAll("C:\\fakepath\\", "");
    } else {
      value = element.value.replaceAll("\n", "<br>");
    }

    if (
      nameInput === "name" &&
      listInputs[i + 1].name === "url" &&
      listInputs[i + 2].name === "colorText" &&
      listInputs[i + 3].name === "colorBg"
    ) {
      myDATA.push({
        customBtn: {
          [listInputs[i].name]: listInputs[i].value,
          [listInputs[i + 1].name]: listInputs[i + 1].value,
          [listInputs[i + 2].name]: listInputs[i + 2].value,
          [listInputs[i + 3].name]: listInputs[i + 3].value,
        },
      });
      i += 3;
      continue;
    }

    if (
      (nameInput === "inscription" &&
        i + 1 < listInputs.length &&
        listInputs[i + 1].name === "reglement") ||
      (nameInput === "reglement" &&
        i + 1 < listInputs.length &&
        listInputs[i + 1].name === "inscription")
    ) {
      console.log(nameInput);
      if (myDATA.find((element) => element.buttons) != undefined) continue;

      myDATA.push({
        buttons: {
          [nameInput]: value,
          [listInputs[i + 1].name]: listInputs[i + 1].value,
        },
      });

      i += 1;
    } else {
      if (nameInput === "inscription" || nameInput === "reglement") continue;

      myDATA.push({ [nameInput]: value });
    }
  }

  console.log(myDATA);

  if (myDATA[0]["url_name"].split(" ").join("").length <= 2) return;

  await fetch("/admin/editor/preview/images", {
    method: "POST",
    body: new FormData(form),
  })
    .then((res) => {
      console.log("imageUploaded", res);
    })
    .catch((err) => console.log(err));

  fetch("/admin/editor/preview", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    method: "POST",
    body: JSON.stringify(myDATA),
  })
    .then((res) => {
      console.log("done", res);
    })
    .catch((err) => console.log(err));
}

function planningSubmit() {
  const form = document.querySelector("#planningModif");

  const img = new FormData(form);
  fetch("/admin/editor/planning", {
    method: "POST",
    body: img,
  })
    .then((res) => {
      console.log("done", res);
    })
    .catch((err) => console.log(err));
}
