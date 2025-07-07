<script setup>
import { ref } from 'vue'
import World from '@/components/World/World.vue'

// 控制每个part是否显示
const showPart11 = ref(true)
const showPart12 = ref(true)

// 模型配置数组
const models = [
  showPart11.value && {
    modelPath: '/models/door1/老码头.glb',
    position: [0, 10, 0],
    scale: [6, 6, 6],
    rotation: [0, -Math.PI / 2, 0],
  },
  showPart12.value && {
    modelPath: '/models/door1/鹿(1).glb',
    position: [10, 10, 0],
    scale: [5, 5, 5],
    rotation: [0, 0, 0],
  },
].filter(Boolean)
</script>

<template>
  <World :models="models" />
</template>

<style scoped>
.door-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 700px;
  height: auto;
  z-index: 10;
}
.scene-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  left: 0;
  top: 0;
  z-index: 1;
}
</style>
