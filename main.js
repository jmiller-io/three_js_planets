var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75,  window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize (window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

var light = new THREE.AmbientLight( 0x888888)
scene.add( light )

var light = new THREE.DirectionalLight( 0xcccccc, 1)
light.position.set(5,3,5)
scene.add( light )

// Planet Earth
var loader = new THREE.TextureLoader();
var texture1 = loader.load('images/earthmap1k.jpg');
var texture2 = loader.load('images/earthspec1k.jpg');
var texture3 = loader.load('images/cloud_map_with_trans.jpg');

var geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
var material = new THREE.MeshPhongMaterial({
  map: texture1,
  bumpMap: texture1,
  bumpScale: 0.05,
  specularMap: texture2,
  specular: new THREE.Color('grey'),
  shininess: 10
});
var earthMesh = new THREE.Mesh( geometry, material );
scene.add( earthMesh );


// Create the clouds
var geometry = new THREE.SphereGeometry(0.503, 32, 32)
var material = new THREE.MeshPhongMaterial ({
  map: texture3,
  side: THREE.DoubleSide,
  opacity: 0.275,
  transparent: true,
  depthWrite: false
})
var clouds = new THREE.Mesh( geometry, material);
earthMesh.add( clouds );


// sets distance of camera from planet
camera.position.z = 1.5;

function render() {
  requestAnimationFrame (render);
  renderer.render( scene, camera);
  earthMesh.rotation.y += .002;
  //clouds.rotation.y += .002;
};

render();




// move camera position
document.onkeydown = checkKey;

// check key function
function checkKey(event) {
  e = event;
  console.log(e)
  if (e.code === "ArrowLeft") {
    console.log('left')
    earthMesh.rotation.y += 1/32
  } else if (e.code === "ArrowRight") {
    console.log('right')
    earthMesh.rotation.y -= 1/32
  } else if (e.code === "ArrowUp") {
    console.log('Up')
    earthMesh.rotation.x += 1/32
  } else if (e.code === "ArrowDown") {
    console.log('down')
    earthMesh.rotation.x -= 1/32
  }
}
