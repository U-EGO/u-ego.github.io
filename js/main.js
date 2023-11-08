
// Get all the sections
const sectionID = ["home", "about", "papers", "feature1", "feature2", "feature3", "subscription", "team", "contact"];
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
});
