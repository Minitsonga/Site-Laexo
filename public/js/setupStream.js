var isOnline;

async function getData() {
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
    .then((json_data) => (isOnline = json_data.data.online));


  const streamOverlay = document.querySelector("#stream");
  const imgOffline = document.querySelector(".img");

  if (isOnline <= 0) {
    if (!streamOverlay.classList.contains("hide"))
      streamOverlay.classList.add("hide");
    // if (!chatOverlay.classList.contains("hide"))
    //   chatOverlay.classList.add("hide");
    if (imgOffline.classList.contains("hide"))
      imgOffline.classList.remove("hide");
    document.getElementById("holderTotal").style = "";
  } else {
    if (streamOverlay.classList.contains("hide"))
      streamOverlay.classList.remove("hide");
    // if (chatOverlay.classList.contains("hide"))
    //   chatOverlay.classList.remove("hide");
    if (!imgOffline.classList.contains("hide"))
      imgOffline.classList.add("hide");
  }
}

getData();
