import {
  SphereBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  TextureLoader,
} from 'https://cdn.skypack.dev/three@0.132.2';

const sunProperties = { radius: 8, positionX: 0, textureFile: 'sun.jpeg' };

const planetsProperties = [
  { radius: 2, positionX: 16, textureFile: 'mercury.png' },
  { radius: 3, positionX: 32, textureFile: 'venus.jpeg' },
  { radius: 4, positionX: 48, textureFile: 'earth.jpeg' },
  { radius: 3, positionX: 64, textureFile: 'mars.jpeg' },
  { radius: 8, positionX: 80, textureFile: 'jupiter.jpg' },
  { radius: 5, positionX: 96, textureFile: 'saturn.jpg' },
  { radius: 4, positionX: 112, textureFile: 'uranus.jpg' },
  { radius: 4, positionX: 128, textureFile: 'neptune.jpg' },
];

function createMaterial(textureFile, isSun) {
  // create a texture loader.
  const textureLoader = new TextureLoader();

  // load a texture
  const texture = textureLoader.load(`assets/textures/${textureFile}`);

  if (isSun){
    return new MeshBasicMaterial({ map: texture });
  }

  return new MeshStandardMaterial({ map: texture });
}

function createCelestialBody({ radius, positionX, textureFile }, isSun = false) {
  const geometry = new SphereBufferGeometry(radius, 32, 32);
  const material = createMaterial(textureFile, isSun);
  const celestialBody = new Mesh(geometry, material);

  celestialBody.position.x = positionX;

  return celestialBody;
}

function createPlanets() {
  let planets = [];

  planetsProperties.forEach(properties => {
    const planetMesh = createCelestialBody(properties);
    planets.push(planetMesh);
  })

  return planets;
}

function createSun() {
  return createCelestialBody(sunProperties, true);
}

export { createPlanets, createSun };
