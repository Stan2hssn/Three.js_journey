import { BoxGeometry, Mesh, MeshMatcapMaterial, TextureLoader } from "three";

import Texture from "/Texture/texture.png";

export default class {
  constructor(posX, posY, posZ) {
    this.init(posX, posY, posZ);
  }

  init(posX = 0, posY = 0, posZ = 0) {
    this.loader = new TextureLoader();
    this.textures = { matcap: this.loader.load(Texture) };

    this.geometry = new BoxGeometry(1, 1, 1);

    this.material = new MeshMatcapMaterial({ matcap: this.textures.matcap });

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(posX, posY, posZ);
  }

  render() {}

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }

  resize() {}
}
