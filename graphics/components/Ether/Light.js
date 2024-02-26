import * as THREE from "three";
import Common from "../../Common";

export default class Light {
  params = {
    posXZ: {
      x: -4,
      y: 4,
    },
    posY: 6,
    color: 0xffffff,
    dir_intensity: 1,
    amb_intensity: 2,
  };

  constructor(posX, posY, posZ, color, intensity, targetX, targetY, targetZ) {
    this.posX = posX || this.params.posXZ.x;
    this.posY = posY || this.params.posY;
    this.posZ = posZ || this.params.posXZ.y;
    this.color = color || this.params.color;
    this.intensity = intensity || this.params.intensity;
    this.targetX = targetX || 0;
    this.targetY = targetY || 0;
    this.targetZ = targetZ || 0;

    this.init();
  }

  init() {
    this.directionalLight();
    this.ambientLight();
  }

  directionalLight() {
    this.light = new THREE.DirectionalLight(this.color, this.dir_intensity);
    this.light.position.set(this.posX, this.posY, this.posZ);
    this.light.target.position.set(this.targetX, this.targetY, this.targetZ);

    this.light.rotateZ(Math.PI / 2);

    this.light.castShadow = true; // default false
    this.light.shadow.bias = -0.0001;
    this.light.shadow.mapSize.width = 2048; // default
    this.light.shadow.mapSize.height = 2048; // default

    this.lightHelper = new THREE.DirectionalLightHelper(this.light, 2);
    this.lightHelper.setRotationFromQuaternion(this.light.quaternion);

    Common.scene.add(this.lightHelper);
  }

  ambientLight() {
    this.ambient = new THREE.AmbientLight(0x404040, this.params.amb_intensity); // soft white light
    Common.scene.add(this.ambient);
  }

  dispose() {
    this.light.dispose();
    this.light.parent.remove();
  }

  render(t) {
    this.lightHelper.update();
  }

  resize() {}

  setDebug(debug) {
    const { light, ambient } = this;
    const params = this.params;

    this.ambient = debug.addFolder({
      title: "Ambient Light",
      expanded: true,
    });

    this.ambient
      .addBinding(params, "amb_intensity", {
        label: "ambient Intensity",
        min: 0,
        max: 10,
        step: 0.1,
      })
      .on("change", () => {
        ambient.intensity = params.amb_intensity;
      });

    // Add light properties to the debug UI
    this.directional = debug.addFolder({
      title: "directional Light",
      expanded: true,
    });

    // Intensity control
    this.directional
      .addBinding(params, "dir_intensity", {
        label: "Intensity",
        min: 0,
        max: 10,
        step: 0.1,
      })
      .on("change", () => {
        light.intensity = params.dir_intensity;
      });

    // Color control

    this.directional
      .addBinding(params, "color", {
        view: "color",
      })
      .on("change", () => {
        params.color = params.color;
      });

    // Position X & Y control
    this.directional
      .addBinding(params, "posXZ", {
        picker: "inline",
        label: "X & Z",
        expanded: true,
        min: -10,
        max: 10,
      })
      .on("change", () => {
        light.position.x = params.posXZ.x;
        light.position.z = params.posXZ.y;
      });

    // Position Z control
    this.directional
      .addBinding(params, "posY", {
        label: "Y",
        min: -2,
        max: 8,
        step: 0.1,
      })
      .on("change", () => {
        light.position.y = params.posY;
      });
  }
}
