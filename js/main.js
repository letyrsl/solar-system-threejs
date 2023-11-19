const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

// Standard global variables
let scene, camera, renderer, controls, stats;
const container = document.getElementById('ThreeJS');

// Defining celestial bodies properties
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

// Init scene
init();

// Animation loop
animate();

// Creating sun and planets
celestialBodiesProperties.forEach(celestialBody => {
    createCelestialBody(celestialBody);
});

///////////////
// FUNCTIONS //
///////////////

function init()
{
    // Init scene
    scene = new THREE.Scene();

    // Initial configurations
    setCamera();
    setRenderer();
    setControls();
    setStats();
    setLight();
    setSky();
}

function setCamera()
{
    // camera attributes
    const VIEW_ANGLE = 36;
    const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
    const NEAR = 1;
    const FAR = 20000;

    // set up camera
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    // add the camera to the scene
    scene.add(camera);

    // the camera defaults to position (0,0,0)
    // 	so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
    camera.position.set(0, 0, 128);
    camera.lookAt(scene.position);
}

function setRenderer()
{
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    // attach renderer to the container div
    container.appendChild(renderer.domElement);

    // automatically resize renderer
    THREEx.WindowResize(renderer, camera);
}

function setControls()
{
    // move mouse and: left   click to rotate,
    //                 middle click to zoom,
    //                 right  click to pan
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function setStats()
{
    // displays current and past frames per second attained by scene
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);
}

function setLight()
{
    // create a light
    let light = new THREE.PointLight(0xffffff);
    light.position.set(100,100,100);
    scene.add(light);

    let ambientLight = new THREE.AmbientLight(0xfff);
    scene.add(ambientLight);
}

function setSky()
{
    // make sure the camera's "far" value is large enough so that it will render the skyBox!
    let skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    // BackSide: render faces from inside of the cube, instead of from outside (default).
    let skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x000, side: THREE.BackSide } );
    let skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    scene.add(skyBox);
}

function createCelestialBody({ radius, positionX, textureFile })
{
    const geometry = new THREE.SphereGeometry(radius, 50, 50);
    const texture = THREE.ImageUtils.loadTexture(`public/textures/${textureFile}`);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = positionX;
    scene.add(mesh);
}

function animate()
{
    requestAnimationFrame(animate);
    render();
    update();
}

function render()
{
    renderer.render(scene, camera);
}

function update()
{
    controls.update();
    stats.update();
}