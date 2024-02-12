import { BoxGeometry, Mesh, MeshStandardMaterial, TextureLoader } from 'three';

export default class {
  constructor(posX, posY, posZ) {
    this.geometry = new BoxGeometry(4, posY * 2, 4);

    this.material = new MeshStandardMaterial({ color: 0x222222 });

    this.init(posX, posY, posZ);
  }

  init(posX = 0, posY = 0, posZ = 0) {
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(posX, posY, posZ);
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }

  render(t) {
    this.mesh.rotation.y = Math.cos(t / 500);
  }

  resize() {}

  setDebug(debug) {}
}
