import { Group } from 'three';

import Common from '../Common';

import Floor from './house/Floor';
import walls from './house/Walls';
import Roof from './house/Roof';

import Bush from './garden/Bush';
import Grave from './garden/Grave';
import Particles from './particles';

export default class {
  House = {};
  Bushes = {};
  Grave = {};

  params = {
    bushPrimary: 0x314d3e,
    bushSecondary: 0x0d2e1c,
    grave: 0x4d4d4d,
  };

  constructor() {
    this.init();
  }

  init() {
    //
    // House //
    //

    this.HouseGroup = new Group();

    this.House.floor = new Floor();
    this.House.walls = new walls(0, 1, 0);
    this.House.roof = new Roof(0, 3, 0);

    //
    // Bushes
    //

    this.BushesGroup = new Group();

    // The order of the objects in the scene is important //

    this.Bushes.smallBush1 = new Bush(-1.5, 0.05, 2.1);
    this.Bushes.bigBush1 = new Bush(-1, 0.05, 2);

    this.Bushes.smallBush2 = new Bush(0.6, 0, 2.1);
    this.Bushes.bigBush2 = new Bush(1, 0, 2);
    this.Bushes.smallBush3 = new Bush(1.4, 0, 2);

    //
    // Grave
    //

    this.GraveGroup = new Group();

    for (let i = 0; i < 50; i++) {
      this.Grave = new Grave();

      this.radius = 5 + Math.random() * 4;
      this.angle = Math.random() * Math.PI * 2;
      this.posX = Math.cos(this.angle) * this.radius;
      this.posZ = Math.sin(this.angle) * this.radius;

      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 0.05;

      this.Grave.mesh.position.set(this.posX, 0.2, this.posZ);
      this.Grave.mesh.rotation.set(0, this.rotY, this.rotZ);
      this.Grave.mesh.material.color.set(this.params.grave);

      this.GraveGroup.add(this.Grave.mesh);
    }

    //
    // Extra
    //

    this.particles = new Particles();
    //
    // End of the order of the objects in the scene //
    //

    this.Bushes.bigBush1.mesh.scale.set(2.6, 2.6, 2.6);
    this.Bushes.bigBush2.mesh.scale.set(2.3, 2.3, 2.3);

    this.Bushes.smallBush2.mesh.scale.set(1.3, 1.3, 1.3);
    this.Bushes.smallBush3.mesh.scale.set(1.6, 1.6, 1.6);

    //
    // Add to their group //
    //

    Object.keys(this.House).forEach((key) => {
      this.HouseGroup.add(this.House[key].mesh);
    });

    Object.keys(this.Bushes).forEach((key, id) => {
      id % 2 === 0
        ? this.Bushes[key].mesh.material.color.set(this.params.bushPrimary)
        : this.Bushes[key].mesh.material.color.set(this.params.bushSecondary);

      this.BushesGroup.add(this.Bushes[key].mesh);
    });

    //
    // Add to the scene //
    //

    Common.scene.add(
      this.HouseGroup,
      this.BushesGroup,
      this.GraveGroup,
      this.particles.particles,
    );
  }

  dispose() {}

  render(t) {
    Object.keys(this.House).forEach((key) => {
      this.House[key].render(t);
    });

    Object.keys(this.Bushes).forEach((key) => {
      this.Bushes[key].render(t);
    });

    this.GraveGroup.children.forEach((grave) => {
      grave.rotation.z += 0.001;
    });

    this.particles.render(t);
  }

  resize() {}

  setDebug(debug) {
    Object.keys(this.House).forEach((key) => {
      this.House[key].setDebug(debug);
    });
  }
}
