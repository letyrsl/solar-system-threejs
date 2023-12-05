import {
  SphereBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  TextureLoader,
} from 'https://cdn.skypack.dev/three@0.132.2';

const EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60);

const sunProperties = { size: 8, positionX: 0, textureFile: 'sun.jpeg', radius: 0 };

const planetsProperties = [
  { size: 2, textureFile: 'mercury.png', radius: 16, speed: (1 * 3)/(365 * 2) },
  { size: 3, textureFile: 'venus.jpeg', radius: 32, speed: (1 * 2)/(365 * 2) },
  { size: 4, textureFile: 'earth.jpeg', radius: 48, speed: 1/(365 * 2) },
  { size: 3, textureFile: 'mars.jpeg', radius: 64, speed: (1 / 2)/(365 * 2) },
  { size: 8, textureFile: 'jupiter.jpg', radius: 80, speed: (1 / 3)/(365 * 2) },
  { size: 5, textureFile: 'saturn.jpg', radius: 96, speed:  (1 / 4)/(365 * 2) },
  { size: 4, textureFile: 'uranus.jpg', radius: 112, speed:  (1 / 5)/(365 * 2) },
  { size: 4, textureFile: 'neptune.jpg', radius: 128, speed:  (1 / 6)/(365 * 2) },
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

function createCelestialBody({ size, textureFile, radius }, isSun = false) {
  const geometry = new SphereBufferGeometry(size, 32, 32);
  const material = createMaterial(textureFile, isSun);
  const celestialBody = new Mesh(geometry, material);

  celestialBody.position.x = radius;

  return celestialBody;
}

function createPlanets() {
  let planets = [];

  planetsProperties.forEach(properties => {
    const planetMesh = createCelestialBody(properties);

    // animação
    planetMesh.tick = () => {
      // movimento de rotação
      planetMesh.rotation.y += EARTH_YEAR;

      // movimento de translação
      const angle = Date.now() * properties.speed;
      planetMesh.position.x = properties.radius * Math.cos(angle);
      planetMesh.position.z = properties.radius * Math.sin(angle);
    };

    planets.push(planetMesh);
  })

  return planets;
}

function createSun() {
  return createCelestialBody(sunProperties, true);
}

export { createPlanets, createSun };
