import { Group } from 'three';

import Common from '../Common';

import Instance from './instance';
import Light from './utils/Light';

import Device from '../pure/Device';

export default class {
  Instances = {};
  Utils = {};
  $target = null;

  constructor() {
    this.init();
  }

  init() {
    this.InstancesGroup = new Group();
    this.utilsGroup = new Group();

    this.Utils.light = new Light();

    // this.Instances.floor = new Floor();
    this.$target = document.querySelectorAll('.item');

    this.$target.forEach((el, index) => {
      this.geometryAttribute = el.getAttribute('geometry');

      this.instance = new Instance(this.$target[index], this.geometryAttribute);
      this.Instances[index] = this.instance;
    });

    Object.keys(this.Utils).forEach((key) => {
      this.utilsGroup.add(this.Utils[key].light);
    });

    Object.keys(this.Instances).forEach((key) => {
      this.InstancesGroup.add(this.Instances[key].mesh);
    });

    Common.scene.add(this.InstancesGroup, this.utilsGroup);
  }

  dispose() {}

  render(t) {
    Object.keys(this.Instances).forEach((key) => {
      this.Instances[key].render(t);
    });
  }

  resize(scale, height, width) {
    Object.keys(this.Instances).forEach((key) => {
      this.Instances[key].resize(scale, height, width);
    });
  }
}
