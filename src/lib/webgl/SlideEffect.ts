import * as THREE from 'three';
import vertexShader from './vertexShader.vert?raw';
import fragmentShader from './fragmentShader.frag?raw';
import gsap from 'gsap';

interface SlideEffectOptions {
  images: string[];
  imagesRatio?: number;
  displacementPath: string;
  intensity?: number; // 変異の強さ
  duration?: number;
  loopInterval?: number;
  easing?: string;
}

export class SlideEffect {
  private container: HTMLElement;
  private width: number;
  private height: number;
  private images: string[];
  private imagesRatio: number;

  // WebGL
  private textures: THREE.Texture[];
  private displacement: THREE.Texture; // 変位マップ
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private material: THREE.ShaderMaterial;
  private mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;

  // Animation
  private duration: number;
  private loopInterval: number;
  private intensity: number;
  private currentIndex: number;
  private nextIndex: number;
  private progress: number;
  private isTransitioning: boolean;
  private easing: string;

  constructor(canvas: HTMLCanvasElement, options: SlideEffectOptions) {
    this.container = canvas.parentElement as HTMLElement;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.images = options.images;
    this.imagesRatio = options.imagesRatio ?? 1;
    this.intensity = options.intensity ?? 1;
    this.duration = options.duration ?? 3500;
    this.loopInterval = options.loopInterval ?? 5000;
    this.currentIndex = 0;
    this.nextIndex = 1;
    this.progress = 0;
    this.isTransitioning = false;
    this.easing = options.easing ?? 'power2.out';

    const displacementPath = options.displacementPath;
    const { scaleX, scaleY } = this.calcImagesRatio();

    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      1,
      1000,
    );
    this.camera.position.z = 1;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(2.0);
    this.renderer.setClearColor(0xffffff, 0.0);
    this.renderer.setSize(this.width, this.height);

    // テクスチャ読み込み
    const loader = new THREE.TextureLoader();
    this.textures = this.images.map((src) => loader.load(src));
    this.displacement = loader.load(displacementPath);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: this.textures[this.currentIndex] },
        uTexture2: { value: this.textures[this.nextIndex] },
        uDisplacement: { value: this.displacement },
        uProgress: { value: this.progress },
        uIntensity: { value: this.intensity },
        res: {
          value: new THREE.Vector4(this.width, this.height, scaleX, scaleY),
        },
      },
      vertexShader,
      fragmentShader,
    });

    const geometry = new THREE.PlaneGeometry(this.width, this.height, 1);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    window.addEventListener('resize', this.handleResize);
    this.animate();
    this.startLoop();
  }

  private calcImagesRatio() {
    let scaleX, scaleY;
    if (this.height / this.width < this.imagesRatio) {
      scaleX = 1;
      scaleY = this.height / this.width / this.imagesRatio;
    } else {
      scaleX = (this.width / this.height) * this.imagesRatio;
      scaleY = 1;
    }

    return { scaleX, scaleY };
  }

  private handleResize = () => {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    const { scaleX, scaleY } = this.calcImagesRatio();

    this.mesh.material.uniforms.res.value = new THREE.Vector4(
      this.width,
      this.height,
      scaleX,
      scaleY,
    );
    this.renderer.setSize(this.width, this.height);
  };

  private animate = () => {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };

  private startLoop() {
    setInterval(() => {
      if (!this.isTransitioning) this.startTransition();
    }, this.loopInterval);
  }

  private startTransition() {
    this.isTransitioning = true;
    gsap.to(this.material.uniforms.uProgress, {
      value: 1,
      duration: this.duration / 1000,
      ease: this.easing,
      onComplete: () => {
        this.currentIndex = this.nextIndex;
        this.nextIndex = (this.nextIndex + 1) % this.textures.length;

        this.material.uniforms.uTexture1.value = this.textures[this.currentIndex];
        this.material.uniforms.uTexture2.value = this.textures[this.nextIndex];
        this.material.uniforms.uProgress.value = 0;
        this.isTransitioning = false;
      },
    });
  }
}
