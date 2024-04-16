import * as THREE from 'three'

export default function useLight(scene, gui) {
  // 增加点光源
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(400, 200, 300)
  scene.add(pointLight) //点光源添加到场景中
  // 增加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight) //点光源添加到场景中

  gui.add(pointLight, 'intensity', 0, 1).name('点光源强度')
  const control = { rotate: true }
  gui.add(control, 'rotate', true).name('是否旋转')
}
