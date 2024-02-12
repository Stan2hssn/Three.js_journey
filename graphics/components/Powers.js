import { Group } from 'three';

import Common from '../Common';

import Floor from './house/Floor';
import walls from './house/Walls';
import Roof from './house/Roof';

export default class {
  House = {};

  constructor() {
    this.init();
  }

  init() {
    this.HouseGroup = new Group();

    this.House.floor = new Floor();
    this.House.walls = new walls(0, 1, 0);
    this.House.roof = new Roof(0, 3, 0);

    Object.keys(this.House).forEach((key) => {
      Common.scene.add(this.House[key].mesh);
    });

    Common.scene.add(this.HouseGroup);
  }

  dispose() {}

  render(t) {
    Object.keys(this.House).forEach((key) => {
      this.House[key].render(t);
    });
  }

  resize() {}

  setDebug(debug) {
    Object.keys(this.House).forEach((key) => {
      this.House[key].setDebug(debug);
    });
  }
}
