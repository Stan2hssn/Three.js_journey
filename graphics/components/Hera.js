import { Group, Vector3 } from "three";

import Common from "../Common";

import Floor from "./Hestia/Floor";
import Cube from "./Hestia/Cube";
import Artemis from "./Artemis";
import Light from "./Ether/Light";
import Loader from "./Hestia/Loader";

export default class {
  Hestia = {
    primaries: {},
    models: {},
  };
  Ether = {};

  constructor() {
    this.target = new Vector3(0, 0, 0);
    this.Artemis = new Artemis();

    this.init();
  }

  init() {
    this.HestiaGroup = new Group();
    this.EtherGroup = new Group();

    this.hestia();
    this.ether();

    Object.keys(this.Hestia.primaries).forEach((_) => {
      this.Artemis.add(this.Hestia.primaries[_].mesh);
      this.HestiaGroup.add(this.Hestia.primaries[_].mesh);
    });

    Object.keys(this.Hestia.models).forEach((_, i) => {
      this.Hestia.models[_].load().then((__) => {
        const mesh = __.mesh;
        mesh.userData.loaderComponent = __;

        this.Artemis.add(mesh);

        this.HestiaGroup.add(mesh);
      });
    });

    Object.keys(this.Ether).forEach((_) => {
      this.EtherGroup.add(this.Ether[_].light);
    });

    Common.scene.add(this.HestiaGroup, this.EtherGroup);
  }

  hestia() {
    this.Hestia.primaries.floor = new Floor(0, 0, 0);
    // this.Hestia.cube = new Cube(0, 2, 0);

    this.Hestia.models.fox = new Loader("/Models/Fox/glTF/Fox.gltf", -2, 0, 2);

    this.Hestia.models.duck = new Loader(
      "/Models/Duck/glTF/Duck.gltf",
      2,
      0,
      -2,
    );

    this.Hestia.models.fox.setScale(0.05);
    this.Hestia.models.duck.setScale(0.025);

    this.Hestia.models.fox.setRotation(0, Math.PI / 5, 0);
    this.Hestia.models.duck.setRotation(0, -Math.PI / 5, 0);

    this.target = this.Hestia.primaries.floor.mesh.position;
  }

  ether() {
    this.Ether.light = new Light();

    this.Ether.light.light.target.position.set(
      this.target.x,
      this.target.y,
      this.target.z,
    );
  }

  dispose() {
    Object.keys(this.Hestia).forEach((_) => {
      this.Hestia[_].dispose();
    });
  }

  render(t) {
    Object.keys(this.Hestia.primaries).forEach((_) => {
      this.Hestia.primaries[_].render(t);
    });

    Object.keys(this.Ether).forEach((_) => {
      this.Ether[_].render(t);
    });

    Object.keys(this.Hestia.models).forEach((_) => {
      this.Hestia.models[_].render(t);
    });

    this.Artemis.render();
  }

  resize() {}

  setDebug(debug) {
    Object.keys(this.Ether).forEach((_) => {
      this.Ether[_].setDebug(debug);
    });
  }
}
