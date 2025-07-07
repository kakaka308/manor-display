// DirectionalLight => 阳光
// PointLight => 灯泡
// AmbientLight => 环境光
// SpotLight => 聚光灯
// RectAreaLight => 条形照明或明亮的窗户
import { DirectionalLight, AmbientLight, Group } from 'three'

function createLights() {
  const ambientLight = new AmbientLight(0xffffff, 1) // 柔和环境光
  const mainLight = new DirectionalLight(0xffffff, 1) // 方向光
  mainLight.position.set(10, 10, 10)
  const group = new Group()
  group.add(ambientLight)
  group.add(mainLight)
  return group
}

export { createLights }
