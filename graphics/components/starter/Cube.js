import { BoxGeometry, Mesh, MeshMatcapMaterial, TextureLoader } from "three";

import Texture from "/Texture/texture.png";

export default class {
  constructor(posX, posY, posZ, width, height, depht, physics) {
    this.physics = physics;

    this.init(posX, posY, posZ, width, height, depht);
  }

  init(posX = 0, posY = 0, posZ = 0, width = 1, height = 1, depht = 1) {
    this.loader = new TextureLoader();
    this.textures = { matcap: this.loader.load(Texture) };

    this.geometry = new BoxGeometry(width, height, depht);

    this.material = new MeshMatcapMaterial({ matcap: this.textures.matcap });

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(posX, posY, posZ);
  }

  render() {}

  dispose() {
    // Dispose of Three.js components
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();

    // Remove the mesh from the Three.js scene
    if (this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
    // Remove the body from the Rapier world

    if (this.physics) {
      this.physics.removeScene(this.mesh); // Assuming `this.physics` is accessible
    }
  }

  resize() {}
}
