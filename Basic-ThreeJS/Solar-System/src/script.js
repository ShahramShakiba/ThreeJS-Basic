import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pane } from 'tweakpane';

/*==================== Initialize the Scene ==================*/
const scene = new THREE.Scene();
const pane = new Pane();

/*============== Initialize the Geometry & Material ==============*/
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xd1b01f,
});
const earthMaterial = new THREE.MeshBasicMaterial({
  color: 'blue',
});
const moonMaterial = new THREE.MeshBasicMaterial({
  color: 'white',
});

/*============== Initialize the Mesh ==============*/
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(6);

const earth = new THREE.Mesh(sphereGeometry, earthMaterial);
earth.position.x = 10;
earth.scale.setScalar(1.6);

const moon = new THREE.Mesh(sphereGeometry, moonMaterial);
moon.position.x = 2;
moon.scale.setScalar(0.4);
earth.add(moon);

const group = new THREE.Group();
group.add(sun, earth);
scene.add(group);

/*==================== Initialize the Camera ==================*/
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

/*=================== Initialize the Renderer =================*/
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/*========================= Add Controls ======================*/
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;
// controls.dampingFactor = 0.8; //default is "0.05"
// controls.autoRotate = true;
// controls.autoRotateSpeed = 1; //default is "2"
// controls.enableZoom = true; //default is "false"

/*===================== Add Resize Listener ==================*/
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/*==================== Render Loop  ==========================*/
const renderLoop = () => {
  // rotate Meshes
  // group.children.forEach((child) => {
  //   child.rotation.y += 0.001;
  // });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();