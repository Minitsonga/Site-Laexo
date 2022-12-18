const select = document.querySelector("#floatingSelectGrid");

document.addEventListener("DOMContentLoaded", () => {
  const selectEvents = document.querySelector("#floatingSelectGridEvents");

  listEvents.forEach((element) => {
    const option = document.createElement("option");
    option.setAttribute("value", element.id);
    option.innerHTML = element.title;
    selectEvents.appendChild(option);
  });
});

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
  if (selectValue == "img") {
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
  if (value === "img" || value === "img_band")
    curElement.style = "align-items:start;";

  let div = document.createElement("div");
  div.id = "reduce";
  div.classList.add("row", "justify-content-between", "parent");

  div.appendChild(curElement);

  let form = document.querySelector(".form-card");

  form.insertBefore(div, form.children[form.children.length - 2]);
});

function deleteElement(element) {
  element.closest(".parent").remove();
}

function fileValidation(button) {
  const allowedExtensions = /\.png$/i;
  if (!allowedExtensions.exec(button.value)) {
    alert("Mauvais format d'image. Il faut des images en png");
    button.value = "";
    return false;
  }
}

function dataFormat(form) {
  const listInputs = form.querySelectorAll(".inputData");

  const myDATA = [];
  for (let i = 0; i < listInputs.length; i++) {
    const element = listInputs[i];
    const nameInput = element.name;
    let value;

    if (nameInput === "img" || nameInput === "band_img") {
      value = element.value.replaceAll("C:\\fakepath\\", "").replace(/ /g, "");
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
          [listInputs[i + 1].name]: listInputs[i + 1].value.replace(/ /g, ""),
          [listInputs[i + 2].name]: listInputs[i + 2].value,
          [listInputs[i + 3].name]: listInputs[i + 3].value,
        },
      });
      i += 3;
      continue;
    }

    if (
      nameInput === "dateStart" &&
      listInputs[i + 1].name === "dateEnd" &&
      listInputs[i + 2].name === "launchDate"
    ) {
      myDATA.push({
        dates: {
          [listInputs[i].name]: listInputs[i].value,
          [listInputs[i + 1].name]: listInputs[i + 1].value,
          [listInputs[i + 2].name]: listInputs[i + 2].value,
        },
      });
      i += 2;
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
      //console.log(nameInput);
      if (myDATA.find((element) => element.buttons) != undefined) continue;

      myDATA.push({
        buttons: {
          [nameInput]: value.replace(/ /g, ""),
          [listInputs[i + 1].name]: listInputs[i + 1].value.replace(/ /g, ""),
        },
      });

      i += 1;
    } else {
      if (nameInput === "inscription" || nameInput === "reglement") continue;

      myDATA.push({ [nameInput]: value });
    }
  }

  return myDATA;
}

async function previewForm(button) {
  const form = button.closest("#mainForm");
  const myDATA = dataFormat(form);

  if (myDATA[0]["url_name"].split(" ").join("").length <= 2)
    return alert("L'URL de l'évènement doit avoir plus de 3 caractères !");

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
      if (!res.ok) {
        if (res.status == 404)
          alert("L'URL de l'évènement doit avoir plus de 3 caractères !");
      }
      console.log("done", res);
    })
    .catch((err) => console.log(err));
}

async function submitForm(button) {
  if (window.confirm("Es-tu sur de vouloir valider cette évènement ?")) {
    const form = button.closest("#mainForm");
    const myDATA = dataFormat(form);

    if (myDATA[0]["url_name"].split(" ").join("").length <= 2)
      return alert("L'URL de l'évènement doit avoir plus de 3 caractères !");

    if (
      window.confirm(
        "Veux tu modifier cette évènement si il existe ? \n(Appuie sur annuler pour créer un nouvelle évènement)"
      )
    ) {
      //console.log(myDATA);

      await fetch("/admin/editor/preview/images", {
        method: "POST",
        body: new FormData(form),
      })
        .then((res) => {
          console.log("imageUploaded", res);
        })
        .catch((err) => console.log(err));

      fetch("/admin/editor/updateEvent", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify(myDATA),
      })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 402) alert("L'URL n'est pas conforme !");
            if (res.status === 403)
              alert(
                "Erreur lors dans l'envoie de l'évènement ! Vérifie bien toutes les informations"
              );
            if (res.status === 404)
              alert("Évènement inconnu ! Impossible de le modifier.");
          } else {
            alert("Évènement correctement modifié !");
            window.open(`${location.origin + "/events"}`, "_blank").focus();
          }
        })
        .catch((err) => console.log(err));
    } else {
      //console.log(myDATA);

      if (myDATA[0]["url_name"].split(" ").join("").length <= 2) return;

      await fetch("/admin/editor/preview/images", {
        method: "POST",
        body: new FormData(form),
      })
        .then((res) => {
          console.log("imageUploaded", res);
        })
        .catch((err) => console.log(err));

      fetch("/admin/editor", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify(myDATA),
      })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 402) alert("L'URL n'est pas conforme !");
            if (res.status === 403)
              alert("L'URL de l'évènenement éxiste déjà!");
            if (res.status === 404)
              alert("Évènement inconnu ! Impossible de le supprimer.");
          } else {
            alert("Évènement correctement ajouté !");

            window.open(`${location.origin + "/events"}`, "_blank").focus();
          }
        })
        .catch((err) => console.log(err));
    }
  }
}

function planningSubmit() {
  if (window.confirm("Es-tu sur de vouloir modifier le planning ?")) {
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
}

function deleteEvent() {
  if (window.confirm("Es-tu sur de vouloir supprimer cette évènement ?")) {
    // Validate = delete selected option
    const selectEvent = document.querySelector("#floatingSelectGridEvents");
    let value = selectEvent.options[selectEvent.selectedIndex].value;

    fetch("/admin/editor", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({ value }),
    })
      .then((res) => {
        if (!res.ok) alert("Aucun évènement n'a été trouvé !");
        else alert("Évènement correctement supprimé !");
      })
      .catch((err) => console.log("error la " + err));
  }
}

let fileList = [];
async function modifyEvent() {
  // envoyé nom de l'event recherché et renvoi l'event

  const selectEvent = document.querySelector("#floatingSelectGridEvents");
  let value = selectEvent.options[selectEvent.selectedIndex].value;
  let event = [];

  await fetch("/admin/editor/getevent", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    method: "POST",
    body: JSON.stringify({ value }),
  })
    .then((res) => res.json())
    .then((res) => (event = res))
    .catch((err) => console.log("error la " + err));

  console.log(event);
  console.log(select.options[0].getAttribute("for"));

  event.forEach((item) => getIdElement(item, event));
}

//Get the id of the form element form the name of each item in event.
async function getIdElement(item, cur_Event) {
  let element;
  let value = "";
  if (item["url_name"]) {
    const textUrl = document.querySelector("#urlName");
    textUrl.value = item["url_name"];
  }

  if (item["title"]) {
    const textTitle = document.querySelector("#TitleMain");
    textTitle.value = item["title"];
  }

  if (item["subtitle"]) {
    element = document.querySelector("#textSelect");
  }

  if (item["img"]) {
    element = document.querySelector("#imgSelect");
    value = "img";
  }

  if (item["band_img"]) {
    element = document.querySelector("#imgSelect");
    value = "band_img";
  }

  if (item.buttons != undefined) {
    if (item.buttons["inscription"]) {
      element = document.querySelector("#urlButtonSelect");
    }

    if (item.buttons["reglement"]) {
      element = document.querySelector("#urlButtonSelect");
    }
  }

  if (item["small_Title"]) {
    element = document.querySelector("#textSelect");
  }

  if (item["alerte_msg"]) {
    element = document.querySelector("#textSelect");
  }

  if (item["description"]) {
    element = document.querySelector("#textZoneSelect");
  }

  if (item.customBtn != undefined) {
    value = "customButton";
    element = document.querySelector("#customButtonSelect");
  }

  if (item.dates != undefined) {
    element = document.querySelector("#dateSelect");
  }

  if (!element) return;
  await InitElement(copyElement(element, value, cur_Event), item);
}

async function getImage(pathName) {
  const img = await fetch("/img/" + pathName, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    method: "GET",
  })
    .then((res) => res.blob())
    .then((img) => {
      const myFile = new File([img], pathName, { type: img.type });
      //console.log(myFile);
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(myFile);
      return dataTransfer.files;
    });

  return img;
}

function copyElement(element, value) {
  let curElement = element.cloneNode(true);
  curElement.removeAttribute("class");
  curElement.removeAttribute("id");

  curElement.classList.add("form-group", "flex-column", "d-flex");
  if (value == "img" || value == "band_img")
    curElement.style = "align-items:start;";

  return curElement;
}

async function InitElement(element, item) {
  // Pour ajouter l'image il faut faire une liste de file avant meme le getElement

  if (item["img"]) {
    element.querySelector("input").setAttribute("name", "img");
    // element.querySelector("input").files = await getImage(item["img"]);
    element.querySelector("label").innerHTML = "Image Miniature (7:3)";
  }

  if (item["band_img"]) {
    element.querySelector("input").setAttribute("name", "band_img");
    element.querySelector("input").setAttribute("alt", item["band_img"]);

    //element.querySelector("input").files = await getImage(item["band_img"]);
    element.querySelector("label").innerHTML = "Image Bande (7:3)";
  }

  if (item["small_Title"]) {
    element.querySelector("input").setAttribute("name", "small_Title");
    element.querySelector("input").value = item["small_Title"];
    element.querySelector("label").innerHTML = "Titre";
  }

  if (item["subtitle"]) {
    element.querySelector("input").setAttribute("name", "subtitle");
    element.querySelector("input").value = item["subtitle"];
    element.querySelector("label").innerHTML = "Entrer un petit texte";
  }

  if (item["alerte_msg"]) {
    element.querySelector("input").setAttribute("name", "alerte_msg");
    element.querySelector("input").value = item["alerte_msg"];
    element.querySelector("label").innerHTML = "Entrer un texte important";
  }

  if (item["description"]) {
    element.querySelector("textarea").value = item["description"].replaceAll(
      "<br>",
      "\n"
    );
    element.querySelector("label").innerHTML = "Entrer un paragraphe";
  }

  if (item.buttons != undefined) {
    if (item.buttons["inscription"]) {
      element.querySelector("input").setAttribute("name", "inscription");
      element.querySelector("input").value = item.buttons["inscription"];
      element.querySelector("label").innerHTML = "Entrer le lien d'inscription";
    }

    if (item.buttons["reglement"]) {
      element.querySelector("input").setAttribute("name", "reglement");
      element.querySelector("input").value = item.buttons["reglement"];
      element.querySelector("label").innerHTML = "Entrer le lien du règlement";
    }
  }

  if (item.customBtn != undefined) {
    if (item.customBtn["colorBg"]) {
      const input = element.querySelector("#colorBgInput");
      input.value = item.customBtn["colorBg"];
    }

    if (item.customBtn["colorText"]) {
      const input = element.querySelector("#colorTxtInput");
      input.value = item.customBtn["colorText"];
    }

    if (item.customBtn["name"]) {
      const input = element.querySelector("#btnName");
      input.value = item.customBtn["name"];
    }

    if (item.customBtn["url"]) {
      const input = element.querySelector("#urlInput");
      input.value = item.customBtn["url"];
    }
  }

  if (item.dates != undefined) {
    if (item.dates["dateStart"]) {
      element.querySelector("#dateBegin").value = item.dates["dateStart"];
    }
    if (item.dates["dateEnd"]) {
      element.querySelector("#dateEnd").value = item.dates["dateEnd"];
    }
    if (item.dates["launchDate"]) {
      element.querySelector("#dateLaunch").value = item.dates["launchDate"];
    }
  }

  // j'ai l'elelement mais recup les 3 input en meme temps grace a value == "date"
  // setup chaque input en fonction de dateStart / dateEnd / LaunchDate

  const form = document.querySelector(".form-card");
  let div = document.createElement("div");
  div.id = "reduce";
  div.classList.add("row", "justify-content-between", "parent");

  div.appendChild(element);

  form.insertBefore(div, form.children[form.children.length - 2]);

  if (item["img"]) {
    form.querySelector("input[name=img]").files = await getImage(item["img"]);
  }
  //TODO try to load multiple imgs / for now we can only load 1 image
  if (item["band_img"]) {
    console.log(item["band_img"]);
    let inputBands = form.querySelectorAll("input[name=band_img]");
    let cur_Input;
    for (let i = 0; i < inputBands.length; i++) {
      if (inputBands[i].getAttribute("alt") === item["band_img"]) {
        cur_Input = inputBands[i];
        break;
      }
    }

    cur_Input.files = await getImage(item["band_img"]);
  }
}
