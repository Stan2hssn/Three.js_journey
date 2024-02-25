import Powers from "./components/Powers";
import Controls from "./helpers/Controls";
import GridHelper from "./helpers/GridHelper";

export default class {
  component = {};
  helpers = {};

  constructor() {
    this.init();
  }

  init() {
    this.component.powers = new Powers();
    this.helpers.controls = new Controls();
    this.helpers.grid = new GridHelper(this.component.powers.floorParams, 10);
  }

  render(t) {
    Object.keys(this.component).forEach((_) => {
      this.component[_].render(t);
    });

    Object.keys(this.helpers).forEach((_) => {
      if (typeof this.helpers[_].render === "function") {
        this.helpers[_].render();
      }
    });
  }

  dispose() {
    Object.keys(this.component).forEach((_) => {
      this.component[_].dispose();
    });
    Object.keys(this.helpers).forEach((_) => {
      this.helpers[_].dispose();
    });
  }

  resize() {
    Object.keys(this.component).forEach((_) => {
      this.component[_].resize();
    });
  }
}
