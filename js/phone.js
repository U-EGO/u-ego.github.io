import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
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
phoneHtml.style.backgroundColor = 'rgba(0,255,0)';
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

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000, 0);
renderer.domElement.id = "renderer";
renderer.domElement.className = "renderer";
document.getElementById("container").appendChild( renderer.domElement );

let cssRenderer = new CSS3DRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.id = "renderer";
cssRenderer.domElement.className = "renderer";
document.getElementById("container").appendChild( cssRenderer.domElement );

function animate() {
  requestAnimationFrame( animate );
  if (loadedModel) {
    // get the absolute position of cssObj
    let vector = new THREE.Vector3();
    vector.setFromMatrixPosition( cssObj.matrixWorld );

    // get the absolute position of loadedModel
    let vector2 = new THREE.Vector3();
    vector2.setFromMatrixPosition( loadedModel.scene.matrixWorld );

    // if loadedModel is in front of cssObj, then hide cssObj
    if (vector.z+0.002 > vector2.z) {
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

    logic();
  }

  cssRenderer.render( scene, camera );
  renderer.render( scene, camera );
}

animate();

function logic() {
  loadedModel.scene.rotation.y += 0.01;
  // document.getElementById("phoneHTML").style.background = "rgba("+(Math.random()*256)+","+(Math.random()*256)+"," + ( Math.random() * 256 ) + ")";
}

document.getElementById("phoneButton").addEventListener("click", function() {
  alert("button clicked");
});
