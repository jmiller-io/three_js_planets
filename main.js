var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75,  window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize (window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

var light = new THREE.AmbientLight( 0x888888 )
scene.add( light )

  var light = new THREE.DirectionalLight( 0xcccccc, 1 )
  light.position.set(5,5,5)
  scene.add( light )
  light.castShadow  = true
  light.shadowCameraNear  = 0.01
  light.shadowCameraFar = 15
  light.shadowCameraFov = 45

  light.shadowCameraLeft  = -1
  light.shadowCameraRight =  1
  light.shadowCameraTop =  1
  light.shadowCameraBottom= -1
  // light.shadowCameraVisible  = true

  light.shadowBias  = 0.001
  light.shadowDarkness  = 0.2

  light.shadowMapWidth  = 1024*2
  light.shadowMapHeight = 1024*2

var bmap =  THREE.ImageUtils.loadTexture('images/earthmap1k.jpg', {}, function(){});
var geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
var material = new THREE.MeshPhongMaterial({
  map: THREE.ImageUtils.loadTexture('images/earthmap1k.jpg'),
  bumpMap: bmap,
  bumpScale: 0.05,
  specularMap: THREE.ImageUtils.loadTexture('images/earthspec1k.jpg'),
  specular: '#D3D3D3'
});
var earthMesh = new THREE.Mesh( geometry, material );
scene.add( earthMesh );

camera.position.z = 1;

function render() {
  requestAnimationFrame (render);
  renderer.render( scene, camera);
  console.log('rendering')
  earthMesh.rotation.y += .003;
};

render();
