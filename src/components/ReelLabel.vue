<script setup lang="ts">
const props = defineProps<{ text: string; arrowIndex?: number }>();

// 各文字は2段 (通常/ホバー時の差し替え) を持つ。矢印は固定インデックスで遅延させる
const chars = [...props.text];
const arrowIndex = props.arrowIndex ?? 12;
</script>

<template>
  <span class="reel" aria-hidden="true">
    <span
      v-for="(char, index) in chars"
      :key="index"
      class="reel-character"
    >
      <span class="reel-track" :style="{ '--reel-index': index }">
        <span>{{ char }}</span><span>{{ char }}</span>
      </span>
    </span>
  </span>
  <span class="reel arrow" aria-hidden="true">
    <span class="reel-character">
      <span class="reel-track" :style="{ '--reel-index': arrowIndex }">
        <span>→</span><span>→</span>
      </span>
    </span>
  </span>
</template>
