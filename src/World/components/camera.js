import { PerspectiveCamera } from 'https://cdn.skypack.dev/three@0.132.2';

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    1, // near clipping plane
    20000, // far clipping plane
  );

  camera.position.set(0, 0, 500);

  return camera;
}

export { createCamera };
