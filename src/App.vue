<script setup>
import * as THREE from 'three'
import { onMounted, ref, watch } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
onMounted(() => {
  render()
})

const value1 = ref(1)

watch(value1, () => {
  render(true)
})

const webgl = ref(null)

function render(update) {
  const scene = new THREE.Scene()

  const geometry = new THREE.BoxGeometry(100, 50, 50)
  const material = new THREE.MeshLambertMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  // mesh.position.set(0, 0, 0)
  // scene.add(mesh)14
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
      // 在XOZ平面上分布
      mesh.position.set(i * 200, 0, j * 200)
      scene.add(mesh) //网格模型添加到场景中
    }
  } // AxesHelper：辅助观察的坐标系
  const axesHelper = new THREE.AxesHelper(200)
  scene.add(axesHelper)

  // 增加点光源
  const pointLight = new THREE.PointLight(0xffffff, value1.value)
  pointLight.position.set(400, 200, 300)
  scene.add(pointLight) //点光源添加到场景中

  // 增加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight) //点光源添加到场景中

  // width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
  // const width = window.innerWidth //窗口文档显示区的宽度作为画布宽度
  // const height = window.innerHeight //窗口文档显示区的高度作为画布高度

  const width = 1000
  const height = 800
  // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
  camera.position.set(200, 200, 200)
  camera.lookAt(mesh.position) //指向mesh对应的位置
  // camera.lookAt(mesh.position.x,mesh.position.y,mesh.position.z);
  // camera.lookAt(0,0,0);

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height) //设置three.js渲染区域的尺寸(像素px)
  renderer.render(scene, camera) //执行渲染操作
  const stats = new Stats()
  //stats.domElement:web页面上输出计算结果,一个div元素，
  document.body.appendChild(stats.domElement)

  if (update) {
    webgl.value.innerHTML = ''
  }
  // document.getElementById('app').appendChild(renderer.domElement)
  webgl.value.appendChild(renderer.domElement)

  // 渲染函数
  function rerender() {
    stats.update()
    renderer.render(scene, camera) //执行渲染操作
    mesh.rotateY(0.01) //每次绕y轴旋转0.01弧度
    requestAnimationFrame(rerender) //请求再次执行渲染函数render，渲染下一帧
  }
  rerender()

  // window.onresize = function () {
  //   // 重置渲染器输出画布canvas尺寸
  //   renderer.setSize(window.innerWidth, window.innerHeight)
  //   // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  //   camera.aspect = window.innerWidth / window.innerHeight
  //   // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  //   // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  //   // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  //   console.log(camera)
  //   camera.updateProjectionMatrix()
  // }

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement)
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    renderer.render(scene, camera) //执行渲染操作
  }) //监听鼠标、键盘事件
}

const max = 1
const step = 0.1
</script>

<template>
  <div id="webgl" ref="webgl"></div>
  <el-slider v-model="value1" :max :step />
</template>

<style scoped></style>
<style>
body {
  overflow: hidden;
  margin: 0px;
}
</style>
