//import an entire module as a single object, under the name "THREE"
import * as THREE from 'three';
import { Pane } from 'tweakpane';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//a container for other objects
const scene = new THREE.Scene();
const pane = new Pane();
const textureLoader = new THREE.TextureLoader();

//=================== Initialize the Geometry =====================
const geometry = new THREE.SphereGeometry(1, 32, 32);
const uv2Geometry = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
geometry.setAttribute('uv2', uv2Geometry);

//_______Load the grass textures
const grassAlbedo = textureLoader.load(
  '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png'
);
const grassAo = textureLoader.load(
  '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png'
);
const grassHeight = textureLoader.load(
  '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png'
);
const grassMetallic = textureLoader.load(
  '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png'
);
const grassNormal = textureLoader.load(
  '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png'
);
const grassRoughness = textureLoader.load(
  '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png'
);

//_________Load the boulders textures
const boulderAlbedo = textureLoader.load(
  '/textures/badlands-boulders-bl/badlands-boulders_albedo.png'
);
const boulderAo = textureLoader.load(
  '/textures/badlands-boulders-bl/badlands-boulders_ao.png'
);
const boulderHeight = textureLoader.load(
  '/textures/badlands-boulders-bl/badlands-boulders_height.png'
);
const boulderMetallic = textureLoader.load(
  '/textures/badlands-boulders-bl/badlands-boulders_metallic.png'
);
const boulderNormal = textureLoader.load(
  '/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png'
);
const boulderRoughness = textureLoader.load(
  '/textures/badlands-boulders-bl/badlands-boulders_roughness.png'
);

//________Load the space cruiser textures
const spaceCruiserAlbedo = textureLoader.load(
  '/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png'
);
const spaceCruiserAo = textureLoader.load(
  '/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png'
);
const spaceCruiserHeight = textureLoader.load(
  '/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png'
);
const spaceCruiserMetallic = textureLoader.load(
  '/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png'
);
const spaceCruiserNormal = textureLoader.load(
  '/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png'
);
const spaceCruiserRoughness = textureLoader.load(
  '/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png'
);

//=================== Initialize the Material =====================
//________grass material
const grassPane = pane.addFolder({
  title: 'Grass Material',
  expanded: true,
});

const grassMaterial = new THREE.MeshStandardMaterial({
  map: grassAlbedo,
  roughnessMap: grassRoughness,
  metalnessMap: grassMetallic,
  normalMap: grassNormal,
  displacementMap: grassHeight,
  displacementScale: 0.1,
  aoMap: grassAo,
});

grassPane.addBinding(grassMaterial, 'metalness', {
  min: 0,
  max: 1,
  step: 0.01,
});
grassPane.addBinding(grassMaterial, 'roughness', {
  min: 0,
  max: 1,
  step: 0.01,
});
grassPane.addBinding(grassMaterial, 'displacementScale', {
  min: 0,
  max: 1,
  step: 0.01,
});
grassPane.addBinding(grassMaterial, 'aoMapIntensity', {
  min: 0,
  max: 1,
  step: 0.01,
});

//______boulder Material
const boulderPane = pane.addFolder({
  title: 'Boulder Material',
  expanded: true,
});

const boulderMaterial = new THREE.MeshStandardMaterial({
  map: boulderAlbedo,
  roughnessMap: boulderRoughness,
  metalnessMap: boulderMetallic,
  normalMap: boulderNormal,
  displacementMap: boulderHeight,
  displacementScale: 0.1,
  aoMap: boulderAo,
});

boulderPane.addBinding(boulderMaterial, 'metalness', {
  min: 0,
  max: 1,
  step: 0.01,
});
boulderPane.addBinding(boulderMaterial, 'roughness', {
  min: 0,
  max: 1,
  step: 0.01,
});
boulderPane.addBinding(boulderMaterial, 'displacementScale', {
  min: 0,
  max: 1,
  step: 0.01,
});
boulderPane.addBinding(boulderMaterial, 'aoMapIntensity', {
  min: 0,
  max: 10,
  step: 0.01,
});

//_______space Cruiser Material
const spaceCruiserPane = pane.addFolder({
  title: 'Space Cruiser Material',
  expanded: true,
});

const spaceCruiserMaterial = new THREE.MeshStandardMaterial({
  map: spaceCruiserAlbedo,
  roughnessMap: spaceCruiserRoughness,
  metalnessMap: spaceCruiserMetallic,
  normalMap: spaceCruiserNormal,
  displacementMap: spaceCruiserHeight,
  displacementScale: 0.1,
  aoMap: spaceCruiserAo,
});

spaceCruiserPane.addBinding(spaceCruiserMaterial, 'metalness', {
  min: 0,
  max: 1,
  step: 0.01,
});
spaceCruiserPane.addBinding(spaceCruiserMaterial, 'roughness', {
  min: 0,
  max: 1,
  step: 0.01,
});
spaceCruiserPane.addBinding(spaceCruiserMaterial, 'displacementScale', {
  min: 0,
  max: 1,
  step: 0.01,
});
spaceCruiserPane.addBinding(spaceCruiserMaterial, 'aoMapIntensity', {
  min: 0,
  max: 1,
  step: 0.01,
});

//===================== Initialize the Mesh =======================
const grass = new THREE.Mesh(geometry, grassMaterial);
const boulder = new THREE.Mesh(geometry, boulderMaterial);
boulder.position.x = 2.5;
const spaceCruiser = new THREE.Mesh(geometry, spaceCruiserMaterial);
spaceCruiser.position.x = -2.5;

//________Initialize a Group & Add the Mesh to the scene
const group = new THREE.Group();
group.add(grass, boulder, spaceCruiser);
scene.add(group);

// ================ Initialize the light ============================
const light = new THREE.AmbientLight(0xffffff, 0.08);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(
  pointLight,
  0.5
);
scene.add(pointLightHelper);

pane.addBinding(pointLight, 'color', {
  color: {
    type: 'float',
  },
});
pane.addBinding(pointLight, 'intensity', {
  min: 0,
  max: 70,
  step: 5,
});

/*====================== PerspectiveCamera ========================*/
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
//so far you can imagine that's camera is inside of the Mesh

//now position the camera to see the Mesh
camera.position.z = 10; // 10 units or meters away
camera.position.y = 5;
/*=========================== renderer ============================*/
//initialize the renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  //smooth out jagged edges|achieving higher resolution rendering
});

//set the size of the renderer's output canvas
renderer.setSize(window.innerWidth, window.innerHeight);
//achieving higher resolution rendering
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);
// shadows
renderer.shadowMap.enabled = true;

/*========================= OrbitControls =========================*/
//initialize the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.dampingFactor = 0.8; //default is "0.05"
// controls.autoRotate = true;
// controls.autoRotateSpeed = 1; //default is "2"
// controls.enableZoom = true; //default is "false"

/*================ resize the camera aspectRatio  =================*/
//resize the camera aspectRatio when resizing the window
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  //Must be called after any change of parameters.
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/*================= render loop - make it animated ================*/
const renderLoop = () => {
  // rotate Meshes
  group.children.forEach((child) => {
    child.rotation.y += 0.001;
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
  //wait until you're able to produce this frame and then call myself again
};

renderLoop();
