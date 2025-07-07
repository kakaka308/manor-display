// Loop.js
// import { Clock } from 'three';

// const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = []; // 用于存储需要每一帧更新的对象
  }

  start() {
    this.renderer.setAnimationLoop(() => { // 使用 WebGLRenderer 的 setAnimationLoop 方法
      // 告诉每一个可动画对象向前“走”一帧
      this.tick(); // 调用 tick 方法来更新所有可更新对象

      // 渲染一帧
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null); // 停止动画循环
  }

  tick() {
    // 每帧只调用一次 getDelta 函数！
    // const delta = clock.getDelta(); // 获取自上一帧以来经过的时间（以秒为单位）

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    // 遍历所有可更新对象（现在是立方体），并直接应用旋转

      for (const object of this.updatables) {
  if (object.isOrbitControls) {
    object.update(); // 更新控制器
  }
  // else {
  //   // 假设updatables中存放的是您想要旋转的立方体对象
  //   object.rotation.y += 1 * delta;
  //   object.rotation.x += 0.5 * delta;
  // }
}

    }
}

export { Loop };
