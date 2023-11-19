// Standard global variables
var scene, camera, renderer, controls, stats;
const container = document.getElementById('ThreeJS');

// Init scene
init();

// Animation loop
animate();

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

    // Create objects
    createSphere();

    // set the sky color
    setSky();
}

function setCamera()
{
    // set the view size in pixels (custom or according to window size)
    // var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 300;
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    // camera attributes
    const VIEW_ANGLE = 45;
    const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
    const NEAR = 0.1;
    const FAR = 20000;

    // set up camera
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    // add the camera to the scene
    scene.add(camera);

    // the camera defaults to position (0,0,0)
    // 	so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
    camera.position.set(0,150,400);
    camera.lookAt(scene.position);
}

function setRenderer()
{
    // set the view size in pixels (custom or according to window size)
    // var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 300;
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    // create and start the renderer; choose antialias setting.
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    } else {
        renderer = new THREE.CanvasRenderer();
    }

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
    container.appendChild( stats.domElement );
}

function setLight()
{
    // create a light
    var light = new THREE.PointLight(0xffffff);
    light.position.set(100,100,100);
    scene.add(light);

        var ambientLight = new THREE.AmbientLight(0xfff);
        scene.add(ambientLight);
}

function setSky()
{
    // make sure the camera's "far" value is large enough so that it will render the skyBox!
    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    // BackSide: render faces from inside of the cube, instead of from outside (default).
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x000, side: THREE.BackSide } );
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    scene.add(skyBox);
}

function createSphere()
{
    // Sphere parameters: radius, segments along width, segments along height
    var sphereGeometry = new THREE.SphereGeometry( 50, 32, 16 );
    // use a "lambert" material rather than "basic" for realistic lighting.
    //   (don't forget to add (at least one) light!)
    var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} );
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(100, 50, -50);
    scene.add(sphere);
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