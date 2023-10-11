import * as THREE from 'three';
import * as MTLL from './libs/MTLLoader.js';
import * as OBJL from './libs/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// add a light
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const pointLight = new THREE.PointLight( 0xffffff, 15 );
camera.add( pointLight );
scene.add( camera );

camera.position.z = 5;

const onProgress = function ( xhr ) {

					if ( xhr.lengthComputable ) {

						const percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				};
let obj = new THREE.Object3D();
let iphone;
new MTLL.MTLLoader().setPath("img/phone/").load( 'iphone.mtl', function ( materials ) {
  materials.preload();
  
  new OBJL.OBJLoader().setMaterials( materials).setPath( 'img/phone/' ).load( 'iphone.obj', function ( object ) {
    iphone = object;
    object.scale.set(0.5, 0.5, 0.5);
    obj.add(object);
  }, onProgress);
});

scene.add(obj);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000, 0);
renderer.domElement.id = "renderer";
renderer.domElement.className = "renderer";
document.getElementById("container").appendChild( renderer.domElement );

function animate() {
	requestAnimationFrame( animate );
 
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

  cube.position.x += 0.01;

  // make the cube smaller
  cube.scale.x -= 0.001;
  cube.scale.y -= 0.001;
  cube.scale.z -= 0.001;

  if (iphone) {
    iphone.rotation.y += 0.01;
    iphone.rotation.x += 0.01;
  }
	renderer.render( scene, camera );
}

animate();
