import { createCamera } from './components/camera.js';
import { createSun, createPlanets } from './components/celestial-bodies.js';
import { createAmbientLight, createPointlight } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let renderer;
let scene;
let loop;

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

    const sun = createSun();
    scene.add(sun);

    const planets = createPlanets();

    planets.forEach(planet => {
      scene.add(planet);
    });

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
