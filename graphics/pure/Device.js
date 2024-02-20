export default {
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};
