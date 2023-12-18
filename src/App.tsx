import "./App.css";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./Rings";
import { Boxes } from "./Boxes";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Grid } from "./Grid";
import { Vector2 } from "three";

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

			<Box position={[0, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 3]} />

			<Boxes />

			<Grid />

			<spotLight color={[1, 0.25, 0.7]} intensity={800} angle={0.6} penumbra={0.5} position={[5, 5, 0]} castShadow shadow-bias={-0.0001} />

			<spotLight color={[0.14, 0.5, 1]} intensity={600} angle={0.6} penumbra={0.5} position={[-5, 5, 0]} castShadow shadow-bias={-0.0001} />

			<ambientLight intensity={0.3} />

			<Ground />

			<EffectComposer>
				<Bloom blendFunction={BlendFunction.ADD} intensity={1.3} width={300} height={300} kernelSize={5} luminanceThreshold={0.15} luminanceSmoothing={0.025} />

				<ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new Vector2(0.0005, 0.0012)} radialModulation={false} modulationOffset={0} />
			</EffectComposer>
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
