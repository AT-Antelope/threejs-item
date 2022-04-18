import {
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial,
  SphereGeometry,
  CylinderBufferGeometry,
  Object3D,
  PlaneBufferGeometry,
} from "three";
import { pictureTexture } from "./TTexture";

export const basicObjectList: Object3D[] = [];

/**
 * 地面
 */
const stage: Mesh = new Mesh(
  new BoxBufferGeometry(100, 2, 100),
  new MeshStandardMaterial({ color: "rgb(150,150,150)", roughness: 0.5 })
);
stage.position.y = -1;
stage.castShadow = true;
stage.receiveShadow = true;

/**
 * 立方体
 */
const box: Mesh = new Mesh(
  new BoxBufferGeometry(10, 10, 10),
  new MeshStandardMaterial({ color: "aqua", roughness: 0.5, metalness: 0.3 })
);
box.position.y = 5;
box.castShadow = true;

/**
 * 相框
 * 贴图
 */
const plane: Mesh = new Mesh(
  new PlaneBufferGeometry(192, 108),
  new MeshStandardMaterial({ map: pictureTexture })
);
plane.position.y = 10;
plane.scale.set(0.1, 0.1, 0.1);

/**
 * ---------------------------------------------------------
 * 填充object数组
 */
basicObjectList.push(stage, plane);
