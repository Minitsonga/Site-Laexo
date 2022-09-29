let category = "uptime";
let period = buttonGroup.dataset.left;

const holder = document.querySelector(".list");

function selectCat(cat) {
  category = cat;

  switch (category) {
    case "uptime":
      document.querySelectorAll(".cat-link")[0].classList.add("active");
      document.querySelectorAll(".cat-link")[1].classList.remove("active");
      document.querySelectorAll(".cat-link")[2].classList.remove("active");
      break;

    case "message":
      document.querySelectorAll(".cat-link")[0].classList.remove("active");
      document.querySelectorAll(".cat-link")[1].classList.add("active");
      document.querySelectorAll(".cat-link")[2].classList.remove("active");

      break;

    case "rank":
      document.querySelectorAll(".cat-link")[0].classList.remove("active");
      document.querySelectorAll(".cat-link")[1].classList.remove("active");
      document.querySelectorAll(".cat-link")[2].classList.add("active");

      break;
  }

  if (category == "rank") {
    buttonGroup.classList.add("hidden");
  } else {
    buttonGroup.classList.remove("hidden");
  }

  holder.innerHTML = "";
  setupTopData();
}

function changePeriod() {
  period = buttonGroup.dataset.left;
  if (category == "rank") return;
  holder.innerHTML = "";
  setupTopData();
}

async function setupTopData() {
  let cur_List = leaderboard.rank;

  if (category != "rank") {
    //console.log(category);

    switch (period) {
      case "week":
        cur_List = leaderboard[category].week;
        break;
      case "month":
        cur_List = leaderboard[category].month;
        break;
      case "global":
        cur_List = leaderboard[category].global;
        break;
    }
  }

  for (let i = 0; i < 50; i++) {
    if (Object.keys(cur_List).length <= 0) {
      let newRow = document.createElement("div");
      newRow.classList = "d-flex justify-content-center fs-1";
      newRow.innerHTML = "Aucune donnée trouvé";
      holder.appendChild(newRow);

      break;
    }
    const member = cur_List[i];

    if (member == undefined) return;

    const id = category == "rank" ? member.viewer_uid : member.user_uid;
    const name = category == "rank" ? member.viewer_name : member.user_name;
    const pos = category == "rank" ? member.rank : i + 1;

    let { img } = listUser_img.find((element) => element.user_uid == id);

    let val;

    switch (category) {
      case "uptime":
        let sec = member.value / 3600;
        let hour = Math.trunc(sec);

        sec -= hour;
        sec *= 60;

        let min = Math.trunc(sec);
        sec -= min;

        sec = Math.round(sec * 60);

        val = `${hour}h ${min}m ${sec}s`;

        break;
      case "message":
        val = member.value + " msg";
        break;
      case "rank":
        val = member.exp + " xp";
        break;
    }

    let newRow = document.createElement("div");
    newRow.classList = "item";
    newRow.id = id;
    newRow.innerHTML = `
        <div class="pos">
          ${pos}
        </div>
        <div class="pic" style="background-image: url(${img})">
        </div>
        <div class="name">
        ${name}
        </div>
        <div class="score">
        ${val}
        </div>
        </div>
        `;
    holder.appendChild(newRow);
  }

  // if (Object.keys(user).length > 0) {
  //   const cardUser = document.getElementById(`${user.id}`);
  //   console.log(cardUser);
  //   cardUser.style.background = "#dddddd";
  //   cardUser.style.color = "black";
  // }
}

setupTopData();

// if (Object.keys(user).length > 0) {
//   const cardUser = document.getElementById(`${user.id}`);
//   console.log(cardUser);
//   cardUser.style.background = "#dddddd";
//   cardUser.style.color = "black";
// } else {
//   console.log("no user");
// }
