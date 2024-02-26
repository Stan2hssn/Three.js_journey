import Common from "./Common";
import Hera from "./components/Hera";
import Controls from "./helpers/Controls";
import GridHelper from "./helpers/GridHelper";

export default class {
  component = {};
  helpers = {};

  constructor() {
    this.init();
  }

  init() {
    this.component.powers = new Hera();
    this.helpers.controls = new Controls();
    this.helpers.grid = new GridHelper(10, 10);
  }

  render(t) {
    Object.keys(this.component).forEach((key) => {
      this.component[key].render(t);
    });

    Object.keys(this.helpers).forEach((key) => {
      if (typeof this.helpers[key].render === "function") {
        this.helpers[key].render();
      }
    });
  }

  dispose() {
    Object.keys(this.component).forEach((key) => {
      this.component[key].dispose();
    });
    Object.keys(this.helpers).forEach((key) => {
      this.helpers[key].dispose();
    });
  }

  resize() {
    Object.keys(this.component).forEach((key) => {
      this.component[key].resize();
    });
  }

  setDebug() {
    Object.keys(this.component).forEach((_) => {
      if ("setDebug" in this.component[_]) {
        this.component[_].setDebug(Common.debug);
      } else {
        console.warn(`setDebug() not found in ${_}`);
      }
    });
  }
}
