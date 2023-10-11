// simple three.js example of an html page on a cube with the camera rotating around it
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth * 0.5, window.innerHeight * 0.5 );
renderer.setClearColor( 0x000000, 1 );
document.body.appendChild( renderer.domElement );

const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
canvas.style.backgroundColor = '#000000';
canvas.style.border = '1px solid #ffffff';

const ctx = canvas.getContext('2d');
ctx.fillStyle = '#ffffff';
ctx.font = '48px serif';
ctx.fillText('Hello, world!', 100, 100);

const texture = new THREE.CanvasTexture(canvas);
const material = new THREE.MeshBasicMaterial({ map: texture });
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  camera.lookAt( scene.position );

  renderer.render( scene, camera );
}

animate();
