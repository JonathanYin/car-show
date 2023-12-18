import "./App.css";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./Rings";

function CarShow() {
	return (
		<>
			<OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

			<PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

			<color args={[0, 0, 0]} attach="background" />

			<CubeCamera resolution={256} frames={Infinity}>
				{(texture) => (
					<>
						<Environment map={texture} />
						<Car />
					</>
				)}
			</CubeCamera>

			<Rings />

			<spotLight color={[1, 0.25, 0.7]} intensity={800} angle={0.6} penumbra={0.5} position={[5, 5, 0]} castShadow shadow-bias={-0.0001} />

			<spotLight color={[0.14, 0.5, 1]} intensity={600} angle={0.6} penumbra={0.5} position={[-5, 5, 0]} castShadow shadow-bias={-0.0001} />

			<ambientLight intensity={0.3} />

			{/* <pointLight color={[0.8, 0.7, 0.6]} position={[2, 2, 2]} intensity={100} castShadow /> */}

			<Ground />
		</>
	);
}

function App() {
	return (
		<Suspense fallback={null}>
			<Canvas shadows>
				<CarShow />
			</Canvas>
		</Suspense>
	);
}

export default App;
