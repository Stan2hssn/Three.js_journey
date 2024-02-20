import { DirectionalLight } from 'three';
import Device from '../../pure/Device';
import Common from '../../Common';

export default class {
  constructor() {
    this.init();
  }

  init() {
    this.light = new DirectionalLight(0xffffff, 1);

    this.light.target.position.set(
      Common.camera.position.x,
      Common.camera.position.y,
      Common.camera.position.z,
    );
    this.light.position.set(
      Common.camera.position.x,
      Common.camera.position.y,
      Common.camera.position.z,
    );
  }

  dispose() {
    this.light.dispose();
  }

  render(t) {}

  resize() {}

  setDebug(debug) {}
}
