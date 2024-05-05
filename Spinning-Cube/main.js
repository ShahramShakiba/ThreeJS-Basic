//import an entire module as a single object, under the name "THREE" 
import * as THREE from 'three';

//a container for other objects
const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // w, h, depth
const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#242424' });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

//making it visible in the 3D environment.
scene.add(cubeMesh);
console.log(scene);

/* -------------- Mesh --------------
- Mesh is a fundamental building block for creating 3D objects. 

- It represents the geometry(shape) and material(appearance) of an object in a 3D scene. 

- Meshes are used to define the visual aspects of 3D models such as cubes, spheres, characters, buildings, or any custom shapes you want to render.

*/