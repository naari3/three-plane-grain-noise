import vertexShader from '../shaders/noiseGradationVert.glsl'
import fragmentShader from '../shaders/noiseGradationFrag.glsl'
import * as THREE from "three";
import { gui } from '../Gui';

export function NoiseGradationPlane(params: { width: number, height: number, color: string, name?: string }) {
  const { width, height, color, name = 'plane' } = params
  const geometry = new THREE.PlaneGeometry(width, height)
  const aspect = geometry.parameters.width / geometry.parameters.height

  const fakeColor = {
    value: new THREE.Color(color),
  }

  const material = new THREE.ShaderMaterial({
    uniforms: {
      u_aspect: { value: aspect },
      u_color: { value: new THREE.Color(color).convertLinearToSRGB() },
      u_grainSize: { value: 11.0 },
      u_offset: { value: 0.6 },
      u_length: { value: 2.0 },
    },
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    depthTest: true,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = name

  const folder = gui.addFolder(`noise ${name}`)
  folder.add(mesh.material.uniforms.u_grainSize, 'value', 0, 20, 1).name('u_grainSize')
  folder.add(mesh.material.uniforms.u_offset, 'value', 0, 2, 0.01).name('u_offset')
  folder.add(mesh.material.uniforms.u_length, 'value', 0, 10, 0.01).name('u_length')
  folder.addColor(fakeColor, 'value').name('u_color').onChange((v: string) => {
    mesh.material.uniforms.u_color.value = new THREE.Color(v).convertLinearToSRGB()
  })

  return mesh
}
