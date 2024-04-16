import * as THREE from 'three'

export default function useCamera(lookAt) {
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000)
  camera.position.set(200, 200, 200)
  camera.lookAt(lookAt) //指向mesh对应的位置
  // camera.lookAt(mesh.position.x,mesh.position.y,mesh.position.z);
  // camera.lookAt(0,0,0);
  return camera
}
