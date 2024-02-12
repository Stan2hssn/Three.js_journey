import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

export default class {
  constructor() {
    this.init();
  }

  init() {
    this.gravesGroup = new Group();

    this.geometry = new BoxGeometry(0.8, 1, 0.3);
    this.material = new MeshBasicMaterial({ color: 0x00000 });

    this.mesh = new Mesh(this.geometry, this.material);
  }

  dispose() {
    Object.keys(this.Bushes).forEach((key) => {
      this.Bushes[key].dispose();
    });
  }

  render(t) {}

  resize() {}
}
