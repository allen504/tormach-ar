import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
floor.position.y = -0.63
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Models
 */
const gltfLoader = new GLTFLoader()

gltfLoader.load(
    '/models/tormach.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene.children[0])
    }
)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-0.003,0.762,3)
camera.rotation.set(0,0,0)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true
//controls.enabled=false

let obj={
    onButton: function(){
        camera.position.set(1.796,0.593,0.604)
        camera.rotation.set(0,1.6,0)
        controls.update()

    },
    display: function(){
        camera.position.set(0.523, 0.544, 1.805)
        camera.rotation.set(0.033, -0.495, 0.016)
        //controls.update()
    },
    centered: function(){
        camera.position.set(-0.003,0.762,3)
        camera.rotation.set(0,0,0)
        controls.update()
    },
    spindle: function(){
        camera.position.set(0.009,0.791,0.713)
        camera.rotation.set(0,0,0)
        controls.update()
    },
    bed: function(){
        camera.position.set(-0.023,1.109,1.530)
        camera.rotation.set(-0.549,0.042,0.025)
        //controls.update()
    },
    manualControls: function(){
        camera.position.set(0.512,0.723,1.707)
        camera.rotation.set(0,0,0)
        //controls.update()
    }
}

//GUI
gui.add(camera.position,'x').min(-5).max(5).step(0.1)
gui.add(camera.position,'y').min(-5).max(5).step(0.1)
gui.add(camera.position,'z').min(-5).max(5).step(0.1)
gui.add(camera.rotation,'x').min(-5).max(5).step(0.1)
gui.add(camera.rotation,'y').min(-5).max(5).step(0.1)
gui.add(camera.rotation,'z').min(-5).max(5).step(0.1)
gui.add(obj, 'onButton')
gui.add(obj, 'display')
gui.add(obj, 'centered')
gui.add(obj, 'spindle')
gui.add(obj, 'bed')
gui.add(obj, 'manualControls')



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    console.log(camera.position)
    console.log(camera.rotation)

    // Update controls
    //controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()