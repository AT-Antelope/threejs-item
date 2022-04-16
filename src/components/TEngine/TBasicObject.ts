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
 * 正方体
 */
const box: Mesh = new Mesh(
  new BoxBufferGeometry(10, 10, 10),
  new MeshStandardMaterial({ color: "rgb(255,0,0)" })
);
box.position.x = -10;

/**
 * 球
 */
const sphere: Mesh = new Mesh(
  new SphereGeometry(5),
  new MeshStandardMaterial({ color: "rgb(0,255,0)" })
);
sphere.position.z = -10;

/**
 * 圆柱体
 */
const cylinder: Mesh = new Mesh(
  new CylinderBufferGeometry(5, 5, 10, 3, 5),
  new MeshStandardMaterial({ color: "rgb(0,0,255)" })
);
cylinder.position.z = 10;

/**
 * ---------------------------------------------------------
 * 填充object数组
 */
basicObjectList.push(box, sphere, cylinder);
