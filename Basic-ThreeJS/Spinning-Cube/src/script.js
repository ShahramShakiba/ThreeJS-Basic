//import an entire module as a single object, under the name "THREE"
import * as THREE from 'three';
import { Pane } from 'tweakpane';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//a container for other objects
const scene = new THREE.Scene();
const pane = new Pane();

//=========== Initialize the Material
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
});

//=========== Initialize the Mesh
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
const circleGeometry = new THREE.CircleGeometry(0.5, 32);

const box = new THREE.Mesh(boxGeometry, material);
box.position.x = -2;
box.castShadow = true;

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 0;
sphere.castShadow = true;

const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = 2;
torusKnot.castShadow = true;

const circle = new THREE.Mesh(circleGeometry, material);
circle.scale.setScalar(20);
circle.position.y = -2;
circle.rotation.x = -Math.PI / 2;
circle.receiveShadow = true;

scene.add(box, sphere, torusKnot, circle);

//==================== Initialize the light ============================
//_____________direction-light____________________
const directionalLight = new THREE.DirectionalLight(0xff0000, 0.6);
directionalLight.position.set(3, 10, 15);
scene.add(directionalLight);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.radius = 5;

directionalLight.shadow.camera.left = -1;
directionalLight.shadow.camera.right = 1;
directionalLight.shadow.camera.top = 1;
directionalLight.shadow.camera.bottom = -1;

const directionLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(directionLightCameraHelper);
directionLightCameraHelper.visible = false;

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );
// scene.add(directionalLightHelper);

//_____________point-light______________
const pointLight = new THREE.PointLight(0x00ff00, 10);
pointLight.position.set(-3, 2, -3);
scene.add(pointLight);
pointLight.castShadow = true;

pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.radius = 5;

// pointLight.shadow.camera.near = 10;
pointLight.shadow.camera.far = 30;


const pointLightCameraHelper = new THREE.CameraHelper(
  pointLight.shadow.camera
);
scene.add(pointLightCameraHelper);

// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);

//______________spot-light_________________
const spotLight = new THREE.SpotLight(0x0000ff, 70, 80, Math.PI * 0.1);
spotLight.position.set(8, 4, 4);
spotLight.target.position.set(0, -1, 0);
scene.add(spotLight);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024; // default is 512
spotLight.shadow.mapSize.height = 1024;
// to fix pixelated effect of shadows, if you have less shadows use -> 1024
// if you have a lot of shadows -> stick to shadow maps of a lower resolution

spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 50;
spotLight.shadow.camera.fov = 30;

//blur the edges of the shadows
spotLight.shadow.radius = 5;

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(spotLightCameraHelper);

/*====================== PerspectiveCamera ========================*/
const camera = new THREE.PerspectiveCamera(
  55,
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
  // group.children.forEach((child) => {
  //   child.rotation.y += 0.003;
  // });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
  //wait until you're able to produce this frame and then call myself again
};

renderLoop();
