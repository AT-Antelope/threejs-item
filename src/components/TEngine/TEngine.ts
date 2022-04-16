import {
  MOUSE,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class TEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;

  constructor(dom: HTMLElement) {
    this.dom = dom;

    /**
     * antialias  抗锯齿
     */
    this.renderer = new WebGLRenderer({
      antialias: true,
    });
    /**
     * 产生阴影
     * 1.允许渲染阴影
     * 2.产生阴影，被照射物品、光源(照射范围内)
     * 3.接收阴影，接收阴影的物品
     */
    this.renderer.shadowMap.enabled = true;

    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      45,
      dom.offsetWidth / dom.offsetHeight,
      1,
      1000
    );

    // 视角位置
    this.camera.position.set(40, 40, 40);
    // 视角朝向
    this.camera.lookAt(new Vector3(0, 0, 0));
    // 视角旋转
    this.camera.up = new Vector3(0, 1, 0);

    // 性能监视器，three用function的方式封装，所以不能使用new创建，直接使用
    const stats = Stats();
    const statsDom = stats.domElement;
    statsDom.style.position = "fixed";
    statsDom.style.top = "0";
    statsDom.style.right = "5px";
    statsDom.style.left = "unset";

    // OrbitControls 轨道控制器，鼠标控制相机
    const orbitControls: OrbitControls = new OrbitControls(
      this.camera,
      this.dom
    );
    // orbitControls.autoRotate = true;
    // 阻尼，惯性效果
    orbitControls.enableDamping = true;
    // 自定义鼠标按钮效果，取消左键
    orbitControls.mouseButtons = {
      LEFT: null as unknown as MOUSE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE,
    };

    const renderFunc = () => {
      // 使用orbitControls轨道控制器后，再手动调整相机会产生冲突
      // this.camera.position.x += -0.01;

      // 刷新时的颜色
      // this.renderer.setClearColor("rgb(255,255,255)");
      // this.renderer.clearColor();

      // 更新轨道控制器
      orbitControls.update();

      // 渲染画面
      this.renderer.render(this.scene, this.camera);

      // 更新性能监视器
      stats.update();

      // 回调渲染
      requestAnimationFrame(renderFunc);

      console.log("rendered");
    };

    renderFunc();

    // domElement 就是一个canvas对象
    dom.appendChild(this.renderer.domElement);
    dom.appendChild(statsDom);
  }
  /**
   * constructor
   * end
   */

  // 添加物体
  addObject(...object: Object3D[]) {
    object.forEach((item) => {
      this.scene.add(item);
    });
  }
}
