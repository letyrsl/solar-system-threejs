import {
  SphereBufferGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
} from 'https://cdn.skypack.dev/three@0.132.2';

function createMaterial(textureFile) {
  // create a texture loader.
  const textureLoader = new TextureLoader();

  // load a texture
  const texture = textureLoader.load(`assets/textures/${textureFile}`);

  // create a "standard" material using
  // the texture we just loaded as a color map
  const material = new MeshStandardMaterial({
    map: texture,
  });

  return material;
}

function createCelestialBody({ radius, positionX, textureFile }) {
  const geometry = new SphereBufferGeometry(radius, 50, 50);
  const material = createMaterial(textureFile);
  const cube = new Mesh(geometry, material);

  cube.position.x = positionX;

  // cube.rotation.set(-0.5, -0.1, 0.8);

  // const radiansPerSecond = MathUtils.degToRad(30);

  // cube.tick = (delta) => {
  //   // increase the cube's rotation each frame
  //   cube.rotation.z += delta * radiansPerSecond;
  //   cube.rotation.x += delta * radiansPerSecond;
  //   cube.rotation.y += delta * radiansPerSecond;
  // };

  return cube;
}

export { createCelestialBody };
