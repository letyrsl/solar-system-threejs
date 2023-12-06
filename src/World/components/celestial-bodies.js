import {
  SphereBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  TextureLoader,
} from 'https://cdn.skypack.dev/three@0.132.2';

const EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60);

const planetsProperties = [
  { name: 'sun',     size: 8, textureFile: 'sun.jpeg',    radius: 0,   speed: 0.001          },
  { name: 'mercury', size: 1, textureFile: 'mercury.png', radius: 16,  speed: EARTH_YEAR * 4 },
  { name: 'venus',   size: 2, textureFile: 'venus.jpeg',  radius: 32,  speed: EARTH_YEAR * 2 },
  { name: 'earth',   size: 2, textureFile: 'earth.jpeg',  radius: 48,  speed: EARTH_YEAR     },
  { name: 'mars',    size: 1, textureFile: 'mars.jpeg',   radius: 64,  speed: EARTH_YEAR / 2 },
  { name: 'jupiter', size: 5, textureFile: 'jupiter.jpg', radius: 80,  speed: EARTH_YEAR / 4 },
  { name: 'saturn',  size: 4, textureFile: 'saturn.jpg',  radius: 96,  speed: EARTH_YEAR / 8 },
  { name: 'uranus',  size: 3, textureFile: 'uranus.jpg',  radius: 112, speed: EARTH_YEAR / 16 },
  { name: 'neptune', size: 3, textureFile: 'neptune.jpg', radius: 128, speed: EARTH_YEAR / 32 },
];

function createMaterial(textureFile, name) {
  // create a texture loader.
  const textureLoader = new TextureLoader();

  // load a texture
  const texture = textureLoader.load(`assets/textures/${textureFile}`);

  if (name == 'sun'){
    return new MeshBasicMaterial({ map: texture });
  }

  return new MeshStandardMaterial({ map: texture });
}

function createMesh({ name, size, textureFile, radius }) {
  const geometry = new SphereBufferGeometry(size, 32, 32);
  const material = createMaterial(textureFile, name);
  const celestialBody = new Mesh(geometry, material);

  celestialBody.position.x = radius;

  return celestialBody;
}

function createCelestialBodies() {
  let celestialBody = [];

  planetsProperties.forEach(properties => {
    const planetMesh = createMesh(properties);

    // animation
    planetMesh.tick = () => {
      // rotation animation
      planetMesh.rotation.y += EARTH_YEAR;

      // translation animation
      const angle = Date.now() * properties.speed;
      planetMesh.position.x = properties.radius * Math.cos(angle);
      planetMesh.position.z = properties.radius * Math.sin(angle);
    };

    celestialBody.push(planetMesh);
  })

  return celestialBody;
}

export { createCelestialBodies };
