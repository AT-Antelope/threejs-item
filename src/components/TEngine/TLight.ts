import { AmbientLight, Color, Object3D, PointLight, SpotLight } from "three";
import { bgWall } from "./TBasicObject";

export const lightList: Object3D[] = [];

// 环境光
const ambientLight: AmbientLight = new AmbientLight("rgb(255,255,255)", 0.3);

// 点光
export const pointLight: PointLight = new PointLight(
  "rgb(255,255,255)",
  0.7,
  50,
  0.1
);
pointLight.position.set(20, 20, 20);

// 聚光
export const spotLight: SpotLight = new SpotLight(
  "rgb(255,255,255)",
  1,
  200,
  (Math.PI / 180) * 30,
  1,
  1
);
spotLight.castShadow = true;
spotLight.position.set(0, 20, 100);
spotLight.target = bgWall;

/**
 * ----------------------------------------------------------------
 * 填充光源数组
 */
lightList.push(ambientLight, spotLight);
