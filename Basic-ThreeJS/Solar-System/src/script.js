import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pane } from 'tweakpane';

/*==================== Initialize the Scene ==================*/
const scene = new THREE.Scene();
const pane = new Pane();
const textureLoader = new THREE.TextureLoader();

/*============== Initialize the Geometry & Material ==============*/
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const sunTexture = textureLoader.load('/textures/2k_sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
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

/*======= Initialize the Sun Mesh =======*/
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(6);
scene.add(sun);

/*=================== Planets Array ===================== */
const planets = [
  {
    name: 'Mercury',
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: 'Venus',
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: 'Earth',
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: 'Mars',
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: 'Phobos',
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: 'Deimos',
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

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

/* 
? rotate Earth around the Sun
    earth.position.x = Math.sin(elapsedTime) * 12;
    earth.position.z = Math.cos(elapsedTime) * 12;

?rotate Moon around the Earth
    moon.position.x = Math.sin(elapsedTime) * 2;
    moon.position.z = Math.cos(elapsedTime) * 2;
*/
