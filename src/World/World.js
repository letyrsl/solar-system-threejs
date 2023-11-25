import { createCamera } from './components/camera.js';
import { createCelestialBody } from './components/celestial-body.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let renderer;
let scene;
let loop;

const celestialBodiesProperties = [
  { radius: 8, positionX: 0, textureFile: 'sun.jpeg' },
  { radius: 2, positionX: 16, textureFile: 'mercury.png' },
  { radius: 3, positionX: 32, textureFile: 'venus.jpeg' },
  { radius: 4, positionX: 48, textureFile: 'earth.jpeg' },
  { radius: 3, positionX: 64, textureFile: 'mars.jpeg' },
  { radius: 8, positionX: 80, textureFile: 'jupiter.jpg' },
  { radius: 5, positionX: 96, textureFile: 'saturn.jpg' },
  { radius: 4, positionX: 112, textureFile: 'uranus.jpg' },
  { radius: 4, positionX: 128, textureFile: 'neptune.jpg' },
];

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);

    const light = createLights();

    // Creating sun and planets
    celestialBodiesProperties.forEach(celestialBody => {
        const celestialBodyMesh = createCelestialBody(celestialBody);
        scene.add(celestialBodyMesh, light);
      });

    loop.updatables.push(controls);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
