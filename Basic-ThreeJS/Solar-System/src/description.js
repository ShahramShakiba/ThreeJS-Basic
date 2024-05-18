/* %%%%%%%%%%%%%%% Rotation %%%%%%%%%%%%%%%%%%%%%%%
const clock = new THREE.Clock();

const renderLoop = () => {
  const elapsedTime = clock.getElapsedTime();

  * rotate Earth around the Sun
  earth.position.x = Math.sin(elapsedTime) * 15;
  earth.position.z = Math.cos(elapsedTime) * 15;
  * rotate Moon around the Earth
  moon.position.x = Math.sin(elapsedTime) * 2;
  moon.position.z = Math.cos(elapsedTime) * 2;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};
renderLoop();
*/

/* %%%%%%%%%%%% Cube Texture Loader %%%%%%%%%%%%%%%%
*  provide a way to simulate reflections and refractions on surfaces, adding depth and realism to rendered objects.

- CubeTextureLoader can be used to load cube maps. 
- The loader returns an instance of CubeTexture and expects the cube map to be defined as "six separate images" representing the sides of a cube. 

- Other cube map definitions like vertical and horizontal cross, column and row layouts are not supported.

? Cube Texture Loader in three.js supports various types of cube texture formats, such as JPEG, PNG, or HDR images, enabling flexibility in creating different visual effects and styles within a 3D scene. 
*/
