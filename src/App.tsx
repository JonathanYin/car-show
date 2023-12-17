import "./App.css";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

function CarShow() {
	return null;
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
