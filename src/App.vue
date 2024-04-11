<script setup>
import * as THREE from 'three'
import { onMounted, ref, watch } from 'vue'

onMounted(() => {
  render()
})

const value1 = ref(50)

watch(value1, () => {
  render(true)
})

const webgl = ref(null)

function render(update) {
  const scene = new THREE.Scene()

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(100, 60, 20),
    new THREE.MeshBasicMaterial({
      color: 0xff0000, //0xff0000设置材质颜色为红色
      transparent: true, //开启透明
      opacity: 0.5 //设置透明度
    })
  )
  mesh.position.set(value1.value, 0, 0)
  scene.add(mesh)

  // AxesHelper：辅助观察的坐标系
  const axesHelper = new THREE.AxesHelper(150)
  scene.add(axesHelper)

  // width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
  const width = 800 //宽度
  const height = 500 //高度
  // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
  camera.position.set(200, 200, 200)
  camera.lookAt(mesh.position) //指向mesh对应的位置
  // camera.lookAt(mesh.position.x,mesh.position.y,mesh.position.z);
  // camera.lookAt(0,0,0);

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height) //设置three.js渲染区域的尺寸(像素px)
  renderer.render(scene, camera) //执行渲染操作

  if (update) {
    webgl.value.innerHTML = ''
  }
  webgl.value.appendChild(renderer.domElement)
}
</script>

<template>
  <div id="webgl" ref="webgl" style="margin-top: 200px; margin-left: 100px"></div>
  <el-slider v-model="value1" />
</template>

<style scoped></style>
