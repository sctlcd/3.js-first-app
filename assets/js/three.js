import * as THREE from './../../node_modules/three/build/three.module.js';
// import { TrackballControls } from './../../node_modules/three/examples/jsm/controls/TrackballControls';
import { TrackballControls } from "https://cdn.skypack.dev/three-trackballcontrols-ts@0.2.3";

// creating the scene
// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000);

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.8, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// creating the box
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);

// vertexColors must be true so vertex colors can be used in the shader
const boxMaterial = new THREE.MeshLambertMaterial({vertexColors: true});

// generate color data for each vertex
const positionAttribute = boxGeometry.getAttribute('position');

const colors = [];
const color = new THREE.Color();

for (let i = 0; i < positionAttribute.count; i += 3) {
  color.set(Math.random() * 0xffffff);
  
  // define the same color for each vertex of a triangle
  colors.push(color.r, color.g, color.b);
  colors.push(color.r, color.g, color.b);
  colors.push(color.r, color.g, color.b);
}

// define the new attribute
boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.geometry.colorsNeedUpdate = true;
boxMesh.rotation.set(40, 0, 40);
scene.add(boxMesh);

// create spheres
const sphereMeshes = [];
const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0xC56CEF});
for (let i=0; i<4; i++) {
  sphereMeshes[i] = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMeshes[i].position.set(0, 0, 0);
  scene.add(sphereMeshes[i]);
}

// lights
const lights = [];
const lightHelpers = [];
const lightValues = [
  {intensity: 8, dist: 12, x: 1, y: 0, z: 8},
  {intensity: 6, dist: 12, x: -2, y: 1, z: -10},
  {intensity: 3, dist: 10, x: 0, y: 10, z: 1},
  {intensity: 6, dist: 12, x: 0, y: -10, z: -1},
  {intensity: 6, dist: 12, x: 10, y: 3, z: 0},
  {intensity: 6, dist: 12, x: -10, y: -1, z: 0}
];
for (let i=0; i<6; i++) {
  const color = new THREE.Color(0xffffff);

  lights[i] = new THREE.PointLight(
    color, 
    lightValues[i]['intensity'], 
    lightValues[i]['dist']);
  lights[i].position.set(
    lightValues[i]['x'], 
    lightValues[i]['y'], 
    lightValues[i]['z']);
  scene.add(lights[i]);
  console.log(lights[i].color);

  // light Helpers
  lightHelpers[i] = new THREE.PointLightHelper(lights[i], 0.6);
  scene.add(lightHelpers[i]);

  // axes Helper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper); // X == red, Y == green, Z == blue
}

// trackball Controls for Camera 
const controls = new TrackballControls(camera, renderer.domElement); 
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

// make canvas responsive
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

// trigonometry Constants for Orbital Paths 
let theta = 0; // Current angle
// Angle increment on each render
const dTheta = 2 * Math.PI / 100;

// rendering the scene
function rendering() {
  // Rerender every time the page refreshes (pause when on another tab)
  requestAnimationFrame(rendering);

  // update trackball controls
  controls.update();

  scene.rotation.x += 0.002;
  scene.rotation.y += 0.02;

  //Increment theta, and update sphere coords based off new value        
  theta += dTheta;

  // Store trig functions for sphere orbits 
    // MUST BE INSIDE RENDERING FUNCTION OR THETA VALUES ONLY GET SET ONCE
    const trigs = [
      {x: Math.cos(theta*1.05), y: Math.sin(theta*1.05), z: Math.cos(theta*1.05), r: 2},
      {x: Math.cos(theta*0.8), y: Math.sin(theta*0.8), z: Math.sin(theta*0.8), r: 2.25},
      {x: Math.cos(theta*1.25), y: Math.cos(theta*1.25), z: Math.sin(theta*1.25), r: 2.5},
      {x: Math.sin(theta*0.6), y: Math.cos(theta*0.6), z: Math.sin(theta*0), r: 2.75}
  ];
  
  // Loop 4 times (for each sphere), updating the position 
  for (let i=0; i<4; i++) {
    sphereMeshes[i].position.x = trigs[i]['r'] * trigs[i]['x'];
    sphereMeshes[i].position.y = trigs[i]['r'] * trigs[i]['y'];
    sphereMeshes[i].position.z = trigs[i]['r'] * trigs[i]['z'];
};

  renderer.render(scene, camera);
};

rendering();

