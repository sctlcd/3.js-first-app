import * as THREE from './../../node_modules/three/build/three.module.js';
// import { TrackballControls } from './../../node_modules/three/examples/jsm/controls/TrackballControls.js';

// creating the scene
// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.8, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143");
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// creating the box
const boxGeometry = new THREE.BoxGeometry( 2, 2, 2 );
const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.rotation.set(40, 0, 40);
scene.add(boxMesh);

// Lights
const lights = [];
const lightValues = [
    {colour: 0x02065e, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
    {colour: 0x11A3C4, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
    {colour: 0x5B00C8, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
    {colour: 0x595252, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
    {colour: 0x5e0202, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
    {colour: 0xFFCD00, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
];
for (let i=0; i<6; i++) {
    lights[i] = new THREE.PointLight(
        lightValues[i]['colour'], 
        lightValues[i]['intensity'], 
        lightValues[i]['dist']);
    lights[i].position.set(
        lightValues[i]['x'], 
        lightValues[i]['y'], 
        lightValues[i]['z']);
    scene.add(lights[i]);
}

// rendering the scene
function rendering() {
  requestAnimationFrame( rendering );

  scene.rotation.x += 0.02;
  scene.rotation.y += 0.02;

  renderer.render( scene, camera );
};

rendering();

// Make canvas responsive
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

