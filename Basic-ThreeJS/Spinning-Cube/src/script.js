//import an entire module as a single object, under the name "THREE"
import * as THREE from 'three';

//a container for other objects
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#e0b90b' });

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

//making it visible in the 3D environment.
scene.add(cubeMesh);

//initialize the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);
//so far you can imagine that's camera is inside of the Mesh

//now position the camera to see the Mesh
camera.position.z = 5;

//initialize the renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

// set the size of the renderer's output canvas
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

/* ---------------- Mesh() ----------------
- Mesh is a fundamental building block for creating 3D objects. 

- It represents the geometry(shape) and material(appearance) of an object in a 3D scene. 

- Meshes are used to define the visual aspects of 3D models such as cubes, spheres, characters, buildings, or any custom shapes you want to render.
*/

/* -------------- PerspectiveCamera() --------------
- is a type of camera that mimics how the human eye perceives objects in the real world. 

- It creates a sense of depth and distance by rendering objects farther away as smaller than those closer to the camera. 

- This effect is achieved through perspective projection, where objects closer to the camera appear larger and those farther away appear smaller.

? PerspectiveCamera(1-fov, 2-aspect ratio, 3-camera near property, 4-camera far property - anything further from this far property - you won't able to see)

1. Field of View (FOV): how much of the scene is visible to the camera. 
  - A wider FOV captures more of the scene, 
  - while a narrower FOV zooms in on specific details. 
  - It is typically measured in "degrees" and can greatly impact the perception of depth and spatial relationships within the rendered image.

2. Aspect Ratio: defines the proportional relationship between the width and height of the camera's view. 
  - It ensures that objects appear in their correct proportions and prevents distortion in the final image. 
  - By setting the aspect ratio correctly, you can maintain the intended look of the scene without "stretching" or "compressing" objects unnaturally.

3. Camera Near Property: specifies the distance from the camera at which objects will start to be rendered. 
  - Anything closer to the camera than this value will not be visible in the final image. 
  - Setting an appropriate near value is crucial for avoiding clipping or rendering issues with objects that are too close to the camera.

4. Camera Far Property: determines the maximum distance from the camera at which objects will be rendered. 
  - Anything beyond this distance will not be visible in the final image. 
  - By adjusting the far property, you can control how far into the scene objects are rendered, optimizing performance and reducing unnecessary rendering of distant objects.
*/
