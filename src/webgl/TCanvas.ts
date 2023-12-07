import * as THREE from "three";
import { gl } from "./core/WebGL";
import { effects } from "./effects/Effects";
import { controls } from "./utils/OrbitControls";
import { Assets, loadAssets } from "./utils/assetLoader";
import { NoiseGradationPlane } from "./objects/NoiseGradationPlane";

export class TCanvas {
	private assets: Assets = {
		image: { path: "resources/unsplash.jpg" },
	};

	constructor(private parentNode: ParentNode) {
		loadAssets(this.assets).then(() => {
			this.init();
			this.createObjects();
			gl.requestAnimationFrame(this.anime);
		});
	}

	private init() {
		gl.setup(this.parentNode.querySelector(".three-container")!);
		gl.scene.background = new THREE.Color("#f0eaee");
		gl.camera.position.z = 1.5;

		gl.setResizeCallback(() => effects.resize());
	}

	private createObjects() {
		const mesh1 = NoiseGradationPlane({ width: 1, height: 0.5, color: "#151c68", name: "plane1" });
		const mesh2 = NoiseGradationPlane({ width: 1, height: 0.5, color: "#ea1973", name: "plane2" });
		mesh2.position.x = 0.2;
		mesh2.position.y = -0.2;
		mesh2.position.z = 0.01;

		gl.scene.add(mesh1);
		gl.scene.add(mesh2);
	}

	// ----------------------------------
	// animation
	private anime = () => {
		// const plane = gl.getMesh<THREE.ShaderMaterial>("plane");
		// plane.material.uniforms.u_time.value += gl.time.delta;

		controls.update();
		// gl.render()
		effects.render();
	};

	// ----------------------------------
	// dispose
	dispose() {
		gl.dispose();
	}
}
