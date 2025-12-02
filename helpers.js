const events = [
  "dragstart", "drag", "dragend",
  "pointerdown", "pointerup", "pointermove", "pointerenter",
  "pointerleave", "pointerover", "pointerout", "pointercancel",
  "click", "dblclick", "contextmenu",
  "wheel"
];

const keyEvents = [
  "keydown", "keyup", "keypress"
];

function id(val) {
  return document.getElementById(val);
}

function get(obj, val) {
  return obj.getAttribute(val);
}

function set(obj, att, val) {
  return obj.setAttribute(att, val);
}

function insert(id, val) {
  document.getElementById(id).innerHTML = val;
}

function value(id, val) {
  document.getElementById(id).value = val;
}

function event(obj, val, fun) {
  obj.addEventListener(val, fun);
}

function log(...val) {
  DEBUG && console.log(val);
}

function info(...val) {
  DEBUG && console.info(val);
}

function warn(...val) {
  DEBUG && console.warn(val);
}

function error(...val) {
  DEBUG && console.error(val);
}

function int(val) {
  return parseInt(val);
}

function float(val) {
  return parseFloat(val);
}

function click(_id) {
  id(_id).click();
}

function cursorZoomOut() {
  id('editorMain').style.cursor = "zoom-out";
}

function cursorZoomIn() {
  id('editorMain').style.cursor = "zoom-in";
}

function cursorDefault() {
  window.setTimeout(function() {
    document.getElementById('editorMain').style.cursor = "default";
  }, 500);
}