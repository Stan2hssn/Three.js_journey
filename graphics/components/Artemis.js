import { Raycaster, Vector2 } from "three";
import Common from "../Common";
import Input from "../Input";

export default class Artemis {
  constructor() {
    this.raycaster = new Raycaster();
    this.interactivesObjects = [];
    this.previouslyIntersected = new Set();
    this.players = new Set();
  }

  init() {}

  add(object) {
    if (object.material) {
      object.originalColor = object.material.color.getHex();
    } else {
      object.traverse((child) => {
        if (child.material) {
          child.originalColor = child.material.color.getHex();
        }
      });
    }
    this.interactivesObjects.push(object);
  }

  render() {
    const pointer = new Vector2(Input.coords.x, Input.coords.y);
    this.raycaster.setFromCamera(pointer, Common.camera);

    const intersects = this.raycaster.intersectObjects(
      this.interactivesObjects,
      true,
    );
    const currentlyIntersected = new Set(
      intersects.map((intersect) => intersect.object),
    );

    intersects.forEach(({ object }) => {
      if (!this.previouslyIntersected.has(object)) {
        object.material.color.set(0xff0000);
      }

      if (Input.clicked) {
        console.log("clicked!", object.userData.loaderComponent);

        Input.clicked = null;
      }

      this.previouslyIntersected.add(object);
    });

    this.previouslyIntersected.forEach((object) => {
      if (!currentlyIntersected.has(object)) {
        object.material.color.set(object.originalColor);
        this.previouslyIntersected.delete(object);
      }
    });
  }
}
