import { Canvas } from '@react-three/fiber';
import { RoundedBox, PerspectiveCamera, OrbitControls, Environment, Float, MeshWobbleMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

export default function ThreeProductViewer() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        
        <Environment preset="studio" />

        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <RoundedBox
            args={[3.5, 5.5, 0.4]} // Standard Bar proportions
            radius={0.15}
            smoothness={8}
            ref={meshRef}
          >
            <meshStandardMaterial 
               color="#1A0F0B" // Deep Cocoa
               roughness={0.2} 
               metalness={0.1}
               flatShading={false}
            />
            {/* Texture Mock - Grid of squares for chocolate bar segments */}
            <meshStandardMaterial 
              attach="material" 
              color="#1A0F0B"
              roughness={0.4}
              bumpScale={0.05}
            />
          </RoundedBox>
          
          {/* Subtle Glint Surface overlay */}
          <RoundedBox args={[3.52, 5.52, 0.42]} radius={0.16} opacity={0.1} transparent>
             <MeshWobbleMaterial factor={0.05} speed={1} color="#B3530F" />
          </RoundedBox>
        </Float>
      </Canvas>
    </div>
  );
}
