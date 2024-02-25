import { GridHelper } from "three";
import Common from "../Common";

export default class {
  constructor(floorParams, divisions) {
    this.floorParams = floorParams;
    if (this.floorParams) {
      this.floorParams.width > this.floorParams.height
        ? (this.size = this.floorParams.width)
        : (this.size = this.floorParams.height);
      this.size = floorParams.width || 10;

      this.floorParams.x = floorParams.x || 0;
      this.floorParams.y = floorParams.y || 0;
      this.floorParams.z = floorParams.z || 0;
    }

    this.divisions = divisions || 10;

    this.init();
  }

  init() {
    this.gridHelper = new GridHelper(this.size, this.divisions);
    this.gridHelper.position.set(
      this.floorParams.x,
      this.floorParams.y,
      this.floorParams.z,
    );
    this.gridHelper.traverseVisible((s) => {
      s.material.opacity = 0.25;
      s.material.transparent = true;
    });

    Common.scene.add(this.gridHelper);
  }
}
