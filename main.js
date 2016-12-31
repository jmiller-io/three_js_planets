var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75,  window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize (window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

var light = new THREE.AmbientLight( 0x888888, 1.5)
scene.add( light )

  var light = new THREE.DirectionalLight( 0xcccccc, .2 )
  light.position.set(5,5,5)
  scene.add( light )

// Planet Earth
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


// Create the clouds
canvasCloud = THREE.ImageUtils.loadTexture('images/earthcloudmap.jpg', 'images/earthcloudmaptrans.jpg' )
var geometry = new THREE.SphereGeometry(0.51, 32, 32)
var material = new THREE.MeshPhongMaterial ({
  map: canvasCloud,
  side: THREE.DoubleSide,
  opacity: 0.8,
  transparent: true,
  depthWrite: false,
})

// var cloudMesh = new THREE.Mesh(geometry, material)
// earthMesh.add(cloudMesh)

// sets distance of camera from planet
camera.position.z = 1;

function render() {
  requestAnimationFrame (render);
  renderer.render( scene, camera);
  // earthMesh.rotation.y += .003;
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
