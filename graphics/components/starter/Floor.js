import { PlaneGeometry, MeshBasicMaterial, Mesh, BoxGeometry } from "three";

export default class {
  constructor(posX, posY, posZ, width, depth) {
    this.width = width || 10;
    this.height = 0.01;
    this.depth = depth || 10;

    this.posX = posX || 0;
    this.posY = posY || 0;
    this.posZ = posZ || 0;

    this.init();
  }

  init() {
    this.geometry = new BoxGeometry(this.width, this.height, this.depth);
    this.material = new MeshBasicMaterial({ color: 0x111111, side: 2 });
    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.position.set(this.posX, this.posY - this.height / 2, this.posZ);
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }

  render(t) {}

  resize() {}
}
