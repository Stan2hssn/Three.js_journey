import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  TextureLoader,
} from 'three';

import Texture from '/Texture/texture.png';

export default class {
  constructor(posX, posY, posZ) {
    this.loader = new TextureLoader();

    this.textures = {
      matcap: this.loader.load(Texture),
    };

    this.geometry = new BoxGeometry(4, posY * 2, 4);

    this.material = new MeshMatcapMaterial();
    this.material.matcap = this.textures.matcap;

    this.init(posX, posY, posZ);
  }

  init(posX = 0, posY = 0, posZ = 0) {
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(posX, posY, posZ);
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }

  render(t) {}

  resize() {}

  setDebug(debug) {}
}
