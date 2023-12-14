import { PerspectiveCamera } from 'https://cdn.skypack.dev/three@0.132.2';

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    1, // near clipping plane
    20000, // far clipping plane
  );

  camera.position.set(0, 0, 500);

  document.addEventListener('keydown', (e) => {
    const speed = 10;

    if (e.key == 'w' || e.key == 'ArrowUp') { // Frente
      camera.position.z -= speed;
    }

    if (e.key == 's' || e.key == 'ArrowDown') { // Atrás
      camera.position.z += speed;
    }

    if (e.key == 'a' || e.key == 'ArrowLeft') { // Esquerda
      camera.position.x -= speed;
    }

    if (e.key == 'd' || e.key == 'ArrowRight') { // Direita
      camera.position.x += speed;
    }
  }, false);

  return camera;
}

export { createCamera };
