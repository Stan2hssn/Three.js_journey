import { Group } from "three";
import { RapierPhysics } from "./simulation/World";

import Common from "../Common";
import Floor from "./starter/Floor";
import Cube from "./starter/Cube";

export default class {
  PhysicsBodies = {
    ground: {},
    bodies: {},
  };

  constructor() {
    this.physics, this.position;

    this.floorParams = {
      width: 20,
      height: 20,
      x: 0,
      y: -1,
      z: 0,
    };

    this.init();
  }

  init() {
    this.PhysicsBodiesGroup = new Group();

    this.run_simulation();
  }

  async run_simulation() {
    this.physics = await RapierPhysics();
    // this.physics.setGravity(0, -9.81, 0);
    // this.physics.setTimeStep(1 / 60);

    this.create_bodies();

    Object.keys(this.PhysicsBodies).forEach((parentKey) => {
      Object.keys(this.PhysicsBodies[parentKey]).forEach((key) => {
        this.PhysicsBodiesGroup.add(this.PhysicsBodies[parentKey][key].mesh);
      });
    });

    Common.scene.add(this.PhysicsBodiesGroup);
  }

  create_bodies() {
    // CREATE FLOOR

    this.PhysicsBodies.ground.floor = new Floor(
      this.floorParams.x,
      this.floorParams.y,
      this.floorParams.z,
      this.floorParams.width,
      this.floorParams.height,
    );

    this.PhysicsBodies.ground.floor.mesh.userData.physics = { mass: 0 };

    // ADD OTHERS GROUNDS TO WORLD

    // this.PhysicsBodies.ground.floor1 = new Floor(
    //   this.floorParams.x,
    //   (this.floorParams.y = 0),
    //   this.floorParams.z,
    //   this.floorParams.width,
    //   this.floorParams.height,
    // );

    // ADD GROUNDS PHYSICS TO WORLD

    Object.keys(this.PhysicsBodies.ground).forEach((key, id) => {
      this.PhysicsBodies.ground[key].name = `floor_${id}`;
      this.physics.addScene(this.PhysicsBodies.ground[key].mesh);
    });

    // CREATE CUBE

    this.PhysicsBodies.bodies.body = new Cube(0, 5, 0, 2, 2, 2);
    this.PhysicsBodies.bodies.body.mesh.userData.physics = {
      mass: 1,
      restitution: 1,
    };

    // ADD OTHERS CUBES TO WORLD

    this.PhysicsBodies.bodies.body1 = new Cube(0, 9, 0, 2, 2, 2);
    this.PhysicsBodies.bodies.body1.mesh.userData.physics = {
      mass: 1,
      restitution: 1,
    };

    // ADD CUBE PHYSICS TO WORLD

    Object.keys(this.PhysicsBodies.bodies).forEach((key, id) => {
      this.PhysicsBodies.bodies[key].name = `body_${id}`;
      this.physics.addScene(this.PhysicsBodies.bodies[key].mesh);
    });
  }

  dispose() {}

  render() {
    // this.physics.step();
  }

  resize() {}
}
