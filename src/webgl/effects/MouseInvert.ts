import * as THREE from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { gl } from "../core/WebGL";
import fragmentShader from "../shaders/mouseInvertFrag.glsl";
import vertexShader from "../shaders/mouseInvertVert.glsl";
import { mouse2d } from "../utils/Mouse2D";

class MouseInvert {
	public pass: ShaderPass;
	private mouseTarget = new THREE.Vector2();

	constructor() {
		this.pass = this.createPass();
	}

	private createPass() {
		console.log({ r: new THREE.Color("#151c68").r, g: new THREE.Color("#151c68").g, b: new THREE.Color("#151c68").b });
		const shader: THREE.Shader = {
			uniforms: {
				tDiffuse: { value: null },
				u_screenAspect: { value: gl.size.aspect },
				u_mouse: { value: new THREE.Vector2() },
				u_color: { value: new THREE.Color("#151c68").convertLinearToSRGB() },
			},
			vertexShader,
			fragmentShader,
		};
		return new ShaderPass(shader);
	}

	update() {
		this.pass.uniforms.u_screenAspect.value = gl.size.aspect;

		this.mouseTarget.set(mouse2d.position[0], mouse2d.position[1]);
		this.pass.uniforms.u_mouse.value.lerp(this.mouseTarget, 0.1);
	}
}

export const mouseInvert = new MouseInvert();
