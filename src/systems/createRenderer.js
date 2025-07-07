import { WebGLRenderer } from 'three'


function createRenderer() {
  const renderer = new WebGLRenderer({antialias: true})
  renderer.physicallyCorrectLights = true // 物理正确灯光

  return renderer
}

export { createRenderer }
