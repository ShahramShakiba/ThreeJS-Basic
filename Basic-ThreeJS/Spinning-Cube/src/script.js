//import an entire module as a single object, under the name "THREE"
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//a container for other objects
const scene = new THREE.Scene();

//add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: '#e0b90b',
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

//making it visible in the 3D environment.
scene.add(cubeMesh);

//initialize the camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight, // actual screen size
  0.1,
  200
);
//so far you can imagine that's camera is inside of the Mesh

//now position the camera to see the Mesh
camera.position.z = 5; // 5 units or 5 meters away

//initialize the renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

//set the size of the renderer's output canvas
renderer.setSize(window.innerWidth, window.innerHeight);

//initialize the controls | read document for more
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.8; //default is "0.05"
controls.autoRotate = true;
controls.autoRotateSpeed = 10; //default is "2"
controls.enableZoom = true; //default is "false"

//loop through our obj - make it animated
const renderLoop = () => {
  //call update when enabling damping
  controls.update();

  //anytime U made a change to the scene, do it before calling the render
  renderer.render(scene, camera);

  window.requestAnimationFrame(renderLoop); //60frames per second experience
  //wait until you're able to produce this frame and then call myself again
};

renderLoop();

/* ========================= Mesh() ==========================
- Mesh is a fundamental building block for creating 3D objects. 

- It represents the geometry(shape) and material(appearance) of an object in a 3D scene. 

- Meshes are used to define the visual aspects of 3D models such as cubes, spheres, characters, buildings, or any custom shapes you want to render.
*/

/* ======================= PerspectiveCamera() =======================
- is a type of camera that mimics how the human eye perceives objects in the real world. 

- It creates a sense of depth and distance by rendering objects farther away as smaller than those closer to the camera. 

- This effect is achieved through perspective projection, where objects closer to the camera appear larger and those farther away appear smaller.

? PerspectiveCamera(1-fov, 2-aspect ratio, 3-camera near property, 4-camera far property)

1. Field of View (FOV): Camera frustum vertical field of view.
  - how much of the scene is visible to the camera. 
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

/* ======================= WebGLRenderer() =======================
?- WebGL IS A JavaScript API for rendering 3D graphics in a web browser using the GPU

- WebGL provides a language to talk to the GPU and instruct it on what to render
?- GPU:
  Graphic Processing Unit
  a special type of hardware that can run simple calculations in parallel
  designed to handle the demands of rendering 3D graphics

- The WebGLRenderer is a crucial component in Three.js that enables rendering 3D graphics using WebGL, a web standard for high-performance graphics rendering.

- it leverages the power of WebGL to render complex 3D scenes efficiently in a web browser. 
- WebGL provides direct access to the GPU, allowing for hardware-accelerated rendering, which is essential for achieving smooth and visually appealing 3D graphics.
*/

/* ======================= near & far vs position =======================
? what is the "far-prop" that I can't see this box?
- for example: "3" -> anything beyond 3 I can't see it
  because if we set {far to 3} it means we only can see the box in range of 3 units, however we set the {position to 5} so the camera is more far away from over box

? what is the "near-prop" that I can't see this box?
- fro example: "5" -> since we set the {position to 5} it means the camera is positioned 5 units away and that's the "center of the object" so if we set {near to 5} we can't see anything but since the object in cubeGeometry sets as 1 by 1 by 1, it still exists within 4.5 units of the actual camera
*/

/* ======================= OrbitControls() ======================= 
? OrbitControls(camera, domElement)
- Orbit controls allow the camera to orbit(rotate) around a target.

? enableDamping:
- refers to a mechanism that introduces a gradual decrease in a certain parameter or behavior over time.

- When damping is enabled, it introduces a smoothing effect to the movement of the camera controlled by OrbitControls. 
- This can be particularly useful when you want to avoid abrupt or jerky movements, providing a more fluid and natural interaction experience for users.
*/

/* ======================= requestAnimationFrame() ======================= 
- used in web development to optimize animations and improve performance by synchronizing them with the browser's repaint cycle.

- is a method provided by the browser that allows developers to schedule an animation frame to be rendered on the next repaint cycle of the browser. 
- This is crucial for creating smooth and efficient animations on web pages as it ensures that the animations are synchronized with the display refresh rate, leading to better performance and visual quality.
*/
