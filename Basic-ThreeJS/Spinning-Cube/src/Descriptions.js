/* %%%%%%%%%%%%%%%%%%%%%%%% Three.js %%%%%%%%%%%%%%%%%%%%%%%%%%
* is a high-level JavaScript library for creating and displaying 3D graphics in web browsers.

Purpose :
- simplifies 3D graphics creation and animation (models, particle systems, lights, camera) without low-level WebGL code knowledge.
*/

/* %%%%%%%%%%%%%%%%%% Graphic Processing %%%%%%%%%%%%%%%%%%%%%%
? What is graphic processing?
- The process of rendering 3D graphics on a computer screen in real-time 
- Requires millions of calculations per second
*/

/* %%%%%%%%%%%%%%%%%%%%%%%% GPU %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
* stands for Graphic-Processing-Unit

- A special type of "hardware" that can run simple calculations in parallel
- Designed to handle the demands of rendering 3D graphics
*/

/* %%%%%%%%%%%%%%%%%%%%%%%% WebGL %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
* WebGL is a JavaScript API for rendering 3D graphics in a web browser using the GPU

- WebGL provides a language to talk to the GPU and instruct it on what to render

- Three.js is built on top of WebGL and implements it under the hood.

- Three.js abstracts the complicated WebGL language into an easy-to-use API allowing for creative focus on projects
*/

/* %%%%%%%%%%%%%%%%%%%%% Install Three.js %%%%%%%%%%%%%%%%%%%%%%%%
*1: three.js
npm install --save three

*2: vite
npm install --save-dev vite
or 
npm create vite@latest

*3: import
import * as THREE from 'three';
*/

/* %%%%%%%%%%%%%%%%%%%%%%%% Scene %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
* It acts as a container that holds everything you want to render in your 3D environment. 
- The scene serves as the "canvas" on which you can build and manipulate your 3D world.

const scene = new THREE.Scene();
*/

/* %%%%%%%%%%%%%%%%%%%%%%%% Mesh %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
* Mesh is a fundamental building block for creating 3D objects. 

- It represents the "Geometry(shape)" and "Material(appearance)" of an object in a 3D scene. 

- Meshes are used to define the visual aspects of 3D models such as cubes, spheres, characters, buildings, or any custom shapes you want to render.

const cubeMesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),  // Geometry
  new THREE.MeshBasicMaterial({ color: 'red' })  // Material
);
scene.add(cubeMesh);
*/

/* %%%%%%%%%%%%%%%%%%%%%%% Camera %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
* defines the viewpoint from which the scene will be rendered. It determines what will be visible to the viewer and how objects in the scene will be projected onto the screen. 

- There are different types of cameras available in three.js, such as "PerspectiveCamera" and "OrthographicCamera", each offering unique ways to view and interact with the 3D scene.

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  100
);
/-> move the camera back from the exact position of the Mesh 
camera.position.z = 5;
scene.add(camera);
-> U can add or omit the Camera from some 3D-Objects 
*/

/* %%%%%%%%%%%%%%%%%%%%%%% Renderer %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*  is responsible for taking the 3D scene and rendering it onto a "2D canvas" for display on the screen.

- It handles tasks like converting 3D objects into 2D images, applying lighting and shading effects, and optimizing performance for smooth rendering.

? add our Canvas-> where we draw our 3D-objects | displaying our image
in HTML.index:
<canvas class="threejs"></canvas>

in script.js:
const canvas = document.querySelector('canvas.threejs')


* The "WebGLRenderer" is a crucial component in Three.js that enables rendering 3D graphics using WebGL, a web standard for high-performance graphics rendering.

- it leverages the power of WebGL to render complex 3D scenes efficiently in a web browser. 
- WebGL provides direct access to the GPU, allowing for hardware-accelerated rendering, which is essential for achieving smooth and visually appealing 3D graphics.

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

/-> define the dimensions of a rendering area
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera);
*/

/* %%%%%%%%%%%%%%%%%%%%%% PerspectiveCamera %%%%%%%%%%%%%%%%%%%%%%%
* is a type of camera that mimics how the human eyes perceives objects in the real world. 

- It creates a sense of "depth" and "distance" by rendering objects farther away as smaller than those closer to the camera. 

- This effect is achieved through perspective projection, where objects closer to the camera appear larger and those farther away appear smaller.

* PerspectiveCamera(1-fov, 2-aspect ratio, 3-camera near property, 4-camera far property)

?1. Field of View (FOV): Camera frustum{the viewing volume} vertical field of view.
  - how much of the scene is visible to the camera. 
  - A wider FOV captures more of the scene, 
  - while a narrower FOV zooms in on specific details. 
  - It is typically measured in "degrees" and can greatly impact the perception of depth and spatial relationships within the rendered image.

?2. Aspect Ratio: defines the proportional relationship between the width and height of the camera's view. 
  - It ensures that objects appear in their correct proportions and prevents distortion in the final image. 
  - By setting the aspect ratio correctly, you can maintain the intended look of the scene without "stretching" or "compressing" objects unnaturally.

?3. Camera Near Property: specifies the distance from the camera at which objects will start to be rendered. 
  - Anything closer to the camera than this value will not be visible in the final image. 
  - Setting an appropriate near value is crucial for avoiding clipping or rendering issues with objects that are too close to the camera.

?4. Camera Far Property: determines the maximum distance from the camera at which objects will be rendered. 
  - Anything beyond this distance will not be visible in the final image. 
  - By adjusting the far property, you can control how far into the scene objects are rendered, optimizing performance and reducing unnecessary rendering of distant objects.
*/

/* %%%%%%%%%%%%%%%%%%%%% near&far vs position %%%%%%%%%%%%%%%%%%%%%
? what is the "far-prop" that I can't see this box?
- for example: "3" -> anything beyond 3 I can't see it
  because if we set {far to 3} it means we only can see the box in range of 3 units, however we set the {position to 5} so the camera is more far away from over box so we can not see anything 

? what is the "near-prop" that I can't see this box?
- for example: "5" -> since we set the {position to 5} it means the camera is positioned 5 units away and that's the "center of the object" so if we set {near to 5} we can't see anything but since the object in cubeGeometry sets as 1 by 1 by 1, it still exists within 4.5 units of the actual camera
*/

/* %%%%%%%%%%%%%%%%%%%%% Orbit Controls %%%%%%%%%%%%%%%%%%%%%%%%%%%
? OrbitControls(camera, domElement)
* Orbit controls allow the camera to orbit(rotate) around a target.

@ enableDamping:
- refers to a mechanism that introduces a gradual decrease in a certain parameter or behavior over time.

- When damping is enabled, it introduces a "smoothing effect to the movement" of the camera controlled by OrbitControls. 

- This can be particularly useful when you want to avoid abrupt or jerky movements, providing a more fluid and natural interaction experience for users.

01. import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

02. instantiate "control"          camera  DOM-Element
  const control = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.autoRotate = true;


03. call & update method
  controls.update();
  
- it updates the state of the controls, including any damping effects or auto-rotation settings that have been configured.
*/

/* %%%%%%%%%%%% requestAnimationFrame & renderLoop %%%%%%%%%%%%%%% 
* "requestAnimationFrame" is used in web development to optimize animations and improve performance by synchronizing them with the browser's repaint cycle.
? 60frames per second experience

- is a method [provided by the browser] that allows developers to schedule an animation frame to be rendered on the next repaint cycle of the browser. 

- This is crucial for creating smooth and efficient animations on web pages as it ensures that the animations are synchronized with the display refresh rate, leading to better performance and visual quality.


const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const renderLoop = () => {
* controls.update();
* renderer.render(scene, camera);
* window.requestAnimationFrame(renderLoop);
/->wait until you're able to produce this frame and then call myself again to create a continuous animation loop.
};

renderLoop();
*/

/* %%%%%%%%%%%%%%%%%%%%% Orthographic Camera %%%%%%%%%%%%%%%%%%%%%%%
* Orthographic cameras are defined by a rectangular frustum 

- is a type of camera that is used to create a "parallel projection", as opposed to a perspective projection. 

- This means that objects in the scene will appear "the same size" regardless of their distance from the camera, which can be useful for certain types of applications such as "architectural-visualization" or "2D games".

? OrthographicCamera(left, right, top, bottom, near, far)
- denoting the distance between the center of the camera and actual edges of this box(FOV)

 const aspectRatio = window.innerWidth / window.innerHeight;
 const camera = new THREE.OrthographicCamera(
   -1 * aspectRatio,
    1 * aspectRatio,
    1,
   -1,
   0.1,
   200
 );

? why we multiplied "left&right" to "aspectRatio"?  
    -1 * aspectRatio,  <- left
     1 * aspectRatio,  <- right
-> adjusting the horizontal viewing range of the camera to match the aspect ratio of the window so objects rendered on screen are not distorted or stretched inappropriately.
*/

/* %%%%%%%%%%%%%%%%%%%%%%% Controls %%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
* FlyControls:
FlyControls enables a navigation similar to fly modes in DCC tools like Blender. 
You can arbitrarily transform the camera in 3D space without any limitations (e.g. focus on a specific target).

* PointerLockControls:
The implementation of this class is based on the Pointer Lock API. PointerLockControls is a perfect choice for "first person 3D games".

* TrackballControls:
TrackballControls is similar to OrbitControls. However, it does not maintain a constant camera up vector. 
That means if the camera orbits over the “north” and “south” poles, it does not flip to stay "right side up".

* DragControls:
This class can be used to provide a "drag'n'drop" interaction.
*/

/* %%%%%%%%% update Projection Matrix & resize listener %%%%%%%%%%%%%%%
* is used to recalculate the camera's projection matrix after any changes to the camera's parameters, such as aspect ratio or field of view. 

- This ensures that the camera's view frustum and perspective are updated correctly to reflect the changes in the scene.

window.addEventListener('resize', () => {
? camera.aspect = window.innerWidth / window.innerHeight;
? camera.updateProjectionMatrix();
? renderer.setSize(window.innerWidth, window.innerHeight);
});
*/

/* %%%%%%%%%%%%%%%%%%%%% antialias & maxPixelRatio %%%%%%%%%%%%%%%%%%%%%
# To fix staircase pattern of rendering 3D-graphics:
* Hardware typo solution
  - more hardware pixels per software pixels on the screen
  - the actual amount of pixels U get on the screen
  - provide higher pixel ratio - render more pixels

? devicePixelRatio:
  helps in achieving higher resolution rendering on devices with high pixel density displays. 
  The `maxPixelRatio` variable is calculated as the minimum value between the device's pixel ratio and 2, ensuring optimal rendering performance.

const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);


{Retina screen} is a type of display technology developed by Apple that aims to produce visuals with such high pixel density that the human eye is unable to discern individual pixels at a typical viewing distance. This results in images and text appearing incredibly sharp, vibrant, and true to life.

--------------------------------------------
* Software typo solution
  - it's like you shade the color with a slightly lighter-color 

? antialias:
  is a technique used to "smooth-out" jagged edges in computer graphics, resulting in a more visually appealing and realistic rendering of objects.

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
? antialias: true,
});
*/

/*######################## Put All Together ###########################
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const cubGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' });
const cubMesh = new THREE.Mesh(cubGeometry, cubMaterial);

scene.add(cubMesh);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  30
);
camera.position.z = 5;

const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};
renderLoop();
*/

/* %%%%%%%%%%%%%%%%%%%%%% axesHelper %%%%%%%%%%%%%%%%%%%%%%%%%%%%
* is a built-in object that helps visualize the orientation of the coordinate system.

const axesHelper = new THREE.AxesHelper(2);
cubeMesh.add(axesHelper);

- When you create a new `AxesHelper` instance with a size parameter (in this case, 2), it generates three lines representing the X, Y, and Z axes in the specified size.

*/

/* %%%%%%%%%%%% position & Vector3 & distanceTo & scale %%%%%%%%%%%%% 
* position:
  - is a property of the Mesh
  - that position itself is a Vector3

* Vector3:
  - representing the object's local position
  -  It is commonly used to define "positions", "directions", and "velocities"(the speed of something in a given direction) of objects in the 3D environment.

  - a way to manipulate Vector3 properties, like position and properties inside of them as well like copy

  const tempVector = new THREE.Vector3(0, 1, 0);
  cubeMesh.position.copy(tempVector);
  cubeMesh.position.x = 1;
  cubeMesh.position.z = 0;

* distanceTo:
  - is a method available on `Vector3` instances that calculates the Euclidean(هندسی) distance between two points represented by vectors.
  - is determining the distance between the position of a "cube mesh" and the position of the "camera" in the 3D space.

- calculate the "distance" between the block we see and the camera
    console.log(cubeMesh.position.distanceTo(camera.position));

* scale:
  - The object's local scale. Default is Vector3( 1, 1, 1 )
 
                     x, y, z
  cubeMesh.scale.set(2, 2, 1);

* Scene Hierarchy | Parent child relationship
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.y = -1;
cubeMesh.scale.setScalar(0.5); //since group is=2 it'll be set as 1

const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = 2;

const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x = -2;

const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);

group.position.y = 2;
group.scale.setScalar(2); //x,y,z = 2

scene.add(group);
*/

/* ======================== Rotation ========================= 
?- rotation : Euler
  Object's local rotation (see Euler angles), in radians.

- Euler angles describe a rotational transformation by rotating an object on its various axes in specified amounts per axis, and a specified axis order.

- Euler instance will yield its components (x, y, z, order) in the corresponding order.
  - By default "order" is ('XYZ')

  cubeMesh.rotation.reorder('YXZ');
  cubeMesh.rotation.y = THREE.MathUtils.degToRad(90);
  cubeMesh.rotation.x = THREE.MathUtils.degToRad(45);

?- Quaternion:
- Quaternions are used in three.js to represent "rotations".

- Iterating through a Quaternion instance will yield its components (x, y, z, w) in the corresponding order.
*/

/* ====================== Make it Animated ======================== 
?
//keep track of time | Clock()
const clock = new THREE.Clock();
let previousTime = 0;

const renderLoop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;
 ? //subsequent iteration of the renderLoop can accurately calculate the elapsed time since the last frame. This allows for "smooth animation"

  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 25;

 ? //generates a "wave-like pattern" that swing back and forth between -1 and 1 as its input varies
  cubeMesh.scale.x = Math.sin(currentTime) * 7 + 2;
  cubeMesh.position.x = Math.sin(currentTime) + 2;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
 ? //wait until you're able to produce this frame and then call myself again
};

renderLoop();
*/

/* ================ Custom Geometry | BufferGeometry =============== 
- A representation of mesh, line, or point geometry. 
- Includes vertex positions, face indices, normals, colors, UVs, and custom attributes within buffers, reducing the cost of passing all this data to the GPU.


* Create a Custom Geometry
? const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
    an array of vertices is defined to specify the coordinates of the points in 3D space. Each group of three values represents the x, y, and z coordinates of a vertex.

    a Float32Array is being used to store the vertex data for defining the geometry of the object. 
    Float32Array is a typed array that allows efficient storage and manipulation of floating-point numbers in JavaScript. 

? const bufferAttribute = new THREE.BufferAttribute(vertices, 3);
    A BufferAttribute is created using the vertex array defined earlier. The '3' indicates that each vertex has three components (x, y, z).

    BufferAttributes are used to manage attribute data like positions, colors, normals, etc., in WebGL applications.

? const geometry = new THREE.BufferGeometry();
    is instantiated to hold the vertex data for rendering.

? geometry.setAttribute('position', bufferAttribute)

const cubeMaterial = new THREE.MeshBasicMaterial({
  color: '#e0b90b',
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);

scene.add(cubeMesh);
*/

/* ===================== Tweakpane library ===================
# npm install --save tweakpane

* Tweakpane library is a lightweight graphical user interface (GUI) library designed for developers working with creative coding frameworks like three.js.

* It offers a user-friendly way to manipulate variables and parameters in real-time, enabling easy customization and experimentation with visual elements in your projects. 


? working on actual "Mesh" itself :
pane.addBinding(cubeMesh.scale, 'x', {
  min: 0,
  max: 10,
  step: 0.1,
  label: 'Scale X',
});
pane.addBinding(cubeMesh.scale, 'y', {
  min: 0,
  max: 10,
  step: 0.1,
  label: 'Scale Y',
});
pane.addBinding(cubeMesh.scale, 'z', {
  min: 0,
  max: 10,
  step: 0.1,
  label: 'Scale Z',
});


? working on "Geometry" itself :
- "Geometry" & "Material" makes up the Mesh and coz of that the Mesh has different arguments, you CAN NOT scale the Geometry like the Mesh
    - instead we have "parameters object"

    - something like Geometry it takes a certain set ups arguments in the "constructor" but after it's created you can't change it after the fact

    - re-assigning the Geometry or Material to the Mesh


let geometry = new THREE.PlaneGeometry(1, 1);

const cubeMaterial = new THREE.MeshBasicMaterial({
  color: '#e0b90b',
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);

? making it visible in the 3D environment.
scene.add(cubeMesh);

const planeParameters = {
  width: 1,
  height: 1,
};

const planeFolder = pane.addFolder({
  title: 'Plane',
});

planeFolder
  .addBinding(planeParameters, 'width', {
    min: 0,
    max: 10,
    step: 0.1,
    label: 'Width',
  })
  .on('change', () => {
    ? create new PlaneGeometry | handle change events
    geometry = new THREE.PlaneGeometry(
      planeParameters.width,
      planeParameters.height
    );
    ? re-assigning on actual geometry variable
    cubeMesh.geometry = geometry;
  });

planeFolder
  .addBinding(planeParameters, 'height', {
    min: 0,
    max: 10,
    step: 0.1,
    label: 'Height',
  })
  .on('change', () => {
    geometry = new THREE.PlaneGeometry(
      planeParameters.width,
      planeParameters.height
    );
    cubeMesh.geometry = geometry;
  });
*/

/* ============ Manipulate Material | MeshBasicMaterial ===============
const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);

const material = new THREE.MeshBasicMaterial({
? color: '#e0b90b',
? transparent: true,  //one-way
? opacity: 0.5,
});

? //another-way 
material.color = new THREE.Color('#e0b90b');
material.transparent = true;
material.opacity = 0.5;

? three.js by default has one-side materials, we can fix it by:
material.side = THREE.DoubleSide; //or just material.side = 2

?                         color   near far
const fog = new THREE.Fog(0xffffff, 1, 10);
scene.fog = fog;
scene.background = new THREE.Color(0xffffff);

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
mesh2.position.x = 1.4;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.4;


scene.add(mesh);
scene.add(mesh2);
scene.add(plane);
*/

/* ============ Manipulate Material | MeshPhongMaterial ===============
const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);

const material = new THREE.MeshPhongMaterial();
material.shininess = 50;

pane.addBinding(material, 'shininess', { min: 0, max: 800, step: 10 });

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;

scene.add(mesh);
scene.add(mesh2);
scene.add(plane);

const light = new THREE.AmbientLight(0xffffff, 0.01);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff,30);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
*/

/* ============ Manipulate Material | MeshStandardMaterial ===============
- A standard physically based material, using Metallic-Roughness workflow.

?- "Physically Based Rendering" (PBR) has recently become the standard in many 3D applications, such as Unity, Unreal and 3D Studio Max.

- In practice this gives a more accurate and realistic looking result than the "MeshLambertMaterial(A material for non-shiny surfaces, without specular highlights)" or "MeshPhongMaterial", at the cost of being somewhat more computationally expensive.

?- Note that for best results you should always specify an "environment map" when using this material.

const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0xd1b01f);

pane.addBinding(material, 'metalness', {
  min: 0,
  max: 1,
  step: 0.1,
});
pane.addBinding(material, 'roughness', {
  min: 0,
  max: 1,
  step: 0.1,
});
*/

/* ============ Manipulate Material | MeshPhysicalMaterial ===============
- providing more advanced physically-based rendering properties:

? Anisotropy: ناهمسانگردی
    Ability to represent the anisotropic property of materials as observable with brushed metals.
? Clearcoat:
    Some materials — like car paints, carbon fiber, and wet surfaces — require a clear, reflective layer on top of another layer that may be irregular or rough.
? Iridescence: رنگین کمانی
    Allows to render the effect where hue varies depending on the viewing angle and illumination angle. This can be seen on soap bubbles, oil films, or on the wings of many insects.
? Physically-based transparency: 
    One limitation of ".opacity" is that highly transparent materials are less reflective. Physically-based ".transmission" provides a more realistic option for thin, transparent surfaces like glass.
? Sheen: درخشندگی
    Can be used for representing cloth and fabric materials.


? MeshPhysicalMaterial has a higher performance cost, per pixel, than other three.js materials.


const material = new THREE.MeshPhysicalMaterial();
material.color = new THREE.Color(0xd1b01f);

pane.addBinding(material, 'metalness', {
  min: 0,
  max: 1,
  step: 0.1,
});
pane.addBinding(material, 'roughness', {
  min: 0,
  max: 1,
  step: 0.1,
});
pane.addBinding(material, 'reflectivity', {
  min: 0,
  max: 1,
  step: 0.1,
});
pane.addBinding(material, 'clearcoat', {
  min: 0,
  max: 1,
  step: 0.1,
});
*/

/* ======================= Rotate Meshes =========================
const renderLoop = () => {
  ? rotate All Meshes
  scene.children.forEach((child) => {
    ? only rotate child and not things like "lights"
    if (child instanceof THREE.Mesh) {
      child.rotation.y += 0.01;
      child.rotation.x += 0.003;
    }
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

* OR
? creating a group first
const group = new THREE.Group();

? Add the Meshes to the group then
group.add(cube, knot, plane, sphere, cylinder);
scene.add(group);

const renderLoop = () => {
  group.children.forEach((child) => {
    child.rotation.y += 0.01;
    child.rotation.x += 0.003;
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};
*/

/* ============================ 3D Texture =============================
?- https://freepbr.com/
  * Provides "PBR" materials and texture files.  
    My free PBR, or Physically-Based Rendering materials offer the "metalness" / "roughness" as well as the "metallic" / "smoothness" workflows.  
    These 2K texture maps can be used in "Unreal Engine", "Unity", "Blender" and many other 3D, "Game Design", and "CAD solutions". 

  * Texture is just part of "Material"

? import texture and turn it into a texture that Three.js is able to recognize:
    const textureLoader = new THREE.TextureLoader();

    const textureTest = textureLoader.load(
      '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png'
    );
    ? save downloaded textures in your root-path to access it

    const material = new THREE.MeshBasicMaterial();
    material.map = textureTest;
    material.color = new THREE.Color('red');


*--------------------------------- Manipulate Textures
const grassTexture = textureLoader.load(
  'textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png'
);                      H  V
grassTexture.repeat.set(2, 2);
?------------ RepeatWrapping
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;

?------------ MirroredRepeatWrapping
grassTexture.wrapS = THREE.MirroredRepeatWrapping;
grassTexture.wrapT = THREE.MirroredRepeatWrapping; 

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.6;
plane.rotation.x = -(Math.PI * 0.5); // rotate 90deg
plane.scale.set(1000, 1000);

?------------- wrapS
- This defines how the texture is wrapped horizontally(X axes) and corresponds to U in UV mapping.

?------------- wrapT
- This defines how the texture is wrapped vertically(Y axes) and corresponds to V in UV mapping.

? WrapS and wrapT are parameters that control how textures are repeated or clamped{attached} along the horizontal (S) and vertical (T) axes respectively.

?----- differences between "RepeatWrapping" and "MirroredRepeatWrapping"
The (RepeatWrapping) mode simply repeats the texture if it extends beyond the boundaries of the object, creating a tiled effect.
    - for better understanding, something like this, starting from 0 to 100 and when we start to repeating again go back to 0 back to 100.

On the other hand, (MirroredRepeatWrapping) also repeats the texture but mirrors it at every repeat, which can be useful for creating seamless patterns without obvious seams or edges. 
    - for better understanding, something like this, starting from 0 to 100 and 100 back to 0.



?-------------------- offset
* The 'offset' property allows you to shift the starting position of the texture along the "x" and "y" axes within the specified range (min to max) and step increment. 
* By adjusting the offset values, you can create effects such as scrolling textures or creating animated textures on objects in a Three.js scene.

const grassTexture = textureLoader.load(
  'textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png'
);
grassTexture.repeat.set(3, 3);
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;

pane.addBinding(grassTexture, 'offset', {
  x: {
    min: -1,
    max: 1,
    step: 0.01,
  },
  y: {
    min: -1,
    max: 1,
    step: 0.01,
  },
});
 

?---------------------------------------- UV Map 
* In three.js, UV mapping involves assigning coordinates (U and V) to vertices رأس های of a 3D model, which correspond to points on the texture image. 

* This mapping allows for "precise placement of textures" onto the surfaces of the model, ensuring that the texture wraps around the object correctly and appears as intended.
    - Which part of the texture map on which part of these geometries

- The 'U' and 'V' values represent "horizontal" and "vertical" coordinates, respectively, on the 2D texture image. 
- When applying a texture to a 3D object using UV mapping, these coordinates dictate which part of the texture should be mapped to each vertex of the object. 

* In summary, UV mapping in three.js is a crucial technique for accurately applying textures to 3D models by assigning 'U' and 'V' coordinates to vertices. These coordinates determine how textures are wrapped around objects, enabling realistic rendering in web-based 3D graphics applications.

?--- roughnessMap 
- is a texture that defines [how rough or smooth a surface appears].
- In PBR, the roughness value determines how light scatters-spread or reflects off a material's surface.
- A roughness map can be grayscale, where darker areas represent rougher surfaces and lighter areas represent smoother surfaces.

      const grassRoughness = textureLoader.load(
        '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png'
      );
      material.roughnessMap = grassRoughness;
      material.roughness = 1; <- rough | 0.1 -> smooth

?--- metalnessMap
- in PBR to define whether [a material is metallic-shiny or non-metallic].
- In the metalness map, white areas indicate metallic properties, while black areas indicate non-metallic properties.
- control how light interacts with metallic surfaces, influencing the material's appearance and reflectivity.

      const grassMetallic = textureLoader.load(
        '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png'
      );
      material.metalnessMap = grassMetallic;
      material.metalness = 1;

?--- normalMap
- to create [more realistic lighting effects]. 
- it simulates the small surface details of an object by adjusting how light interacts with its surface. This can _add depth and realism_ to objects in a 3D scene.

      const grassNormal = textureLoader.load(
         '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png'
      );
      material.normalMap = grassNormal;

?--- heightMap - displacementMap
-  a feature that allows [for the distortion or displacement of vertices] in a mesh based on a texture map.
- This texture map is typically a grayscale image where (lighter areas correspond to higher displacements) and darker areas correspond to lower displacements.
- When applied to a mesh, the displacement map alters the positions of the vertices along their normals, creating a visually interesting effect of height variation. This can be used to simulate effects like bumps, ripples, or other forms of surface deformation in 3D objects.

      const grassHeight = textureLoader.load(
        '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png'
      );
      material.displacementMap = grassHeight;
      material.displacementScale = 0.2;

?--- aoMap
-  aoMap refers to Ambient{environment} Occlusion{blockage} Mapping, a technique [used to enhance the "realism" and "depth" of 3D scenes] by simulating how ambient light interacts with objects in a scene. 
- Ambient occlusion helps (create more realistic shadows and shading) by taking into account how objects block ambient light from reaching certain areas.

* ********* The aoMap requires a second set of "UVs". **********
* The reason why aoMap needs a second set of UVs is that ambient occlusion calculations require a separate UV mapping for better accuracy. 
*   - The primary UV coordinates are typically used { for texture mapping }, 
*   - while the secondary set of UV coordinates is specifically {dedicated to
*     ambient occlusion calculations}. 
* By having a separate set of UVs, three.js can accurately calculate how ambient light interacts with the geometry in the scene.

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      ? BufferAttribute = stores data in a more optimized format     
      ?                     item-size: 2 - since uv only has a Width & Height
      const uv2Geometry = new THREE.BufferAttribute(geometry.attributes.uv.array, 2);
      geometry.setAttribute('uv2', uv2Geometry);

? Load the grass textures
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

? Load the boulders textures
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

? Load the space cruiser textures
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

? grass material
const grassPane = pane.addFolder({
  title: 'Grass Material',
  expanded: true,
});

? Initialize the Material
const grassMaterial = new THREE.MeshStandardMaterial({
  map: grassAlbedo,
  roughnessMap: grassRoughness,
  metalnessMap: grassMetallic,
  normalMap: grassNormal,
  displacementMap: grassHeight,
  displacementScale: 0.1,
  aoMap: grassAo
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

? boulder material
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
  aoMap: boulderAo
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
  max: 1,
  step: 0.01,
});

? boulder material
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
  aoMap: spaceCruiserAo
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

? Initialize the Mesh
const grass = new THREE.Mesh(geometry, grassMaterial);
const boulder = new THREE.Mesh(geometry, boulderMaterial);
boulder.position.x = 2.5;
const spaceCruiser = new THREE.Mesh(geometry, spaceCruiserMaterial);
spaceCruiser.position.x = -2.5;

? Initialize a Group
const group = new THREE.Group()
group.add(grass, boulder, spaceCruiser )

? Add the mesh to the scene
scene.add(group);
*/

/* ========================= AmbientLight =============================
- simulating indirect light that fills in shadows and adds overall brightness to the scene. 
? It does not have a specific direction or position, and its intensity remains constant across all objects.


const ambientLight = new THREE.AmbientLight(
  0xffffff, //or new THREE.Color('white')
  0.4 //intensity
);

scene.add(ambientLight);

pane.addBinding(ambientLight, 'color', {
  color: {
    type: 'float',
  },
});
pane.addBinding(ambientLight, 'intensity', {
  min: 0,
  max: 1,
  step: 0.01,
});
*/

/* ========================= HemisphereLight =============================
- simulates ambient lighting in a scene. 
? It consists of two colors: one for the sky (top hemisphere) and one for the ground (bottom hemisphere). 
- This light type is often used to create a soft, even lighting effect that mimics natural light conditions.

- when combined with other types of lights like directional or point lights. By adjusting the colors and intensity of the sky and ground components, developers can achieve various lighting effects to enhance the visual appeal of their 3D projects.

const hemisphereLight = new THREE.HemisphereLight('red', 'blue', 0.5);
scene.add(hemisphereLight);

pane.addBinding(hemisphereLight, 'intensity', {
  min: 0,
  max: 1,
  step: 0.01,
});

*/

/* ========================= Direction Light =============================
- This type of light does not have a specific position in space but instead shines uniformly across the entire scene from a specified direction.
- you can control various properties such as the color of the "light", "intensity", and the "direction" in which it shines. 
? This type of light is commonly used to simulate "sunlight" or "moonlight" in a scene, creating realistic lighting effects and shadows.

const directionLight = new THREE.DirectionalLight('white', 0.5);
directionLight.position.x = -5;
directionLight.position.z = 5;
directionLight.position.y = 1;

directionLight.target.position.set(0, 10, 0);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionLight,
  0.5
);

scene.add(directionLight);
scene.add(directionalLightHelper);

pane.addBinding(directionLight, 'color', {
  color: {
    type: 'float',
  },
});
pane.addBinding(directionLight, 'intensity', {
  min: 0,
  max: 1,
  step: 0.01,
});
*/

/* ========================= Point Light =============================
? is a type of light source that emits light equally in all directions from a single point in space. 
- This type of light simulates the effect of a "light bulb" or a "candle", where the light (radiates outwards in a spherical pattern). 
- Point lights are commonly used to create realistic lighting effects in 3D scenes by illuminating objects and casting shadows.

const pointLight = new THREE.PointLight('white', 0.5);
pointLight.position.x = 0;
pointLight.position.y = 3;

const pointLightHelper = new THREE.PointLightHelper(
  pointLight,
  0.5
);

scene.add(pointLight);
scene.add(pointLightHelper);

pane.addBinding(pointLight, 'color', {
  color: {
    type: 'float',
  },
});
pane.addBinding(pointLight, 'intensity', {
  min: 0,
  max: 1,
  step: 0.01,
});
*/

/* ========================= Spot Light =============================
-  is a type of light source that emits light in a specific direction, creating a focused beam of light that can be used to illuminate specific areas or objects in a 3D scene. 
? This type of light source is commonly used to simulate the effect of a spotlight in real-world scenarios, such as "stage lighting" or "flashlight effects".

const spotLight = new THREE.SpotLight(0x59ffe9, 0.8);
spotLight.position.x = 1;
spotLight.position.y = 2;
spotLight.position.z = 2;

const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.8);

scene.add(spotLight);
scene.add(spotLightHelper);

pane.addBinding(spotLight, 'angle', {
 min:0,
 max: Math.PI / 2, // convert to deg
 step:0.01
});
pane.addBinding(spotLight, 'penumbra', {
 min:0, //sharp light 
 max: 1, //soft light
 step:0.01
});
pane.addBinding(spotLight, 'decay', {
 min:0,
 max: 5,
 step:0.01
});
pane.addBinding(spotLight, 'distance', {
 min:0,
 max: 10,
 step:0.01
});
pane.addBinding(spotLight, 'color', {
  color: {
    type: 'float',
  },
});
pane.addBinding(spotLight, 'intensity', {
  min: 0,
  max: 1,
  step: 0.01,
});
*/

/* ========================= RectAreaLight =============================
- is a type of light source that emits light uniformly from a rectangular area in a scene.
- can be used to simulate lighting effects in a more realistic manner by providing soft, diffused lighting across a surface.

? Rect area lights are often used in architectural visualization, product rendering, and other scenarios where realistic lighting is crucial.

import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

const rectAreaLight = new THREE.RectAreaLight(
  0x0e0aff,
  4,
  6, //width
  4 //height
);
rectAreaLight.position.x = 0;
rectAreaLight.position.y = 1;
rectAreaLight.position.z = 4;
rectAreaLight.lookAt(0, 0, 3);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight, 0.5);

scene.add(rectAreaLight);
scene.add(rectAreaLightHelper);

pane.addBinding(rectAreaLight, 'color', {
  color: {
    type: 'float',
  },
});
pane.addBinding(rectAreaLight, 'intensity', {
  min: 0,
  max: 10,
  step: 0.01,
});
*/

/* ===================== Put All Light Together ====================
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 0.1,
});

const materialFolder = pane.addFolder({
  title: 'Material',
  expanded: true,
});

materialFolder.addBinding(material, 'metalness', {
  min: 0,
  max: 1,
  step: 0.01,
});
materialFolder.addBinding(material, 'roughness', {
  min: 0,
  max: 1,
  step: 0.01,
});
materialFolder.addBinding(material, 'color', { color: { type: 'float' } });

?=========== Initialize the Mesh
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.75, 8, 8);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
const circleGeometry = new THREE.CircleGeometry(0.5, 32);

const box = new THREE.Mesh(boxGeometry, material);
box.position.x = -2;
const box2 = new THREE.Mesh(boxGeometry, material);
box2.position.x = -2;
box2.position.z = -2;

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 0;
sphere.castShadow = true;
const sphere2 = new THREE.Mesh(sphereGeometry, material);
sphere2.position.x = 0;
sphere2.position.z = -2;

const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = 2;
const torusKnot2 = new THREE.Mesh(torusKnotGeometry, material);
torusKnot2.position.x = 2;
torusKnot2.position.z = -2;

const circle = new THREE.Mesh(circleGeometry, material);
circle.scale.setScalar(20);
circle.position.y = -2;
circle.rotation.x = -Math.PI / 2;
circle.receiveShadow = true;

scene.add(box, sphere, torusKnot, circle);
scene.add(box2, sphere2, torusKnot2);

* ================= Initialize the light ====================
?_________ambientLight
const ambientLight = new THREE.AmbientLight(new THREE.Color(0xc870ff), 0.2);
scene.add(ambientLight);
const ambientLightFolder = pane.addFolder({
  title: "Ambient Light",
  expanded: true,
});
ambientLightFolder.addBinding(ambientLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
ambientLightFolder.addBinding(ambientLight, "color", {
  color: { type: "float" },
});

?__________hemisphericLight
const hemisphericLight = new THREE.HemisphereLight(
  new THREE.Color(0xff0000),
  new THREE.Color(0x0000ff),
  0.1
);
hemisphericLight.position.set(0, 10, 0);
scene.add(hemisphericLight);
const hemisphericLightHelper = new THREE.HemisphereLightHelper(
  hemisphericLight
);
scene.add(hemisphericLightHelper);
const hemisphericLightFolder = pane.addFolder({
  title: "Hemispheric Light",
  expanded: true,
});
hemisphericLightFolder.addBinding(hemisphericLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
hemisphericLightFolder.addBinding(hemisphericLight, "color", {
  color: { type: "float" },
});
hemisphericLightFolder.addBinding(hemisphericLight, "groundColor", {
  color: { type: "float" },
});

?__________directionalLight
const directionalLight = new THREE.DirectionalLight(0x59ffe9, 0.2);
directionalLight.position.set(3, 10, 15);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
scene.add(directionalLightHelper);
const directionalLightFolder = pane.addFolder({
  title: "Directional Light",
  expanded: true,
});
directionalLightFolder.addBinding(directionalLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
directionalLightFolder.addBinding(directionalLight, "color", {
  color: {
    type: "float",
  },
});

?__________pointLight
const pointLight = new THREE.PointLight(0xff810a, 0.5);
pointLight.position.set(-3, 2, -3);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);
const pointLightFolder = pane.addFolder({
  title: "Point Light",
  expanded: true,
});
pointLightFolder.addBinding(pointLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
pointLightFolder.addBinding(pointLight, "color", { color: { type: "float" } });

?__________rectAreaLight
const rectAreaLight = new THREE.RectAreaLight(0xff0000, 0.5, 10, 10);
rectAreaLight.position.set(-10, 5, 5);
scene.add(rectAreaLight);
rectAreaLight.lookAt(0, 0, 0);
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
const rectAreaLightFolder = pane.addFolder({
  title: "Rect Area Light",
  expanded: true,
});
rectAreaLightFolder.addBinding(rectAreaLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
rectAreaLightFolder.addBinding(rectAreaLight, "color", {
  color: { type: "float" },
});

?__________spotLight
const spotLight = new THREE.SpotLight(0x59ffe9, 0.5, 20, Math.PI * 0.1);
spotLight.position.set(10, 5, 5);
spotLight.target.position.set(0, -1, 0);
scene.add(spotLight);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
const spotLightFolder = pane.addFolder({ title: "Spot Light", expanded: true });
spotLightFolder.addBinding(spotLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
spotLightFolder.addBinding(spotLight, "color", { color: { type: "float" } });
*/

/* ========================= Shadows =============================
- Shadows help convey depth, spatial relationships, and realism in rendered scenes.

- you need to set up a light source (such as directional light, point light, or spot light) 
- and specify parameters like "shadow map resolution", "shadow bias", and "shadow camera settings".

?---------- CameraHelper 
- it creates a visual representation of the camera's viewing volume, often shown as wireframes or outlines in the scene. 
- This can be particularly useful for debugging purposes, as it allows you to see exactly what the camera is capturing and how it is positioned within the scene.



* _____________direction-light____________________
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

* _____________point-light______________
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

* ______________spot-light_________________
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



* four main types of shadow maps:
?1. BasicShadowMap: 
- This is the simplest form of shadow mapping technique in THREE.js, providing basic shadow rendering without any advanced features.

?2. PCFShadowMap:  (default)  ✔️ 
- Percentage Closer Filtering (PCF) is a technique that helps to reduce aliasing and produce smoother shadows by averaging multiple samples around each pixel.

?3. PCFSoftShadowMap:  ✔️ 
- This variation of PCFShadowMap adds softness to the shadows by applying a blur filter, resulting in more realistic and softer shadow edges.

?4. VSMShadowMap: 
- Variance Shadow Mapping (VSM) is a more advanced technique that aims to improve the quality of shadows by addressing issues like light bleeding and aliasing.
*/

/* =========================  =============================

*/

/* =========================  =============================

*/
