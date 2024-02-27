import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import * as THREE from "three";

export default class {
  constructor(
    path,
    posX,
    posY,
    posZ,
    scaleX,
    scaleY,
    scaleZ,
    rotationX,
    rotationY,
    rotationZ,
  ) {
    this.previousTime = 0;

    this.modelPath = path;

    this.posX = posX || 0;
    this.posY = posY || 0;
    this.posZ = posZ || 0;

    this.scaleX = scaleX || 0.05;
    this.scaleY = scaleY || 0.05;
    this.scaleZ = scaleZ || 0.05;

    this.rotationX = rotationX || 0;
    this.rotationY = rotationY || 0;
    this.rotationZ = rotationZ || 0;
  }

  load() {
    this.loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      this.loader.load(
        this.modelPath,
        (gltf) => {
          this.children = [...gltf.scene.children];

          for (this.child of this.children) {
            this.mesh = this.child;
          }

          if (gltf.animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(gltf.scene);
            this.action = this.mixer.clipAction(gltf.animations[1]);
            this.action.play();
          }

          this.mesh.position.set(this.posX, this.posY, this.posZ);
          this.mesh.scale.set(this.scaleX, this.scaleY, this.scaleZ);
          this.mesh.rotation.set(
            this.rotationX,
            this.rotationY,
            this.rotationZ,
          );
          resolve(this);
        },
        undefined,
        reject,
      );
    });
  }

  setPosition(x, y, z) {
    if (y === undefined && z === undefined) {
      this.posX = x;
      this.posY = x;
      this.posZ = x;
    } else {
      this.posX = x;
      this.posY = y;
      this.posZ = z;
    }
  }

  setScale(x, y, z) {
    if (y === undefined && z === undefined) {
      this.scaleX = x;
      this.scaleY = x;
      this.scaleZ = x;
    } else {
      this.scaleX = x;
      this.scaleY = y;
      this.scaleZ = z;
    }
  }

  setRotation(x, y, z) {
    if (y === undefined && z === undefined) {
      this.rotationX = x;
      this.rotationY = x;
      this.rotationZ = x;
    } else {
      this.rotationX = x;
      this.rotationY = y;
      this.rotationZ = z;
    }
  }

  dispose() {}

  render(t) {
    this.elapsedTime = t - this.previousTime;
    this.previousTime = t;

    if (this.mixer) {
      this.mixer.update(this.elapsedTime * 0.001);
    }
  }

  resize() {}

  setDebug(debug) {}
}
