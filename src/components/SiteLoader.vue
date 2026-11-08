<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const loader = ref<HTMLElement | null>(null);
const closing = ref(false);

function close() {
  closing.value = true;
  window.setTimeout(() => {
    loader.value?.remove();
  }, 900);
}

onMounted(() => {
  const startedAt = performance.now();
  const complete = () => {
    const remaining = Math.max(0, 700 - (performance.now() - startedAt));
    window.setTimeout(close, remaining);
  };
  window.addEventListener("ymkw:scene-ready", complete, { once: true });
  window.setTimeout(complete, 8000);
});

onBeforeUnmount(() => {
  // ページ遷移時のクリーンアップ (このサイトは単一ページなので実質不要)
});
</script>

<template>
  <div
    ref="loader"
    class="site-loader"
    :class="{ 'is-closing': closing }"
    role="status"
    aria-label="ホームページを読み込んでいます"
  >
    <div class="site-loader-grid" aria-hidden="true">
      <span class="site-loader-char site-loader-char-1">や</span>
      <span class="site-loader-char site-loader-char-2">ま</span>
      <span class="site-loader-char site-loader-char-3">か</span>
      <span class="site-loader-char site-loader-char-4">わ</span>
    </div>
  </div>
</template>
