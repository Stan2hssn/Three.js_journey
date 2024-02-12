import { Group, SphereGeometry, MeshBasicMaterial, Mesh } from 'three';

export default class {
  Bushes = {};
  constructor(posX, posY, posZ) {
    this.init(posX, posY, posZ);
  }

  init(posX = 0, posY = 0, posZ = 0) {
    this.BushesGroup = new Group();

    this.geometry = new SphereGeometry(0.2, 16, 16);
    this.material = new MeshBasicMaterial({ color: 0x00000 });

    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.position.set(posX, posY, posZ);
  }

  dispose() {
    Object.keys(this.Bushes).forEach((key) => {
      this.Bushes[key].dispose();
    });
  }

  render(t) {}

  resize() {}
}
