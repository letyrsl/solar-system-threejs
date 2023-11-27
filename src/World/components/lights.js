import { AmbientLight, PointLight } from 'https://cdn.skypack.dev/three@0.132.2';

function createAmbientLight() {
  return new AmbientLight('darkslategrey', 2);
}

function createPointlight() {
  return new PointLight(0xffffff, 5, 9999, 0)
}

export { createAmbientLight, createPointlight };
