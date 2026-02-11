import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Line, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function Globe() {
    const globeRef = useRef();
    const ringRef = useRef();
    const pointsRef = useRef();

    useFrame(({ clock, mouse }) => {
        const t = clock.getElapsedTime();

        globeRef.current.rotation.y += 0.002;
        globeRef.current.rotation.x = mouse.y * 0.3;

        ringRef.current.rotation.z += 0.004;

        pointsRef.current.rotation.y -= 0.0015;
        pointsRef.current.position.y = Math.sin(t) * 0.05;
    });

    // random data points
    const points = new Float32Array(
        Array.from({ length: 800 }, () => THREE.MathUtils.randFloatSpread(3))
    );

    return (
        <>
            {/* Main Tech Globe */}
            <Sphere args={[1.6, 64, 64]} ref={globeRef}>
                <meshStandardMaterial
                    wireframe
                    color="#6ee7ff"
                    emissive="#00ffff"
                    emissiveIntensity={0.6}
                />
            </Sphere>

            {/* Orbit Ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.1, 0.01, 16, 100]} />
                <meshStandardMaterial emissive="#7df9ff" emissiveIntensity={3} />
            </mesh>

            {/* Data Points */}
            <Points ref={pointsRef} positions={points} stride={3}>
                <PointMaterial
                    transparent
                    color="#8be9ff"
                    size={0.02}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </>
    );
}
