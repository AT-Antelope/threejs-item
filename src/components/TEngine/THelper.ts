import {
  AxesHelper,
  GridHelper,
  Object3D,
  PointLightHelper,
  SpotLightHelper,
} from "three";
import { pointLight, spotLight } from "./TLight";

export const helperList: Object3D[] = [];

// 轴线
const axesHelper: AxesHelper = new AxesHelper(500);
// TIP 辅助线也是object物体，默认射线发射器会拾取辅助线，覆盖three的源码里的射线拾取响应事件为空，不再向intersects数组push当前uv信息
axesHelper.raycast = () => {};

// 网格
const gridHelper: GridHelper = new GridHelper(
  500,
  20,
  "rgb(100,100,100)",
  "rgb(50,50,50)"
);
gridHelper.raycast = () => {};

// 点光，辅助
const pointLightHelper: PointLightHelper = new PointLightHelper(
  pointLight,
  pointLight.distance,
  pointLight.color
);
pointLightHelper.raycast = () => {};

// 聚光，辅助
const spotLightHelper: SpotLightHelper = new SpotLightHelper(
  spotLight,
  spotLight.color
);
// // TIP 聚光灯辅助 是把一个cone圆锥(new LineSegment()对象)放入其中，需要把子对象进行raycast事件覆盖
// // TIP (TEngine.ts) raycaster.intersectObjects()，第二个参数是是否递归射线判断所有children，设为true后，就只会获取第一个对象(不包括子对象)，就不会获取到spotLightHelper里的cone了
// spotLightHelper.children.forEach((obj) => {
//   obj.raycast = () => {};
// });

/**
 * -----------------------------------------------------------------------------------
 * 填充辅助数组
 */
helperList.push(axesHelper, gridHelper, spotLightHelper);
