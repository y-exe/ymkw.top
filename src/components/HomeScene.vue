<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { initScene } from "../scene/scene";

const modelContainer = ref<HTMLElement | null>(null);
const hint = ref<HTMLElement | null>(null);

onMounted(() => {
  if (modelContainer.value && hint.value) {
    initScene(modelContainer.value, hint.value);
  }
});

onBeforeUnmount(() => {
  // 単一ページのためシーンの破棄は行わない
});
</script>

<template>
  <div ref="modelContainer" class="model" aria-hidden="true">
    <span ref="hint" hidden></span>
  </div>
</template>
