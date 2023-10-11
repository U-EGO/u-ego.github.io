import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 45;

// lights
const light = new THREE.AmbientLight( 0x404040, 50 ); // soft white light
scene.add( light );

// const pointLight = new THREE.PointLight( 0xffffff, 1000 );
// camera.add( pointLight );
scene.add( camera );

let loadedModel;
const gltfLoader = new GLTFLoader();

gltfLoader.load( 'img/models/scene.gltf', function ( gltf ) {
  loadedModel = gltf;
  scene.add( gltf.scene );
  loadedModel.scene.scale.set(0.05, 0.05, 0.05);
});

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000, 0);
renderer.domElement.id = "renderer";
renderer.domElement.className = "renderer";
document.getElementById("container").appendChild( renderer.domElement );

function animate() {
  requestAnimationFrame( animate );
  if (loadedModel) {
    loadedModel.scene.rotation.y += 0.01;
  }
  renderer.render( scene, camera );
}

animate();
