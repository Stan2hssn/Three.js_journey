import {
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
} from "three";

export default class {
  constructor(posX, posY, posZ) {
    this.posX = posX || 0;
    this.posY = posY || 0;
    this.posZ = posZ || 0;

    this.width = 10;
    this.height = 10;
    this.depth = 0.2;

    this.init();
  }

  init() {
    this.geometry = new BoxGeometry(this.width, this.height, this.depth);
    this.material = new MeshStandardMaterial({ color: 0x222222, side: 2 });
    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.mesh.position.set(this.posX, this.posY - this.depth / 2, this.posZ);
    this.mesh.rotation.x = -Math.PI / 2;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }

  render(t) {}

  resize() {}
}
