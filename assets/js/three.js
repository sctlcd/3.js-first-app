import * as THREE from './../../node_modules/three/build/three.module.js';
// import { TrackballControls } from '../../node_modules/three/examples/jsm/controls/TrackballControls.js';

// creating the scene
// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000);

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.8, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143");
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

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
boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute(colors, 3));

const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.geometry.colorsNeedUpdate = true;
boxMesh.rotation.set(40, 0, 40);
scene.add(boxMesh);

// Lights
const lights = [];
const lightValues = [
  {intensity: 8, dist: 12, x: 1, y: 0, z: 8},
  {intensity: 6, dist: 12, x: -2, y: 1, z: -10},
  {intensity: 3, dist: 10, x: 0, y: 10, z: 1},
  {intensity: 6, dist: 12, x: 0, y: -10, z: -1},
  {intensity: 6, dist: 12, x: 10, y: 3, z: 0},
  {intensity: 6, dist: 12, x: -10, y: -1, z: 0}
];
for (let i=0; i<6; i++) {
  const color = new THREE.Color( 0xffffff );

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
}

// //Trackball Controls for Camera 
// const controls = new TrackballControls(camera, renderer.domElement); 
// controls.rotateSpeed = 4;
// controls.dynamicDampingFactor = 0.15;

// rendering the scene
function rendering() {
  requestAnimationFrame( rendering );

  // Update trackball controls
  // controls.update();

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

