var tag = document.createElement("p"); // <p></p>
var text = document.createTextNode("TEST TEXT"); 
tag.appendChild(text); // <p>TEST TEXT</p>
var element = document.getElementsByTagName("body")[0];
element.appendChild(tag);