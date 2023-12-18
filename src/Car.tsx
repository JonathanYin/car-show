import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
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

	return <primitive object={gltf.scene} />;
}
