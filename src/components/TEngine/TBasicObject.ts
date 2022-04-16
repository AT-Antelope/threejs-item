import {
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial,
  SphereGeometry,
  CylinderBufferGeometry,
  Object3D,
} from "three";

export const basicObjectList: Object3D[] = [];

/**
 * 地面
 */
const stage: Mesh = new Mesh(
  new BoxBufferGeometry(200, 10, 200),
  new MeshStandardMaterial({ color: "rgb(150,150,150)", roughness: 0.5 })
);
stage.position.y = -5;
stage.castShadow = true;
stage.receiveShadow = true;

/**
 * 立方体
 */
const box: Mesh = new Mesh(
  new BoxBufferGeometry(10, 10, 10),
  new MeshStandardMaterial({ color: "aqua", roughness: 0.5, metalness: 0.5 })
);
box.position.y = 5;
box.castShadow = true;

/**
 * ---------------------------------------------------------
 * 填充object数组
 */
basicObjectList.push(stage, box);
