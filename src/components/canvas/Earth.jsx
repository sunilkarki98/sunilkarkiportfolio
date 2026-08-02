"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

// Generate points on a sphere using fibonacci distribution
function fibonacciSphere(numPoints, radius) {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < numPoints; i++) {
    const y = 1 - (i / (numPoints - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    points.push(
      new THREE.Vector3(
        Math.cos(theta) * radiusAtY * radius,
        y * radius,
        Math.sin(theta) * radiusAtY * radius
      )
    );
  }
  return points;
}

// The wireframe globe with network nodes and connections
const CyberGlobe = () => {
  const earthRef = useRef();
  const nodesRef = useRef();
  const connectionsRef = useRef();
  const pulseRef = useRef(0);

  const radius = 2.2;
  const nodeCount = 120;
  const connectionDistance = 1.4;

  // Generate node positions
  const nodes = useMemo(() => fibonacciSphere(nodeCount, radius), []);

  // Generate connections between nearby nodes
  const { linePositions, lineCount } = useMemo(() => {
    const positions = [];
    let count = 0;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < connectionDistance) {
          positions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
          count++;
        }
      }
    }

    return {
      linePositions: new Float32Array(positions),
      lineCount: count,
    };
  }, [nodes]);

  // Generate node positions as flat array
  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      arr[i * 3] = n.x;
      arr[i * 3 + 1] = n.y;
      arr[i * 3 + 2] = n.z;
    });
    return arr;
  }, [nodes]);

  // Animate rotation and pulse
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.15;
      earthRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    pulseRef.current = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
  });

  return (
    <group scale={[0.85, 0.85, 0.85]}>
      {/* The rotating Earth */}
      <group ref={earthRef}>
      <mesh>
        <icosahedronGeometry args={[radius * 0.98, 2]} />
        <meshBasicMaterial
          color="#1a0a3e"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[radius * 1.05, 32, 32]} />
        <meshBasicMaterial
          color="#6b21a8"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Network connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineCount * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.25}
          linewidth={1}
        />
      </lineSegments>

      {/* Network nodes (dots) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodes.length}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ffcc"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={1}
        />
      </points>

      {/* Larger accent nodes at key positions */}
      {nodes.filter((_, i) => i % 8 === 0).map((node, idx) => (
        <mesh key={idx} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial 
            color="#00ffcc" 
            emissive="#00ffcc"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={1}
          />
        </mesh>
      ))}
      </group>

      {/* Ambient light for subtle illumination */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#6366f1" />
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <React.Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        <CyberGlobe />
        <Preload all />
      </React.Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
