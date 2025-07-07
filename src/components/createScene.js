import { Scene, Color } from 'three'

function createScene() {
  const scene = new Scene()
  scene.background = new Color(0xaaaaaa)
  return scene
}

export { createScene }
