import { getPosition } from "./animeation.js";

var navbar = document.getElementById("header_blend");
var navb = document.getElementById("header");
var ftitle = document.getElementById("ftitle");
// Get all the sections
const sectionID = ["home", "about", "feature1", "feature2", "feature3", "feature4", "feature5", "subscription", "team", "contact", "footer"];
const sections = sectionID.map(id => document.getElementById(id));

// Set the active section to the first one
let activeSection = sections[0];

// Get the height of the viewport
const viewportHeight = window.innerHeight;

// Set the scroll position to the top of the active section
window.scrollTo(0, activeSection.offsetTop);

let currentSec = 0;
let lastSec = 0;

// Listen for scroll events
window.addEventListener('scroll', () => {
  // Calculate the distance from the top of the viewport to the top of each section
  const distances = Array.from(sections).map(section => Math.abs(section.getBoundingClientRect().top));

  // Find the index of the section with the smallest distance
  const minIndex = distances.indexOf(Math.min(...distances));

  // Set the active section to the section with the smallest distance
  activeSection = sections[minIndex];

  // add the dsel id to sidenav li element of the active section
  let nav = document.getElementById("sidenav");
  
  if (getActiveSection() != sectionID[0]) {
    navbar.classList.add("sticky");
    navb.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
    navb.classList.remove("sticky");
  }

  if (getActiveSection().startsWith("feature")) {
    ftitle.classList.add("fsticky");
    ftitle.style.display = "block";
  } else {
    ftitle.classList.remove("fsticky");
    ftitle.style.display = "none";
  }
});

window.addEventListener('scroll', () => {
  window.scrollTo(0, currentSec*viewportHeight);
});

// disable completely the scroll
window.addEventListener('wheel', (e) => {
  e.preventDefault();
}, {passive: false});

export function getActiveSection() {
  return activeSection.id;
}

export function getSectionID() {
  return sectionID;
}

export function getPhoneScreenHtml() {
  return document.getElementById(getActiveSection()+"-phone");
}

export function getPhoneScreenCSS() {
}

export function getPhoneScreen() {
  return getPhoneScreenHtml();
}

let angleToMiddle = 0;

let angleToMid = {
  x: 0,
  y: 0
}

export function limiteTo2pi(angle) {
  while (angle < 0 - 0.0001) {
    angle += 2*Math.PI;
  }
  while (angle > 2*Math.PI + 0.0001) {
    angle -= 2*Math.PI;
  }
  return angle;
}

export function getAngleToMid(){
  return angleToMid;
}

export function setAngleToMid(x,y) {
  angleToMid.x = limiteTo2pi(x);
  angleToMid.y = limiteTo2pi(y);
}

export function getAngleToMiddle() {
  return angleToMiddle;
}

export function getAngleToMiddleCords(x, cam_y) {
  let rad = Math.atan(cam_y/Math.abs(x))-Math.PI/2;
  return (x < 0) ? Math.PI - rad : Math.PI + rad;
}

export function isYFacingCamera(rotateY, posX){
  let angleY = limiteTo2pi(rotateY - angleToMid.y);
  let angleY2 = limiteTo2pi(rotateY + angleToMid.y);
  return ((angleY > Math.PI * 0.5 && angleY < Math.PI * 1.5 && posX >= 0) || (angleY2 > Math.PI * 0.5 && angleY2 < Math.PI * 1.5 && posX < 0));
}

export function isXFacingCamera(rotateX, posY){
  let angleX = limiteTo2pi(rotateX - angleToMid.x);
  let angleX2 = limiteTo2pi(rotateX + angleToMid.x);
  return ((angleX > Math.PI * 0.5 && angleX < Math.PI * 1.5 && posY >= 0) || (angleX2 > Math.PI * 0.5 && angleX2 < Math.PI * 1.5 && posY < 0));
}

export function isPhoneScreenFacingCamera(rotateX,rotateY,posX,posY) {
  return isXFacingCamera(rotateX,posY) && isYFacingCamera(rotateY,posX);
}

export function setAngleToMiddle(angle) {
  angleToMiddle = limiteTo2pi(angle);
}

function generateSideNav() {
  let nav = document.getElementById("sidenav");
  let navhtml = "";
  navhtml += "<button><</button>";
  navhtml += "<li><a id=\"down\">\\/</a></li>";
  nav.innerHTML = navhtml;
}
// generateSideNav();

let up = document.getElementById("up");
let down = document.getElementById("down");

up.addEventListener("click", () => {
  if (currentSec > 0) {
    currentSec--;
    window.scrollTo(0, currentSec*viewportHeight);
  }
});

down.addEventListener("click", () => {
  if (currentSec < sections.length - 1) {
    currentSec++;
    window.scrollTo(0, currentSec*viewportHeight);
  }
});

let h = document.getElementById("h");
h.addEventListener("click", () => {
  currentSec = 0;
  window.scrollTo(0, currentSec*viewportHeight);
});

let a = document.getElementById("a");
a.addEventListener("click", () => {
  currentSec = 1;
  window.scrollTo(0, currentSec*viewportHeight);
});

// let f1 = document.getElementById("f1");
// f1.addEventListener("click", () => {
//   currentSec = 2;
//   window.scrollTo(0, currentSec*viewportHeight);
// });

// let f2 = document.getElementById("f2");
// f2.addEventListener("click", () => {
//   currentSec = 3;
//   window.scrollTo(0, currentSec*viewportHeight);
// });

// let f3 = document.getElementById("f3");
// f3.addEventListener("click", () => {
//   currentSec = 4;
//   window.scrollTo(0, currentSec*viewportHeight);
// });

// let f4 = document.getElementById("f4");
// f4.addEventListener("click", () => {
//   currentSec = 5;
//   window.scrollTo(0, currentSec*viewportHeight);
// });

// let f5 = document.getElementById("f5");
// f5.addEventListener("click", () => {
//   currentSec = 6;
//   window.scrollTo(0, currentSec*viewportHeight);
// });

let s = document.getElementById("s");
s.addEventListener("click", () => {
  currentSec = 7;
  window.scrollTo(0, currentSec*viewportHeight);
});

let t = document.getElementById("t");
t.addEventListener("click", () => {
  currentSec = 8;
  window.scrollTo(0, currentSec*viewportHeight);
});

let c = document.getElementById("c");
c.addEventListener("click", () => {
  currentSec = 9;
  window.scrollTo(0, currentSec*viewportHeight);
});

let f = document.getElementById("f");
let fs = 2;
f.addEventListener("click", () => {
  currentSec = fs;
  window.scrollTo(0, currentSec*viewportHeight);
  fs++;
  if (fs > 6) {
    fs = 2;
  }
});