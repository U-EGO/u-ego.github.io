import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

import { getActiveSection, getSectionID, getPhoneScreen } from './main.js'
import { getPosition } from './animeation.js';
import { isFacingCamera, setData } from './angleLogic.js';

var animationScripts = []

const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );
camera.position.z = 45;

// lights
const light = new THREE.AmbientLight( 0x404040, 500 ); // soft white light
scene.add( light );

const pointLight = new THREE.PointLight( 0xffffff, 1000 );
camera.add( pointLight );
scene.add( camera );

// create an html page to be displayed on a plane
const html = document.createElement('div');
html.style.backgroundColor = 'rgba(0,127,127)';
const phoneCamera = document.createElement('div');
phoneCamera.style.backgroundColor = 'rgba(0,0,0)';
const cssObj = new CSS3DObject( html );
const cssCamObj = new CSS3DObject( phoneCamera );
const phoneHtml = document.getElementById("phoneHTML");
phoneHtml.style.backgroundColor = 'rgba(0,127,127)';
const cssHtml = new CSS3DObject( phoneHtml );
cssObj.add(cssCamObj);
cssObj.add(cssHtml);

cssCamObj.position.set(0, 280, 2);

let loadedModel;
const gltfLoader = new GLTFLoader();

gltfLoader.load( 'img/models/scene.gltf', function ( gltf ) {
  loadedModel = gltf;
  scene.add( gltf.scene );
  loadedModel.scene.scale.set(0.05, 0.05, 0.05);
  // loadedModel.scene.scale.set(0.5, 0.5, 0.5);
  // rotate the model 90 degrees
  loadedModel.scene.rotation.y = Math.PI / 2;
  loadedModel.scene.add(cssObj);
  cssObj.element.style.height = loadedModel.scene.scale.y * 11900 + 'px';
  cssObj.element.style.width = loadedModel.scene.scale.x * 5700 + 'px';
  cssObj.element.style.backgroundColor = 'rgba(0,127,127)';

  cssHtml.element.style.width = loadedModel.scene.scale.x * 5200 + 'px';
  cssHtml.element.style.height = loadedModel.scene.scale.y * 11100 + 'px';

  cssCamObj.element.style.width = loadedModel.scene.scale.x * 5700 * 0.5+ 'px'
  cssCamObj.element.style.height = loadedModel.scene.scale.y * 11900 * 0.05 + 'px';
});

cssHtml.position.set(0, -10, 1);
cssObj.position.set(0, 0, -15);
cssObj.element.style.borderRadius = '30px';
cssCamObj.element.style.borderRadius = '30px';
cssObj.rotateY(Math.PI);

let renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000, 0);
renderer.domElement.id = "renderer";
renderer.domElement.className = "renderer";
document.getElementById("container").appendChild( renderer.domElement );

let cssRenderer = new CSS3DRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.id = "renderer";
cssRenderer.domElement.className = "cssrenderer";
document.getElementById("container").appendChild( cssRenderer.domElement );

let scrollPercent = 0

function getVerticalScrollPercentage( elm ){
  var p = elm.parentNode
  return (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
}

function getVercticallScrollPercentagePage(){
  // get the % base on the height of the element
  return window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
}

function getVerticalScrollPixels( elm ){
  var p = elm.parentNode
  return (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * (p.scrollHeight - p.clientHeight )
}

let scrollPos = getVerticalScrollPercentage(document.body);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    cssRenderer.setSize(window.innerWidth, window.innerHeight)
    render()
    // reload page
    location.reload();
}

function render() {
  cssRenderer.render(scene, camera)
  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame( animate );
  
  scrollPos = getVercticallScrollPercentagePage();
  scrollPercent = Math.abs(scrollPos);

  // console.log(scrollPos);

  //get the active section top position
  let activeSectionTop = document.getElementById(getActiveSection()).offsetTop;

  // // set the renderer to the scroll position
  // renderer.domElement.style.top = activeSectionTop  + 'px';
  // cssRenderer.domElement.style.top =  activeSectionTop + 'px';

  if (loadedModel) {
    setData(loadedModel.scene.position.x, loadedModel.scene.position.y, loadedModel.scene.position.z, loadedModel.scene.rotation.x, loadedModel.scene.rotation.y, loadedModel.scene.rotation.z, camera.position.x, camera.position.y, camera.position.z, camera.rotation.x, camera.rotation.y, camera.rotation.z);

    if (getPhoneScreen() != null){
      cssHtml.element.innerHTML = getPhoneScreen().innerHTML;
      cssHtml.element.id = getPhoneScreen().id;
      cssHtml.element.style.display = 'block';
      // console.log(getPhoneScreen().id);
    } else {
      cssHtml.element.innerHTML = document.getElementById("basePhoneHTML").innerHTML;
    }


    // if loadedModel is in front of cssObj, then hide cssObj
    // if (Math.abs(quaternion.y) > Math.abs(quaternion2.y)) {
    // if (loadedModel.scene.rotation.y-rad > Math.PI * 0.5 && loadedModel.scene.rotation.y-rad < Math.PI * 1.5 && loadedModel.scene.position.x >= 0) {
    //   cssObj.element.style.opacity = '1';
    //   cssCamObj.element.style.opacity = '1';
    //   cssHtml.element.style.opacity = '1';
    //   // cssRenderer.domElement.style.opacity = '1';
    // } else if (loadedModel.scene.rotation.y+rad > Math.PI * 0.5 && loadedModel.scene.rotation.y+rad < Math.PI * 1.5 && loadedModel.scene.position.x < 0) {
    //   cssObj.element.style.opacity = '1';
    //   cssCamObj.element.style.opacity = '1';
    //   cssHtml.element.style.opacity = '1';
    //   // cssRenderer.domElement.style.opacity = '1';
    // } else {
    //   cssObj.element.style.opacity = '0';
    //   cssCamObj.element.style.opacity = '0';
    //   cssHtml.element.style.opacity = '0';
    //   // cssRenderer.domElement.style.opacity = '0';
    // }  

    logic();
  }

  render();
}

animate();

function logic() {
  playAnimation();
  if (isFacingCamera()) {
    cssObj.element.style.opacity = '1';
    cssCamObj.element.style.opacity = '1';
    cssHtml.element.style.opacity = '1';
    // cssRenderer.domElement.style.opacity = '1';
  } else {
    cssObj.element.style.opacity = '0';
    cssCamObj.element.style.opacity = '0';
    cssHtml.element.style.opacity = '0';
    // cssRenderer.domElement.style.opacity = '0';
  }
  if (getActiveSection() == "feature5") {
    cssHtml.element.style.width = loadedModel.scene.scale.x * 5200 + 'px';
    cssHtml.element.style.height = loadedModel.scene.scale.y * 11100 + 'px';
  }
  // loadedModel.scene.rotation.x += 0.01;
  // loadedModel.scene.rotation.y += 0.01;
}

// animation section

function lerp(x, y, a) {
  return x * (1 - a) + y * a
}

function scalePercent(start, end) {
  return (scrollPercent - start) / (end - start)
}

for (let i = 1; i < getPosition().length; i++) {
  animationScripts.push({
      start: getPosition()[i].start,
      end: getPosition()[i].end,
      func: () => {
          camera.position.set(getPosition()[i].cam_x, getPosition()[i].cam_y, getPosition()[i].cam_z)
          loadedModel.scene.position.z = lerp(getPosition()[i - 1].z, getPosition()[i].z, scalePercent(getPosition()[i].start, getPosition()[i].end))
          loadedModel.scene.position.x = lerp(getPosition()[i - 1].x, getPosition()[i].x, scalePercent(getPosition()[i].start, getPosition()[i].end))
          loadedModel.scene.position.y = lerp(getPosition()[i - 1].y, getPosition()[i].y, scalePercent(getPosition()[i].start, getPosition()[i].end))

          loadedModel.scene.rotation.x = lerp(getPosition()[i - 1].rotateX, getPosition()[i].rotateX, scalePercent(getPosition()[i].start, getPosition()[i].end));
          loadedModel.scene.rotation.y = lerp(getPosition()[i - 1].rotateY, getPosition()[i].rotateY, scalePercent(getPosition()[i].start, getPosition()[i].end));
          loadedModel.scene.rotation.z = lerp(getPosition()[i - 1].rotateZ, getPosition()[i].rotateZ, scalePercent(getPosition()[i].start, getPosition()[i].end));

          if (getPosition()[i].screenSideways && !getPosition()[i-1].screenSideways){
            cssHtml.rotation.z = lerp(0, Math.PI / 2, scalePercent(getPosition()[i].start, getPosition()[i].end));
          } else if (!getPosition()[i].screenSideways && getPosition()[i-1].screenSideways) {
            cssHtml.rotation.z = lerp(Math.PI / 2, 0, scalePercent(getPosition()[i].start, getPosition()[i].end));
          } else {
            cssHtml.rotation.z = lerp(cssHtml.rotation.z, 0, scalePercent(getPosition()[i].start, getPosition()[i].end));
          }
          
          if (getPosition()[i].screenSideways){
            cssHtml.element.style.height = loadedModel.scene.scale.x * 5200 + 'px';
            cssHtml.element.style.width = loadedModel.scene.scale.y * 11100 + 'px';
          } else {
            cssHtml.element.style.width = loadedModel.scene.scale.x * 5200 + 'px';
            cssHtml.element.style.height = loadedModel.scene.scale.y * 11100 + 'px';
          }
      },
    })
}

function playAnimation() {
  animationScripts.forEach((script) => {
      if (scrollPercent >= script.start && scrollPercent <= script.end) {
          script.func()
      }
  })
}
window.scrollTo(0);