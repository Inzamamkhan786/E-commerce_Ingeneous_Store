import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { Suspense } from "react";
import Globe from "./Globe";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Hero3D() {
    return (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Suspense fallback={null}>

                {/* Lights */}
                <ambientLight intensity={0.4} />
                <pointLight position={[3, 3, 3]} intensity={2} color="#00ffff" />
                <pointLight position={[-3, -2, -3]} intensity={1.5} color="#7c3aed" />

                {/* 3D Model */}
                <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
                    <Globe />
                </Float>

                {/* Controls */}
                <OrbitControls enableZoom={false} enablePan={false} />

                {/* Environment */}
                <Environment preset="city" />

                {/* 🔥 POST PROCESSING — PUT IT HERE */}
                <EffectComposer>
                    <Bloom intensity={0.6}
                        luminanceThreshold={0.25}
                        luminanceSmoothing={0.9} />
                </EffectComposer>

            </Suspense>
        </Canvas>
    );
}
