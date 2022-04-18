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

// 网格
const gridHelper: GridHelper = new GridHelper(
  500,
  20,
  "rgb(100,100,100)",
  "rgb(50,50,50)"
);

// 点光，辅助
const pointLightHelper: PointLightHelper = new PointLightHelper(
  pointLight,
  pointLight.distance,
  pointLight.color
);

// 聚光，辅助
const spotLightHelper: SpotLightHelper = new SpotLightHelper(
  spotLight,
  spotLight.color
);

/**
 * -----------------------------------------------------------------------------------
 * 填充辅助数组
 */
helperList.push(axesHelper, gridHelper);
