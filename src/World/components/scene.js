import {
  TextureLoader,
  Scene,
  RepeatWrapping,
  AmbientLight
} from 'https://cdn.skypack.dev/three@0.132.2';

function createScene() {
  const scene = new Scene();

  const texture = new TextureLoader().load('assets/textures/space-background.png');
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(3,3);

  scene.background = texture;

  const ambient = new AmbientLight(0x303030);
  scene.add(ambient);

  return scene;
}

export { createScene };
