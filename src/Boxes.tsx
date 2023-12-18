import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

interface BoxProps {
	color: [number, number, number];
}

function Box({ color }: BoxProps) {
	const box = useRef<Mesh>();
	const [xRotSpeed] = useState(() => Math.random());
	const [yRotSpeed] = useState(() => Math.random());
	const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
	const [position] = useState(resetPosition());

	function resetPosition() {
		const v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
		if (v.x < 0) {
			v.x -= 1.75;
		}
		if (v.x > 0) {
			v.x += 1.75;
		}

		return v;
	}

	useFrame((state, delta) => {
		if (box.current) {
			box.current.position.set(position.x, position.y, position.z);
			box.current.rotation.x += delta * xRotSpeed;
			box.current.rotation.y += delta * yRotSpeed;
		}
	});

	return (
		<mesh ref={box} scale={scale} castShadow>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={color} envMapIntensity={0.15} />
		</mesh>
	);
}

export function Boxes() {
	const [arr] = useState(() => {
		return new Array(100).fill(0);
	});

	return (
		<>
			{arr.map((e, i) => (
				<Box key={i} color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />
			))}
		</>
	);
}
