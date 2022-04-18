<template>
  <div ref="threeTarget" class="three-canvas"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { TEngine } from "./components/TEngine/TEngine";
import { basicObjectList } from "./components/TEngine/TBasicObject";
import { lightList } from "./components/TEngine/TLight";
import { helperList } from "./components/TEngine/THelper";
import { getFrame } from "./components/TEngine/TLoadModel";

export default defineComponent({
  name: "app-root",
  setup() {
    /**
     * data
     */
    const threeTarget = ref(null);

    /**
     * 生命周期
     */
    onMounted(() => {
      const TE = new TEngine(threeTarget.value!);
      // 加载物体
      TE.addObject(...basicObjectList);
      // 加载光源
      TE.addObject(...lightList);
      // 加载辅助
      TE.addObject(...helperList);

      // 加载第三方模型
      getFrame().then((frame) => {
        frame && TE.addObject(frame);
        
      });
    });

    return {
      /* data */
      threeTarget,
    };
  },
});
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
.three-canvas {
  width: 100%;
  height: 100%;
}
</style>
