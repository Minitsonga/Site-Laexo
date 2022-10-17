const select = document.querySelector("#floatingSelectGrid");
let prevValue;
select.addEventListener("change", function handleChange(event) {
  const value = event.target.value;

  if (prevValue != value && prevValue != undefined) {
    ToggleElement(prevValue, true);
  }

  ToggleElement(value, false);
  prevValue = value;
});

function GetElementFromValue(selectValue) {
    if(selectValue == "img_mini")
    {
      return "img";
    }
  
}

function ToggleElement(selectValue, elementID, hide) {
    if(selectValue == "img_mini" || selectValue == "img_band") elementID = "img";
    if(selectValue == "title" || selectValue == "subtitle") elementID = "img";
    if(selectValue == "img_mini" || selectValue == "img_band") elementID = "img";
  const element = document.querySelector(`"${elementID}`);

  if (hide) {
    if (!element.classList.contains("hide")) element.classList.add("hide");
  } else {
    if (element.classList.contains("hide")) element.classList.remove("hide");
  }
}

// console.log((2100/900 == 1200/450)); Check if 2 resolution have the same ratio
