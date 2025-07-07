<template>
  <div ref="container" style="width: 700px; height: 700px">
    <!-- 渲染所有模型 -->
    <PartModel
      v-for="(model, idx) in models"
      :key="model.modelPath + idx"
      v-bind="model"
      :onLoaded="(mesh) => addToScene(mesh)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineOptions } from 'vue'
defineOptions({ name: 'ThreeWorld' })
import { createCamera } from '@/components/createCamera.js'
import { createScene } from '@/components/createScene.js'
import { createLights } from '@/components/createLights.js'
import { createRenderer } from '@/systems/createRenderer'
import { Resizer } from '@/systems/Resize'
import { Loop } from '@/systems/Loop'
import { createControls } from '@/systems/createControls'
import PartModel from '@/components/door1/PartModel.vue'
import { Raycaster, Vector2 } from 'three'

defineProps({
  models: {
    type: Array,
    default: () => [],
  },
})

const container = ref(null)
let camera, renderer, loop, controls, scene

const meshes = [] // 保存所有 mesh
const raycaster = new Raycaster()
const mouse = new Vector2()
let focusedMesh = null
let originalScale = null

onMounted(() => {
  camera = createCamera(container.value)
  scene = createScene()
  renderer = createRenderer()
  controls = createControls(camera, renderer.domElement, scene)
  loop = new Loop(camera, scene, renderer)

  container.value.append(renderer.domElement)

  const light = createLights()
  scene.add(light)
  loop.updatables.push(controls)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
  new Resizer(container.value, camera, renderer)

  // 启动渲染循环
  loop.start()

  // 监听双击事件
  renderer.domElement.addEventListener('dblclick', onDblClick, false)
  document.addEventListener('fullscreenchange', onFullscreenChange)
})

function addToScene(mesh) {
  if (scene && mesh) {
    scene.add(mesh)
    meshes.push(mesh)
  }
}

function onDblClick(event) {
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(meshes, true)
  if (intersects.length > 0) {
    const mesh = intersects[0].object
    enterFullscreenAndFocus(mesh)
  }
}

function enterFullscreenAndFocus(mesh) {
  // 进入全屏
  if (container.value.requestFullscreen) {
    container.value.requestFullscreen()
  } else if (container.value.webkitRequestFullscreen) {
    container.value.webkitRequestFullscreen()
  } else if (container.value.mozRequestFullScreen) {
    container.value.mozRequestFullScreen()
  } else if (container.value.msRequestFullscreen) {
    container.value.msRequestFullscreen()
  }
  // 放大模型
  focusedMesh = mesh
  originalScale = mesh.scale.clone()
  mesh.scale.multiplyScalar(3)
}

function onFullscreenChange() {
  if (!document.fullscreenElement && focusedMesh && originalScale) {
    focusedMesh.scale.copy(originalScale)
    focusedMesh = null
    originalScale = null
  }
}

onUnmounted(() => {
  renderer.domElement.removeEventListener('dblclick', onDblClick, false)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  // 停止渲染循环，清理事件和 DOM
  loop && loop.stop()
  if (renderer && renderer.domElement && container.value) {
    container.value.removeChild(renderer.domElement)
  }
})
</script>

<style scoped>
/* 可根据需要自定义样式 */
</style>
