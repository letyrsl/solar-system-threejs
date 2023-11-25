import { TextureLoader, Scene, RepeatWrapping } from 'https://cdn.skypack.dev/three@0.132.2';

function createScene() {
  const scene = new Scene();

  const texture = new TextureLoader().load('assets/textures/space-background.png');
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(3,3);

  scene.background = texture;

  return scene;
}

export { createScene };
