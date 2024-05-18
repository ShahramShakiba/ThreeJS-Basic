import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pane } from 'tweakpane';

/*==================== Initialize the Scene ==================*/
const scene = new THREE.Scene();
const pane = new Pane();
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/textures/cubeMap/');

/*============== Initialize the Geometry & Material ==============*/
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const sunTexture = textureLoader.load('/textures/2k_sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
  aoMap: sunTexture,
});

pane.addBinding(sunMaterial, 'aoMapIntensity', {
  min: 0,
  max: 2,
  step: 0.01,
});

const mercuryTexture = textureLoader.load('/textures/2k_mercury.jpg');
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});

const venusTexture = textureLoader.load('/textures/2k_venus_surface.jpg');
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});

const earthTexture = textureLoader.load('/textures/2k_earth_daymap.jpg');
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});

const marsTexture = textureLoader.load('/textures/2k_mars.jpg');
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});

const moonTexture = textureLoader.load('/textures/2k_moon.jpg');
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});

const backgroundCubeMap = cubeTextureLoader.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png',
]);
scene.background = backgroundCubeMap;

/*======= Initialize the Sun Mesh =======*/
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(8);
scene.add(sun);

/*=================== Planets Array ===================== */
const planets = [
  {
    name: 'Mercury',
    radius: 0.9,
    distance: 14,
    speed: 0.005,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: 'Venus',
    radius: 1.2,
    distance: 19,
    speed: 0.004,
    material: venusMaterial,
    moons: [],
  },
  {
    name: 'Earth',
    radius: 1.4,
    distance: 25,
    speed: 0.002,
    material: earthMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 3,
        speed: 0.005,
      },
    ],
  },
  {
    name: 'Mars',
    radius: 1.1,
    distance: 33,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: 'Phobos',
        radius: 0.1,
        distance: 2,
        speed: 0.002,
      },
      {
        name: 'Deimos',
        radius: 0.2,
        distance: 3,
        speed: 0.004,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Shahram'Planet",
    radius: 2.2,
    distance: 42,
    speed: 0.004,
    material: mercuryMaterial,
    moons: [],
  },
];

//=============== Creating Planet
const createPlanet = (planet) => {
  //Create the Mesh
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
  //Set the Scale
  planetMesh.scale.setScalar(planet.radius);
  //Set the Distance
  planetMesh.position.x = planet.distance;

  return planetMesh;
};

//=============== Creating Moon
const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;

  return moonMesh;
};

const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);
  scene.add(planetMesh);

  //Loop through each Moon
  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });

  return planetMesh;
});

/*==================== Initialize the Light ==================*/
const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xfffbc8, 300);
scene.add(pointLight);

pane.addBinding(pointLight, 'color', {
  color: {
    type: 'float',
  },
});
pane.addBinding(pointLight, 'intensity', {
  min: 0,
  max: 1000,
  step: 5,
});

/*==================== Initialize the Camera ==================*/
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

/*=================== Initialize the Renderer =================*/
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
//achieving higher resolution rendering
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

/*========================= Add Controls ======================*/
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

/*===================== Add Resize Listener ==================*/
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/*==================== Render Loop  ==========================*/
const renderLoop = () => {
  sun.rotation.y += 0.001;

  planetMeshes.forEach((planet, planetIndex) => {
    planet.rotation.y += planets[planetIndex].speed;

    planet.position.x =
      Math.sin(planet.rotation.y) * planets[planetIndex].distance;
    planet.position.z =
      Math.cos(planet.rotation.y) * planets[planetIndex].distance;

    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed;

      moon.position.x =
        Math.sin(moon.rotation.y) *
        planets[planetIndex].moons[moonIndex].distance;
      moon.position.z =
        Math.cos(moon.rotation.y) *
        planets[planetIndex].moons[moonIndex].distance;
    });
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};
renderLoop();

