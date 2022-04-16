<template>
  <div ref="threeTarget" class="three-canvas"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { TEngine } from "./components/TEngine/TEngine";
import { basicObjectList } from "./components/TEngine/TBasicObject";

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
      TE.addObject(...basicObjectList);
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
