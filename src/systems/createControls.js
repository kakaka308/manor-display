import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  // 用 .saveState保存当前视图，然后使用 .reset恢复它
  //   controls.saveState();
  // controls.reset();
  controls.tick = () => controls.update()

  return controls
}

export { createControls }
