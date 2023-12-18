import { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Mesh } from "three";

export function Car() {
	const gltf = useLoader(GLTFLoader, "/models/car/scene.gltf");

	useEffect(() => {
		gltf.scene.scale.set(1, 1, 1);
		gltf.scene.position.set(0, 0.1, 0);
		gltf.scene.rotation.y = Math.PI / 2;
		gltf.scene.traverse((object) => {
			if (object instanceof Mesh) {
				object.castShadow = true;
				object.receiveShadow = true;
				object.material.envMapIntensity = 20;
			}
		});
	}, [gltf]);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		const sketchfabModel = gltf.scene.getObjectByName("Sketchfab_model");
		const colladaGroup = sketchfabModel?.getObjectByName("Collada_visual_scene_group");

		if (colladaGroup) {
			// Names of the wheel objects in your model
			const wheelNames = ["_3DWheel_front_R", "_3DWheel_front_L", "_3DWheel_back_R", "_3DWheel_back_L"];

			wheelNames.forEach((wheelName) => {
				const wheel = colladaGroup.getObjectByName(wheelName);
				if (wheel) {
					wheel.rotation.x = t * 0.2;
					wheel.rotation.y = t * 0.2;
					wheel.rotation.z = t * 0.2;
				} else {
					console.log(`Wheel not found: ${wheelName}`);
				}
			});
		} else {
			console.log("Collada visual scene group not found");
		}
	});

	return <primitive object={gltf.scene} />;
}
