import {
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial,
  SphereGeometry,
  CylinderBufferGeometry,
  Object3D,
  pictureBufferGeometry,
} from "three";
import { pictureTexture } from "./TTexture";

export const basicObjectList: Object3D[] = [];

/**
 * 地面
 */
const stage: Mesh = new Mesh(
  new BoxBufferGeometry(600, 2, 100),
  new MeshStandardMaterial({ color: "rgb(150,150,150)", roughness: 0.5 })
);
stage.position.y = -1;
stage.castShadow = true;
stage.receiveShadow = true;

/**
 * 背景墙
 */
export const bgWall: Mesh = new Mesh(
  new BoxBufferGeometry(600, 40, 4),
  new MeshStandardMaterial({ color: "white" })
);
bgWall.receiveShadow = true;
bgWall.position.z = -48;
bgWall.position.y = 20;
// 更新矩阵和世界矩阵，否则辅助线等，一直指向原点
bgWall.updateMatrix();
bgWall.updateMatrixWorld();

/**
 * 立方体
 */
const box: Mesh = new Mesh(
  new BoxBufferGeometry(10, 10, 10),
  new MeshStandardMaterial({ color: "aqua", roughness: 0.5, metalness: 0.3 })
);
box.castShadow = true;
box.position.y = 5;

/**
 * 照片
 * 贴图
 */
const picture: Mesh = new Mesh(
  new pictureBufferGeometry(192, 108),
  new MeshStandardMaterial({ map: pictureTexture })
);
picture.position.y = 20;
picture.position.z = -44.6
picture.scale.set(0.1, 0.1, 0.1);

/**
 * ---------------------------------------------------------
 * 填充object数组
 */
basicObjectList.push(stage, bgWall, picture);
