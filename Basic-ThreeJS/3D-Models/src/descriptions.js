/* %%%%%%%%%%%%%%%%% GLTFLoader ✔️✔️✔️ %%%%%%%%%%%%%%%%%%%%%%%% 
* glTF (Graphics Library Transmission Format and formerly known as WebGL Transmissions Format or WebGL TF) is a standard file format for three-dimensional scenes and models. in another way to say, is an open format specification for efficient delivery and loading of 3D content. 
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

* glTF minimizes both the size of 3D assets, and the runtime processing needed to unpack and use those assets.

* is optimize for the web - load faster

* that supports static models, animation, and moving scenes.

* glTF is used in games, native web applications, AR, VR, and 3D ads.

- Assets may be provided either in JSON (.gltf) or binary (.glb) format. 

- External files store textures (.jpg, .png) and additional binary data (.bin).

? A glTF asset may deliver one or more scenes, including meshes, materials, textures, skins, skeletons, morph targets, animations, lights, and/or cameras.

! differences between gltf & gltf-binary
01. GLTF is an open standard file format for 3D scenes and models, designed
    to be lightweight and efficient for transmission and loading in real-time applications. 
  - GLTF-binary is a binary version of the GLTF format, which offers advantages
    in terms of faster loading times and smaller file sizes.

02. GLTF files are typically in JSON, which is human-readable but can be
     larger in size compared to binary formats.
  - GLTF-binary, as the name suggests, is a binary representation of the same data, resulting in smaller file sizes and quicker loading times.

03. GLTF-binary is its improved performance due to reduced file sizes and 
    faster parsing by applications

04. GLTF: it has binary files + a few other textures that's related to the model
    maximum flexibility, for example change the base color
  - GLTF-binary: it has a .glb file - it has all the information in the
    standard GLTF file except all compressed in one-binary 


*------------------------------ gltf-Draco
- is a compressed file as well that has a smaller size

* DRACOLoader:
- A loader for geometry compressed with the Draco library.
- Draco is an open source library for compressing and decompressing 3D meshes and point clouds. 
- Compressed geometry can be significantly smaller, at the cost of additional decoding time on the client device.


import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

\______Instantiate a loader _____/
const loader = new DRACOLoader();

\___ Specify path to a folder containing WASM/JS decoding libraries ___/
loader.setDecoderPath( '/examples/jsm/libs/draco/' );
                - this path is where draco exist
                node_modules -> three -> examples
    ! if it didn't work instead use  the decoder source directory:
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');



*------------------------------ loadAsync
- to return a variable of {gltfLoader}, use "loadAsync" and if we use loadAsync we don't have to use a callback fn but we do have to specify a "await"

const model = await gltfLoader.loadAsync('/models/boomBoxGLTF/BoomBox.gltf');
model.scene.scale.setScalar(50);
scene.add(model.scene);

const loadModel = async () => {
  const model = await gltfLoader.loadAsync('/models/boomBoxGLTF/BoomBox.gltf');
  return model;
};

const model = loadModel();
model.then((model) => {
  console.log(model);
});


*-------------------------------- .envMap
-  which enhances their visual appearance by simulating "reflections" of the surrounding environment. 
- This technique is crucial for achieving realistic rendering of materials like metals, glass, and other reflective surfaces in virtual environments.

- it only providing a fake reflecting the part of environment itself and mot other objects if there is one 

    material.envMap = envMap;     <-this is our actual "background"
    material.envMapIntensity = 2;

! another way is to set it on the "scene"
scene.environment = envMap;    <- But you can't add "intensity" here

gltfLoader.load('/models/boomBoxGLB/BoomBox.glb', (gltf) => {
  const modelScene = gltf.scene;
  const material = modelScene.children[0].material;
  modelFolder.addBinding(material, 'roughness', {
    min: 0,
    max: 2,
    step: 0.01,
  });
  modelScene.scale.setScalar(50);

  scene.add(modelScene);
});


*------------------------- Working with Nested Meshes
- enables a systematic approach to accessing and manipulating individual components of the 3D model scene, 
- making it easier to apply consistent changes across {multiple mesh objects}.

?work with all Meshes
 modelScene.traverse((child) => {
    if (child.isMesh) {
      child.material.envMap = envMap;
      child.material.roughness = 0;
      child.material.metalness = 1;
    }
  });

? work with a specific Mesh
  modelScene.traverse((child) => {
    if (child.name === 'wheels') {
      child.material = new THREE.MeshBasicMaterial({
        color: 'yellow',
      });
    }
  });
*/

/* %%%%%%%%%%%%%%%%%%%% OBJLoader  %%%%%%%%%%%%%%%%%%%%%%%%%% 
* OBJ format is a common file format used for storing 3D models.
    import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

- It stands for Wavefront Object and is a simple text-based format that defines the geometry and materials of a 3D model.

- OBJ files can store information such as vertex positions, texture coordinates, normals, and material properties.
*/

/* %%%%%%%%%%%%%%%%%%%% FBXLoader  %%%%%%%%%%%%%%%%%%%%%%%%%% 
* The FBX format, short for Filmbox, is a proprietary file format developed by Autodesk for storing 3D models, animations, and other data used in the entertainment industry.
    import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

-  It is widely used in various 3D modeling and animation software applications due to its ability to preserve complex scene hierarchies, materials, textures, animations, and more in a single file.
*/