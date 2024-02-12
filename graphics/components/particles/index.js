import {
  PointsMaterial,
  Points,
  BufferGeometry,
  Float32BufferAttribute,
  TextureLoader,
} from 'three';

export default class {
  param = {
    count: 10000,
    size: 0.2,
    radius: 20,
  };
  position = [];

  constructor() {
    this.texture = new TextureLoader().load('/Texture/particle.jpg');

    this.particlesGeometry = new BufferGeometry();
    this.particlesMaterial = new PointsMaterial({
      size: this.param.size,
      sizeAttenuation: true,
      map: this.texture,
      transparent: true,
      depthWrite: false,
      alphaTest: 0.001,
      color: 0xbebebe,
      blending: 2,
    });

    console.log(this.particlesTexture);

    this.init();
  }

  init() {
    for (let i = 0; i < this.param.count; i++) {
      this.x = (Math.random() - 0.5) * this.param.radius;
      this.y = (Math.random() - 0.5) * this.param.radius;
      this.z = (Math.random() - 0.5) * this.param.radius;

      this.position.push(this.x, this.y, this.z);
    }

    this.particlesGeometry.setAttribute(
      'position',
      new Float32BufferAttribute(this.position, 3),
    );

    this.particles = new Points(this.particlesGeometry, this.particlesMaterial);
  }

  dispose() {}

  render(t) {
    this.particlesGeometry.attributes.position.needsUpdate = true;
    if (this.particles) {
      this.particlesGeometry.attributes.position.array.forEach((_, i) => {
        if (i % 3 === 1 || i % 3 === 2) {
          this.particlesGeometry.attributes.position.array[i] -= 0.001;
          if (this.particlesGeometry.attributes.position.array[i] < -10) {
            this.particlesGeometry.attributes.position.array[i] = 10;
          }
        }
      });
    }
  }
  resize() {}

  setDebug(debug) {}
}
