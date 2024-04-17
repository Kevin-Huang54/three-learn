<script setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import { GUI } from 'dat.gui'
import useLight from '@/three/useLight.js'
import useRender from '@/three/useRender.js'
import useCamera from '@/three/useCamera.js'
import useGeometry from '@/three/useGeometry.js'

onMounted(() => {
  render()
})

function render() {
  const gui = new GUI()
  const scene = new THREE.Scene()

  const mesh = useGeometry(scene)

  useLight(scene, gui)
  const camera = useCamera(mesh.position)
  useRender(
    scene,
    camera
    // () => mesh.rotateY(0.01)
  )
}
</script>

<template>
  <div></div>
  <!--  <div id="webgl" ref="webgl"></div>-->
  <!--  <el-slider v-model="value1" :max :step />-->
</template>

<style scoped></style>
<style>
body {
  overflow: hidden;
  margin: 0px;
}
</style>
