import {
  MOUSE,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

export class TEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private transformControls: TransformControls;
  private mouse: Vector2;
  private raycaster: Raycaster;

  constructor(dom: HTMLElement) {
    this.dom = dom;

    /**
     * antialias  抗锯齿
     */
    const renderer = new WebGLRenderer({
      antialias: true,
    });
    /**
     * 产生阴影
     * 1.允许渲染阴影
     * 2.产生阴影，被照射物品、光源(照射范围内)
     * 3.接收阴影，接收阴影的物品
     */
    renderer.shadowMap.enabled = true;

    renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    const scene = new Scene();
    this.camera = new PerspectiveCamera(
      45,
      dom.offsetWidth / dom.offsetHeight,
      1,
      1000
    );

    // 视角位置
    this.camera.position.set(40, 100, 100);
    // 视角朝向
    this.camera.lookAt(new Vector3(0, 0, 0));
    // 视角旋转
    this.camera.up = new Vector3(0, 1, 0);
    // this.camera.updateProjectionMatrix();

    /**
     *  性能监视器，three用function的方式封装，所以不能使用new创建，直接使用
     */
    const stats = Stats();
    const statsDom = stats.domElement;
    statsDom.style.position = "fixed";
    statsDom.style.top = "0";
    statsDom.style.right = "5px";
    statsDom.style.left = "unset";

    /**
     *  初始化 OrbitControls 轨道控制器，鼠标控制相机
     *  TIP 原绑定为dom，即传进来的div(非里面的canvas)，导致raycaster射线拾取器的点击事件监听无效
     */
    const orbitControls: OrbitControls = new OrbitControls(
      this.camera,
      renderer.domElement
    );
    // orbitControls.autoRotate = true;
    // 阻尼，惯性效果
    // orbitControls.enableDamping = true;
    // 自定义鼠标按钮效果，取消左键
    orbitControls.mouseButtons = {
      LEFT: null as unknown as MOUSE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE,
    };

    /**
     *  初始化 变换控制器，也属于一个物体
     */
    const transformControls: TransformControls = new TransformControls(
      this.camera,
      renderer.domElement
    );
    scene.add(transformControls);

    document.addEventListener("keyup", (eve) => {
      if (eve.key == "t") {
        transformControls.mode = "translate";
        return false;
      } else if (eve.key == "r") {
        transformControls.mode = "rotate";
        return false;
      } else if (eve.key == "s") {
        transformControls.mode = "scale";
        return false;
      }
    });

    /**
     *  初始化射线发射器(拾取器)
     */
    const raycaster = new Raycaster();

    /**
     * 缓存当前指向物体，用于物品的指向激活状态
     * 在renderer.doElement的mousemove事件里被 射线发射器 赋值，拾取到的第一个物品
     */
    let cacheObject: Object3D | null = null;

    /**
     * 给renderer的canvas对象添加鼠标事件
     */
    const mouse = new Vector2();
    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;
    renderer.domElement.addEventListener("mousemove", (eve) => {
      x = eve.offsetX;
      y = eve.offsetY;
      width = renderer.domElement.offsetWidth;
      height = renderer.domElement.offsetHeight;
      // mouse.x = (x - width / 2) / width / 2;
      mouse.x = (x / width) * 2 - 1;
      // mouse.y = (height / 2 - y) / height / 2;
      mouse.y = (-y * 2) / height + 1;

      /**
       * TIP IMPORTANT
       * 实现物品的指向激活状态
       * 实现方式: 手动判断当前状态，进行事件匹配
       * 原理: 光标进入范围后，只会不断触发mouseenter(相当于原mousemove的效果)，只需要定义一个flag，第一次进入时设为true，之后再次触发都手动匹配为mousemove，离开时手动匹配为mouseleave
       */
      raycaster.setFromCamera(mouse, this.camera);

      scene.remove(transformControls);
      // 射线穿过的物体可能有多个，组成一个数组
      const intersection = raycaster.intersectObjects(scene.children, false);
      scene.add(transformControls);

      // 拾取到有物体
      if (intersection.length) {
        const object = intersection[0].object;

        // 新旧物体不一样，进入新物体
        if (object !== cacheObject) {
          // 存在旧物体，不是第一次进入
          if (cacheObject) {
            // 不是同个物体，先触发离开事件
            cacheObject.dispatchEvent({ type: "mouseleave" });
          }
          // 同个物体
          object.dispatchEvent({ type: "mouseenter" });
        } else if (object === cacheObject) {
          // 在同一个物体中移动
          object.dispatchEvent({ type: "mousemove" });
        }
        // 缓存当前物体
        cacheObject = object;
      } else {
        // 没拾取到物体，移动到空白区域
        if (cacheObject) {
          // 触发离开事件
          cacheObject.dispatchEvent({ type: "mouseleave" });
        }
        cacheObject = null;
      }
    });

    /**
     * TIP IMPORTANT
     * 问题1: 第一次触发完click选中一样东西，第二次mouseDown按住拖动控件，mouseUp松开后会再次触发click事件(选中其他东西，导致第二次拖动失效)
     * 想法: 采用按钮的方式改变状态值，或根据flag标记判断行为
     * 解决: 采用flag标记当前状态，mouseDown按下时标记true，在click内做判断，松开时再次触发click，如果flag为true则return返回，不再继续执行
     */
    // 变换事件flag
    let transformFlag = false;
    transformControls.addEventListener("mouseDown", (eve) => {
      transformFlag = true;
    });
    // 拾取物品
    renderer.domElement.addEventListener("click", (eve) => {
      // 变换状态中，则还原变换状态为false，并中断
      if (transformFlag) {
        transformFlag = false;
        return;
      }

      raycaster.setFromCamera(mouse, this.camera);

      /**
       * TIP IMPORTANT
       * 问题2: 拖动一次后，变换控制器 会卡住，无法再次选中其他物品(类似被 变换控制器 挡住，换个视角可以正常拾取)
       * 原因: 变换控制器 也是个物体，包括其他看不到的东西，再次拾取物品时，会选中 变换控制器 上的东西，导致无法再次选中其他物品
       * 解决: 每次拾取前移除 变换控制器，拾取后重新添加，避免 射线发射器 拾取到变换控制器
       */
      scene.remove(transformControls);
      // 射线穿过的物体可能有多个，组成一个数组
      const intersection = raycaster.intersectObjects(scene.children, false);
      scene.add(transformControls);

      if (!intersection.length) return;

      const object = intersection[0].object;
      // console.log(object);
      transformControls.attach(object);
    });

    /**
     *  渲染，回调
     */
    const renderFunc = () => {
      // 使用orbitControls轨道控制器后，再手动调整相机会产生冲突
      // this.camera.position.x += -0.01;

      // 刷新时的颜色
      // renderer.setClearColor("rgb(255,255,255)");
      // renderer.clearColor();

      // 更新轨道控制器，鼠标控制
      orbitControls.update();

      // 渲染画面
      renderer.render(scene, this.camera);

      // 更新性能监视器
      stats.update();

      // 回调渲染
      requestAnimationFrame(renderFunc);

      // console.log("rendered");
    };
    renderFunc();

    // domElement 就是一个canvas对象
    dom.appendChild(renderer.domElement);
    dom.appendChild(statsDom);

    // 优化性能，防止每次多访问一次父级
    this.renderer = renderer;
    this.scene = scene;
    this.transformControls = transformControls;
    this.mouse = mouse;
    this.raycaster = raycaster;
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
