const DEBUG = true;

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
var svgElement = id("editorMain");
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
var svgElement = id("editorMain");
var viewBox = svgElement.getAttribute("viewBox").split(" ").map(float);
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

cursorZoomIn();
cursorDefault();

svgElement.setAttribute("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`);
});

event(id("zoomOutBtn"), "click", function () {
var svgElement = id("editorMain");
var viewBox = svgElement.getAttribute("viewBox").split(" ").map(float);
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

cursorZoomOut();
cursorDefault();

svgElement.setAttribute("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`);
});

event(id("rectBtn"), "click", function () {
var svgElement = id("editorMain");

svgElement.innerHTML += "<rect x='10' y='10' width='50' height='50' stroke='black' stroke-width='2' />";
});

event(id("circleBtn"), "click", function () {
var svgElement = id("editorMain");

svgElement.innerHTML += "<circle cx='10' cy='10' r='25---' stroke='black' stroke-width='2' fill='yellow'/>";
});

function mainEvents(e) {
  log("Event:", e);
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

function mainKeyEvents(e) {
  log("Key Event:", e);
  switch (e.type) {
    case "keydown":
      log("Key down: " + e.key);
      shortcutKeys(e.key);
      break;
    case "keyup":
      log("Key up: " + e.key);
      break;
    case "keypress":
      log("Key press: " + e.key);
      break;
    default:
      log("Other key event: " + e.type);
  }
}

function shortcutKeys(key) {
  switch (key) {
    case "+":
    case "=":
      log("Shortcut: Zoom In");
      click("zoomInBtn");
      break;
    case "-":
    case "_":
      log("Shortcut: Zoom Out");
      click("zoomOutBtn");
      break;
    case "r":
    case "R":
      log("Shortcut: Add Rectangle");
      click("rectBtn");
      break;
    case "c":
    case "C":
      log("Shortcut: Add Circle");
      click("circleBtn");
      break;
    case "s":
    case "S":
      log("Shortcut: Save SVG");
      click("saveBtn");
      break;
    default:
      log("No shortcut assigned for key: " + key);
  }
}

/* Attach main event listeners */
events.forEach(e => {
  event(id('editorMain'), e, mainEvents);
});

keyEvents.forEach(e => {
  event(window, e, mainKeyEvents);
});