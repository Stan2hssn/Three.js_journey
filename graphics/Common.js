import Device from './pure/Device.js';
import gsap from 'gsap';

import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import Input from './Input.js';

class Common {
  // create a scene and the parameters for the scene
  scene = new Scene();
  params = {
    sceneColor: 0x222222,
    cameraFov: 70,
    cameraNear: 0.01,
    cameraFar: 10000.0,
  };

  constructor() {
    // this.scene.background = new Color(this.params.sceneColor);
    this.isCameraFixed = false;
    this.scale = 1;

    this.cameraX = 0;
    this.cameraY = 0;
    this.cameraZ =
      (Device.viewport.height /
        Math.tan((this.params.cameraFov * Math.PI) / 360)) *
      0.5;

    this.xTo = gsap.quickTo(this, 'cameraX', {
      duration: 0.6,
      ease: 'power3',
    });
    this.yTo = gsap.quickTo(this, 'cameraY', {
      duration: 0.6,
      ease: 'power3',
    });

    this.z = 300;

    this.camera = new PerspectiveCamera(
      this.params.cameraFov,
      Device.viewport.width / Device.viewport.height,
      this.params.cameraNear,
      this.params.cameraFar,
    );

    this.render = this.render.bind(this);
  }

  init({ canvas }) {
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      alpha: true,
      stencil: false,
      powerPreference: 'high-performance',
      antialias: false,
    });

    this.renderer.physicallyCorrectLights = true;

    this.renderer.setPixelRatio(Device.pixelRatio);

    this.resize();
  }

  render(t) {
    this.xTo(-Input.coords.x * 100);
    this.yTo(Input.coords.y * 20);

    this.cameraY -= Device.scrollTop;

    this.camera.position.set(this.cameraX, this.cameraY, this.cameraZ);
    this.camera.lookAt(0, this.cameraY, 0);

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.renderer.dispose();
  }

  resize() {
    Device.viewport.width = this.renderer.domElement.parentElement.offsetWidth;
    Device.viewport.height =
      this.renderer.domElement.parentElement.offsetHeight;

    this.scale = 1;

    this.camera.position.set(0, -Device.scrollTop, this.cameraZ);
    this.camera.aspect = Device.viewport.width / Device.viewport.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(Device.viewport.width, Device.viewport.height);
  }
}

export default new Common();
