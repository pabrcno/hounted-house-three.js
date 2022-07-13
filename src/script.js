import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Fog
const fogColor = "#262837";
const fog = new THREE.Fog(fogColor, 1, 15);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
//door
const doorColorTexture = textureLoader.load("dist/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("dist/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "dist/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("dist/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("dist/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "dist/textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "dist/textures/door/roughness.jpg"
);
//walls
const bricksColorTexture = textureLoader.load(
  "dist/textures/bricks/oldWood.jpg"
);
const bricksAmbientOcclusionTexture = textureLoader.load(
  "dist/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load(
  "dist/textures/bricks/normal.jpg"
);
const bricksRoughnessTexture = textureLoader.load(
  "dist/textures/bricks/roughness.jpg"
);
//floor
const grassColorTexture = textureLoader.load("dist/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "dist/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("dist/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "dist/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

//roof
const roofColorTexture = textureLoader.load("dist/textures/roof/color.jpg");
const roofAmbientOcclusionTexture = textureLoader.load(
  "dist/textures/roof/ambientOcclusion.jpg"
);
const roofNormalTexture = textureLoader.load("dist/textures/roof/normal.jpg");
const roofRoughnessTexture = textureLoader.load(
  "dist/textures/roof/roughness.jpg"
);

//grave
const graveColorTexture = textureLoader.load("dist/textures/grave/color.jpg");
const graveAmbientOcclusionTexture = textureLoader.load(
  "dist/textures/grave/ambientOcclusion.jpg"
);
const graveNormalTexture = textureLoader.load("dist/textures/grave/normal.jpg");
const graveRoughnessTexture = textureLoader.load(
  "dist/textures/grave/roughness.jpg"
);
/**
 * House
 */

const house = new THREE.Group();
scene.add(house);

//Walls

const wallsHeight = 2.5;
const wallsWidth = 4;
const wallsPositionY = wallsHeight / 2;
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(wallsWidth, wallsHeight, wallsWidth),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.set(0, wallsPositionY, 0);

house.add(walls);

// Roof
const roofHeight = 1;
const roofSegments = 4;
const roofRadius = 3.5;
const roofRotationAlign = Math.PI / 4;
const roofPositionY = wallsHeight + roofHeight / 2;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(roofRadius, roofHeight, roofSegments),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,

    aoMap: roofAmbientOcclusionTexture,

    displacementScale: 0.1,
    normalMap: roofNormalTexture,

    roughnessMap: roofRoughnessTexture,
  })
);
roof.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2)
);

roof.position.set(0, roofPositionY, 0);
roof.rotateY(roofRotationAlign);
house.add(roof);

// Door

const doorWidth = 2;
const doorHeight = 2;
const doorPositionZ = wallsWidth / 2 + 0.001;

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(doorWidth, doorHeight, 10, 10),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: roofAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.2,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

door.position.set(0, 0.9, doorPositionZ);
house.add(door);

// Bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  map: grassColorTexture,
  aoMap: grassAmbientOcclusionTexture,
  normalMap: grassNormalTexture,
});

const bushesZPosition = wallsWidth / 2 + 0.5;

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(wallsWidth / 2.2, 0.4, bushesZPosition);
bush1.scale.set(0.5, 0.5, 0.5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);

bush2.position.set(wallsWidth / 2.6, 0.28, bushesZPosition);
bush2.scale.set(0.45, 0.35, 0.35);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);

bush3.position.set(wallsWidth / 2, 0.35, bushesZPosition);
bush3.scale.set(0.5, 0.4, 0.4);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-wallsWidth / 2.2, 0.4, bushesZPosition);
bush4.scale.set(0.5, 0.5, 0.5);

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);

bush5.position.set(-wallsWidth / 2.4, 0.28, bushesZPosition);
bush5.scale.set(0.45, 0.45, 0.35);

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial);

bush6.position.set(-wallsWidth / 2, 0.35, bushesZPosition);
bush6.scale.set(0.4, 0.4, 0.4);

const bushes = [bush1, bush2, bush3, bush4, bush5, bush6];
house.add(...bushes);

// Graves

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,

  aoMap: graveAmbientOcclusionTexture,

  displacementScale: 0.1,
  normalMap: graveNormalTexture,

  roughnessMap: graveRoughnessTexture,
});
graveGeometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(graveGeometry.attributes.uv.array, 2)
);

for (let i = 0; i < 40; i++) {
  const gravesPositionConstrains = {
    angle: Math.random() * Math.PI * 2,
    radius: 4 + Math.random() * 6,
    x: function () {
      return Math.sin(this.angle) * this.radius;
    },
    z: function () {
      return Math.cos(this.angle) * this.radius;
    },
  };

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(
    gravesPositionConstrains.x(),
    0.3,
    gravesPositionConstrains.z()
  );
  grave.rotateX((Math.random() - 0.5) * 0.4);
  grave.rotateZ((Math.random() - 0.5) * 0.4);
  grave.castShadow = true;
  house.add(grave);
}
/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#aaaaff", 1, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#aaaaff", 1, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#aaaaff", 1, 3);
scene.add(ghost3);
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d3ff", 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

let doorLightIntensity = 0.4;

const doorLight = new THREE.PointLight("#ff7d46", doorLightIntensity, 7);
doorLight.position.set(0, doorHeight + 0.2, doorPositionZ + 0.7);
house.add(doorLight);

//Shadows
moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(fogColor);
renderer.shadowMap.enabled = true;
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // Ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
