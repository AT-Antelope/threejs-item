import { Group, Material, Mesh, MeshStandardMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import {
  frameColorTexture,
  frameRoughnessTexture,
  frameDispTexture,
} from "./TTexture";

const objLoader: OBJLoader = new OBJLoader();

/**
 * 相框
 * 材质:
 * displacementMap 位移贴图，按顶点计算，会影响顶点的移动，导致有缝隙
 * bumpMap  凹凸贴图，不影响顶点的实际位移
 */
// 异步，返回一个promise
export const getFrame = async (): Promise<Mesh | null> => {
  // const group = await objLoader.loadAsync("/photoFrame/Bilderrahmen_27x32.obj");
  const group = await objLoader.loadAsync("/photoFrame.obj");

  // 如果加载失败，打印错误信息，并中断
  if (!(group instanceof Group)) {
    console.error(group);
    return null;
  }

  // TIP obj文件下可能有多个模型，所有模型都在children数组下
  const frame: Mesh = group.children[0] as Mesh;

  // 清空之前的材质，as 判定为单个材质
  (frame.material as Material).dispose();

  // 设置材质
  frame.material = new MeshStandardMaterial({
    map: frameColorTexture,
    roughnessMap: frameRoughnessTexture,
    bumpMap: frameDispTexture,
  });

  frame.scale.set(0.065, 0.065, 0.065);
  frame.rotateY((Math.PI / 180) * -90);
  frame.position.z = -0.5;
  frame.position.y = 10;

  return frame;
};
