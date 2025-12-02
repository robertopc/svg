const DEBUG = false;

var c1 = id("c1");
var c2 = id("c2");

event(c1, "click", function() {
  log("CIRCLE 1 clicked");
});
event(c1, "mouseover", function () {
  log("CIRCLE 1 over!");
});

event(c2, "click", function() {
  log("CIRCLE 2 clicked!");
  let x = get(c2, "cx");
  x = int(x) + 10;
  set(c2, "cx", x);
});
event(c2, "mouseout", function() {
  log("CIRCLE 2 mouseout!");
});
event(c2, "mouseover", function() {
  log("CIRCLE 2 over!");
});

event(id("saveBtn"), "click", function() {
var svgElement = id("main");
var serializer = new XMLSerializer();
var svgString = serializer.serializeToString(svgElement);

var blob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
var url = URL.createObjectURL(blob);

var link = document.createElement("a");
link.href = url;
link.download = "drawing.svg";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
URL.revokeObjectURL(url);
});

event(id("zoomInBtn"), "click", function () {
var svgElement = id("main");
var viewBox = svgElement.getAttribute("viewBox").split(" ").map(float);;
var x = viewBox[0];
var y = viewBox[1];
var width = viewBox[2];
var height = viewBox[3];

var zoomFactor = 0.9; // Zoom in by 10%
var newWidth = Math.round(width * zoomFactor);
var newHeight = Math.round(height * zoomFactor);
var newX = Math.round(x + (width - newWidth) / 2);
var newY = Math.round(y + (height - newHeight) / 2);

value("width", newWidth);
value("height", newHeight);

svgElement.setAttribute("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`);
});

event(id("zoomOutBtn"), "click", function () {
var svgElement = id("main");
var viewBox = svgElement.getAttribute("viewBox").split(" ").map(float);;
var x = viewBox[0];
var y = viewBox[1];
var width = viewBox[2];
var height = viewBox[3];

var zoomFactor = 1.1; // Zoom out by 10%
var newWidth = Math.round(width * zoomFactor);
var newHeight = Math.round(height * zoomFactor);
var newX = Math.round(x - (newWidth - width) / 2);
var newY = Math.round(y - (newHeight - height) / 2);

value("width", newWidth);
value("height", newHeight);

svgElement.setAttribute("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`);
});

event(id("rectBtn"), "click", function () {
var svgElement = id("main");

svgElement.innerHTML += "<rect x='10' y='10' width='50' height='50' stroke='black' stroke-width='2' fill='yellow'/>";
});

function mainEvents(e) {
  console.log("Event:", e)
  switch (e.type) {
    case "pointerdown":
      log("Pointer down at " + e.clientX + ", " + e.clientY);
      break;
    case "pointermove":
      log("Pointer move at " + e.clientX + ", " + e.clientY);
      break;
    case "pointerup":
      log("Pointer up at " + e.clientX + ", " + e.clientY);
      break;
    case "click":
      log("Click at " + e.clientX + ", " + e.clientY);
      break;
    case "dblclick":
      log("Double click at " + e.clientX + ", " + e.clientY);
      break;
    case "contextmenu":
      log("Context menu at " + e.clientX + ", " + e.clientY);
      e.preventDefault();
      break;
    case "wheel":
      log("Wheel event at " + e.clientX + ", " + e.clientY + " delta: " + e.deltaY);
      if (e.deltaY < 0) {
        log("Zooming in");
        click("zoomInBtn");
      } else {
        log("Zooming out");
        click("zoomOutBtn");
      }
      break;
    default:
      log("Other event: " + e.type);
  }
}

events.forEach(e => {
  event(id('main'), e, mainEvents);
});

// events.forEach(e => {
//   event(id('main'), e, mainEvents);
// });