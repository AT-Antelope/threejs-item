import { Loader, Texture, TextureLoader } from "three";

/**
 * 材质加载器，贴图
 */
const textureLoader: TextureLoader = new TextureLoader();

/**
 * 图片
 * TIP '/'默认指向public文件夹
 */
export const pictureTexture: Texture = textureLoader.load("/2.jpg");

/**
 * 木板
 * Wood
 */
export const frameColorTexture = textureLoader.load(
  "/Wood/meterial/Wood047_1K_Color.jpg"
);
export const frameRoughnessTexture = textureLoader.load(
  "/Wood/meterial/Wood047_1K_Roughness.jpg"
);
export const frameDispTexture = textureLoader.load(
  "/Wood/meterial/Wood047_1K_Displacement.jpg"
);
