import { TextureLoader, MeshToonMaterial, NearestFilter } from 'three';

import Device from '../../pure/Device';
import Box from './instances/Box';
import Sphere from './instances/Sphere';
import Torus from './instances/Torus';

import GradientMap from '/Texture/gradients/5.jpg';

export default class {
  constructor($target, geometry) {
    this.$target = $target;
    this.geometry = geometry;

    this.scale = 1;

    this.gradientMap = new TextureLoader().load(GradientMap);
    this.gradientMap.magFilter = NearestFilter;
    console.log('this.gradientMap: ', this.gradientMap);

    this.geometryInstancer = {
      Box: Box,
      Sphere: Sphere,
      Torus: Torus,
    };

    this.init();
  }

  init() {
    const GeometryClass = this.geometryInstancer[this.geometry];
    if (GeometryClass) {
      this.instance = new GeometryClass();

      this.mesh = this.instance.mesh;
      this.mesh.material = new MeshToonMaterial({
        color: 0xafa6a3,
        transparent: true,
        gradientMap: this.gradientMap,
      });
    } else {
      console.error(this.geometry);
    }
  }

  dispose() {}

  render(t) {
    this.instance.render(t);
  }

  resize(scale, height, width) {
    const rect = this.$target.getBoundingClientRect();
    this.scale = scale;
    this.height = height;
    this.width = width;

    this.mesh.scale.set(
      rect.width * this.scale,
      rect.height * this.scale,
      rect.width * this.scale,
    );

    this.mesh.position.set(
      rect.left + rect.width * 0.5 - this.width * 0.5,
      -rect.top - Device.scrollTop - rect.height * 0.5 + this.height * 0.5,
      0,
    );
  }

  setDebug(debug) {}
}
