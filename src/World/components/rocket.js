import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

function createRocket(scene) {
    const loader = new GLTFLoader();

    loader.load('assets/rocket.glb', (gltf) => {
      gltf.scene.position.x = 50;

      gltf.scene.scale.x = 2;
      gltf.scene.scale.y = 2;
      gltf.scene.scale.z = 2;

      scene.add(gltf.scene);

      document.addEventListener('keydown', (e) => {
        const speed = 1;

        if (e.key == 'w' || e.key == 'ArrowUp') { // Frente
          gltf.scene.position.y += speed;
          gltf.scene.rotation.z = 0;
        }

        if (e.key == 's' || e.key == 'ArrowDown') { // Atrás
          gltf.scene.position.y -= speed;
          gltf.scene.rotation.z = 9.5;
        }

        if (e.key == 'a' || e.key == 'ArrowLeft') { // Esquerda
          gltf.scene.position.x -= speed;
          gltf.scene.rotation.z = 8;
        }

        if (e.key == 'd' || e.key == 'ArrowRight') { // Direita
          gltf.scene.position.x += speed;
          gltf.scene.rotation.z = 11;
        }
      }, false);
    }, undefined, (error) => {
      console.error( error );
    });
}

export { createRocket };