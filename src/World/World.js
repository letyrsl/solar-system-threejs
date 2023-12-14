import { GUI } from 'https://cdn.skypack.dev/dat.gui';
import { createCamera } from './components/camera.js';
import { createCelestialBodies, animatePlanets } from './components/celestial-bodies.js';
import { createAmbientLight, createPointlight } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera, renderer, scene, loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);
    loop.updatables.push(controls);

    const ambientLight = createAmbientLight();
    scene.add(ambientLight);

    const pointlight = createPointlight();
    scene.add(pointlight)

    const celestialBodies = createCelestialBodies();

    celestialBodies.forEach(celestialBody => {
      loop.updatables.push(celestialBody);
      scene.add(celestialBody);
    });

    const resizer = new Resizer(container, camera, renderer);

    const gui = new GUI();
    const planetFolder = gui.addFolder('Planetas');
    const translation = { speed: 1 };

    planetFolder.add(translation, 'speed', 0, 1).onChange((speed) => {
      celestialBodies.forEach(celestialBody => {
        animatePlanets(celestialBody, speed);
      });
    });

    planetFolder.open();
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
