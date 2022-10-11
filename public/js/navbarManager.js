//#region Get current link
var currentLink;
document.querySelectorAll("ul>a").forEach((element) => {
  var path = "/" + location.pathname.split("/")[1];
  if (path == element.attributes["href"].value) {
    currentLink = element;
  }
});

window.addEventListener("DOMContentLoaded", function () {
  currentLink.classList.add("selected");
});

//#endregion

//#region Open and close sidebar

const mainNavigation = document.querySelector(".main-navigation");
const toggler = mainNavigation.querySelector(".toggle-nav");
const cross = mainNavigation.querySelector("#close-sidebar");

const openSideNav = () => {
  mainNavigation.classList.add("active");
  document.getElementById("close-sidebar").style.visibility = "visible";
  document.getElementById("close-sidebar").style.position = "relative";
};

const closeSideNav = () => {
  mainNavigation.classList.remove("active");
  document.getElementById("close-sidebar").style.visibility = "hidden";
  document.getElementById("close-sidebar").style.position = "absolute";
};

toggler.addEventListener("click", openSideNav);
cross.addEventListener("click", closeSideNav);

function resize() {
  if (window.location.pathname != "/stream") return;

  if (window.innerWidth > 996 && mainNavigation.classList.contains("active")) {
    closeSideNav(); //Fix bug when resize and sidebar still open
  }

  if (window.innerWidth <= 996) {
    document.getElementById("chat-holder").style.visibility = "hidden";
    document.getElementById("chat-holder").style.position = "absolute";

    document.getElementById("stream-holder").style.width = "100%";
    document.getElementById("stream-buttons").style.width = "100%";
  } else if (window.innerWidth > 996) {
    document.getElementById("chat-holder").style.visibility = "visible";
    document.getElementById("chat-holder").style.position = "relative";

    document.getElementById("stream-holder").style.width = "76%";
    document.getElementById("stream-buttons").style.width = "76%";
  }
}

window.onresize = resize;

//#endregion

//#region Setup LiveTitle
var data_stream;
async function getDataLive() {
  await fetch(
    "https://wapi.wizebot.tv/api/channels/c476492c15def796d57a7f0952228757/datas",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      cache: "default",
    }
  )
    .then((res) => res.json())
    .then((json_data) => (data_stream = json_data.data));

  document.getElementById("title-stream").innerHTML =
    data_stream.current_status;

  const liveBande = document.querySelectorAll(".inliveTitle");
  if (data_stream.online <= 0) {
    liveBande.forEach(function (element) {
      element.style.visibility = "hidden";
      element.style.position = "absolute";
    });
  } else {
    liveBande.forEach(function (element) {
      element.style.visibility = "visible";
      element.style.position = "relative";
    });
  }
}

getDataLive();

//#endregion
