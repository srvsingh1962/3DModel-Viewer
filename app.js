import * as THREE from './three.js-master/build/three.module.js'

import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'

import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

// Initials
const canvas = document.querySelector('#c');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0, 0, 2.8)
scene.add(camera)

const Texloader = new THREE.TextureLoader();
const bgTexture = Texloader.load('./background.jpg');
scene.background = bgTexture;

//3D model Loader
const loader = new GLTFLoader()
loader.load('./Model/scene.gltf', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    root.scale.set(0.01, 0.01, 0.01)
    scene.add(root)
}, function(load){
    console.log((load.loader/load.total * 100) + "% loaded")
}, function(err){
    console.log(err)
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#e5e5e5');
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

//Lights
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2, 2, 5)
scene.add(light)

//Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;

//Animation
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();