import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  MeshDistortMaterial, 
  useGLTF, 
  ContactShadows,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';

const ExternalModel = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={2} />;
};

const ChocolateBarModel = ({ color = "#3d1c10", modelUrl }: { color?: string; modelUrl?: string }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.02 : 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {modelUrl ? (
        <Suspense fallback={null}>
          <ExternalModel url={modelUrl} />
        </Suspense>
      ) : (
        <>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.5, 4, 0.4]} />
            <MeshDistortMaterial
              color={color}
              speed={hovered ? 3 : 1}
              distort={hovered ? 0.1 : 0}
              roughness={0.1}
              metalness={0.05}
              emissive={color}
              emissiveIntensity={0.1}
            />
          </mesh>
          {/* Visual segments */}
          {[-0.8, 0, 0.8].map((x) => 
            [-1.2, 0, 1.2].map((y) => (
              <mesh key={`${x}-${y}`} position={[x, y, 0.21]} castShadow>
                <boxGeometry args={[0.5, 0.8, 0.1]} />
                <meshStandardMaterial color={color} roughness={0.3} />
              </mesh>
            ))
          )}
        </>
      )}
    </group>
  );
};

const ProductViewer3D = ({ color, modelUrl }: { color?: string; modelUrl?: string }) => {
  return (
    <div className="h-full w-full relative group">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -5, -10]} intensity={1} color={color || "#8FA93E"} />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <ChocolateBarModel color={color} modelUrl={modelUrl} />
          </Float>
          <ContactShadows 
            position={[0, -3, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-taupe-muted uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
        Interact to Explore
      </div>
    </div>
  );
};

export default ProductViewer3D;
