import * as THREE from 'three';
import { Pane } from 'tweakpane';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/*=============== Initialize the Scene =================*/
const scene = new THREE.Scene();
const pane = new Pane();

/*=============== Add Loaders =================*/
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('textures/');

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
gltfLoader.setDRACOLoader(dracoLoader);

/*============== Add the Environment Map ===============*/
const envMap = cubeTextureLoader.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png',
]);
scene.background = envMap;
scene.environment = envMap;

/*============== Initialize the Geometry & Material ==============*/
gltfLoader.load('/models/boomBoxDraco/BoomBox.gltf', (gltf) => {
  const modelScene = gltf.scene;
  modelScene.scale.setScalar(50);

  scene.add(modelScene);
});

/*============== Initialize the Light ===============*/
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(7, 10, 2);
scene.add(directionalLight);

/*============== Initialize the Camera ===============*/
const camera = new THREE.PerspectiveCamera(
  85,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;
camera.position.y = 0.5;

/*============== Initialize the Renderer ===============*/
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/*============== Instantiate the Controls ===============*/
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/*================= Add Resize Listener =================*/
window.addEventListener('resize', () => {
  camera.updateProjectionMatrix();
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/*================= Render the Scene  ===================*/
const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
