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

// Listen for scroll events
window.addEventListener('scroll', () => {
  // Calculate the distance from the top of the viewport to the top of each section
  const distances = Array.from(sections).map(section => Math.abs(section.getBoundingClientRect().top));

  // Find the index of the section with the smallest distance
  const minIndex = distances.indexOf(Math.min(...distances));

  // Set the active section to the section with the smallest distance
  activeSection = sections[minIndex];

  // Set the scroll position to the top of the active section
  window.scrollTo(0, activeSection.offsetTop);

  // add the dsel id to sidenav li element of the active section
  let nav = document.getElementById("sidenav");
  nav.childNodes.forEach(li => {
    if (li.childNodes[0].href.endsWith(getActiveSection())) {
      // add id dsel to li
      li.classList.add("dsel");
    }
    else {
      li.classList.remove("dsel");
    }
  });
  
  if (getActiveSection() != sectionID[0]) {
    navbar.classList.add("sticky");
    navb.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
    navb.classList.remove("sticky");
  }

  if (getActiveSection().startsWith("feature")) {
    ftitle.classList.add("fsticky");
  } else {
    ftitle.classList.remove("fsticky");
  }
});

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

function generateSideNav() {
  let nav = document.getElementById("sidenav");
  let navhtml = "";
  for (let i = 0; i < sectionID.length; i++) {
    navhtml += "<li><a href='#"+sectionID[i]+"'>·</a></li>";
  }
  nav.innerHTML = navhtml;
}
generateSideNav();