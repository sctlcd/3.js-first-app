import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.144.0/three.module.js';
// import { TrackballControls } from './../../node_modules/three/examples/jsm/controls/TrackballControls';
import { TrackballControls } from "https://cdn.skypack.dev/three-trackballcontrols-ts@0.2.3";

// create the scene
// scene
const scene = new THREE.Scene(); // define scene
const sceneTexture = new THREE.TextureLoader().load('https://i.imgur.com/P7z3aw1.jpeg'); // define texture
scene.background = sceneTexture // set scene background

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.8, 1000);
camera.position.z = 16; // set camera position

// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // add renderer to HTML as a canvas element

// make canvas responsive
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight); // update size
  camera.aspect = window.innerWidth / window.innerHeight; // update aspect ratio
  camera.updateProjectionMatrix(); // apply changes
})

// create the box
const boxGeometry = new THREE.SphereGeometry( 1.6, 32, 32 ); // define geometry
const boxTexture = new THREE.TextureLoader().load('https://i.imgur.com/sSZc7Yr.png'); // define texture
const boxMaterial = new THREE.MeshStandardMaterial({map : boxTexture, overdraw: 0.1}); // define material // simple white box

const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); // build box
boxMesh.rotation.set(40, 0, 40); // set box initial rotation
scene.add(boxMesh); // add box to canvas

// create orbiting spheres
const sphereMeshes = [];
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32); // define geometry
const sphereTexture = new THREE.TextureLoader().load('https://i.imgur.com/5FbL240.jpeg'); // define texture
const sphereMaterial = new THREE.MeshLambertMaterial({map : sphereTexture, overdraw: 0.5}); // define material
for (let i=0; i<4; i++) {
  sphereMeshes[i] = new THREE.Mesh(sphereGeometry, sphereMaterial); // build sphere
  sphereMeshes[i].position.set(0, 0, 0);
  scene.add(sphereMeshes[i]); // add sphere to canvas
}

// lights
const lights = []; // storage for lights
const lightHelpers = []; // storage for light helpers

// properties for each light
const lightValues = [
  {intensity: 8, dist: 12, x: 1, y: 0, z: 8},
  {intensity: 6, dist: 12, x: -2, y: 1, z: -10},
  {intensity: 3, dist: 10, x: 0, y: 10, z: 1},
  {intensity: 4, dist: 12, x: 0, y: -10, z: -1},
  {intensity: 7, dist: 12, x: 10, y: 3, z: 0},
  {intensity: 2, dist: 12, x: -10, y: -1, z: 0}
];
for (let i=0; i<6; i++) {
  // loop 6 times to add each light to lights array
  // generate color data for each vertex
  const positionAttribute = boxGeometry.getAttribute('position');

  const colors = [];
  const color = new THREE.Color();

  for (let i = 0; i < positionAttribute.count; i += 3) {
    color.set(Math.random() * 0xFFFFFF);
    
    // define the same color for each vertex of a triangle
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
  }

  // define the new attribute
  boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  // using the lightValues array to input properties
  lights[i] = new THREE.PointLight(
    color, 
    lightValues[i]['intensity'], 
    lightValues[i]['dist']);
  lights[i].position.set(
    lightValues[i]['x'], 
    lightValues[i]['y'], 
    lightValues[i]['z']);

  scene.add(lights[i]); // add sphere to canvas

  // add light helpers for each light
  lightHelpers[i] = new THREE.PointLightHelper(lights[i], 0.6);
  // scene.add(lightHelpers[i]);

  // // axes helper
  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper); // X == red, Y == green, Z == blue
}

// trackball controls for camera 
const controls = new TrackballControls(camera, renderer.domElement); 
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

// trigonometry constants for orbital paths 
let theta = 0; // current angle
// angle increment on each render
const dTheta = 2 * Math.PI / 100;

// rendering the scene
function rendering() {
  // rerender every time the page refreshes (pause when on another tab)
  requestAnimationFrame(rendering);

  // update trackball controls
  controls.update();

  scene.rotation.x += 0.002;
  scene.rotation.y += 0.02;

  // increment theta, and update sphere coords based off new value        
  theta += dTheta;

  // store trig functions for sphere orbits 
    // MUST BE INSIDE RENDERING FUNCTION OR THETA VALUES ONLY GET SET ONCE
    const trigs = [
      {x: Math.cos(theta*1.05), y: Math.sin(theta*1.05), z: Math.cos(theta*1.05), r: 2},
      {x: Math.cos(theta*0.8), y: Math.sin(theta*0.8), z: Math.sin(theta*0.8), r: 2.25},
      {x: Math.cos(theta*1.25), y: Math.cos(theta*1.25), z: Math.sin(theta*1.25), r: 2.5},
      {x: Math.sin(theta*0.6), y: Math.cos(theta*0.6), z: Math.sin(theta*0), r: 2.75}
  ];
  
  // loop 4 times (for each sphere), updating the position 
  for (let i=0; i<4; i++) {
    sphereMeshes[i].position.x = trigs[i]['r'] * trigs[i]['x'];
    sphereMeshes[i].position.y = trigs[i]['r'] * trigs[i]['y'];
    sphereMeshes[i].position.z = trigs[i]['r'] * trigs[i]['z'];
};

  renderer.render(scene, camera);
};

rendering();

