import Stats from 'three/addons/libs/stats.module.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default function useRender(scene, camera, rerenderCallBack) {
  // 辅助观察坐标系
  scene.add(new THREE.AxesHelper(200))

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight) //设置three.js渲染区域的尺寸(像素px)
  renderer.render(scene, camera) //执行渲染操作

  // 渲染函数
  const stats = new Stats()
  document.body.appendChild(stats.domElement)

  document.getElementById('app').appendChild(renderer.domElement)
  // webgl.value.appendChild(renderer.domElement)

  function rerender() {
    stats.update()
    renderer.render(scene, camera) //执行渲染操作
    rerenderCallBack?.()
    requestAnimationFrame(rerender) //请求再次执行渲染函数render，渲染下一帧
  }
  // 打开实时更新
  rerender()

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement)
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    renderer.render(scene, camera) //执行渲染操作
  }) //监听鼠标、键盘事件
}
