import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FallingChocolate = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const chocolateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#3d1c02',
      roughness: 0.2,
      metalness: 0.1,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
      // Primitive "melting" effect through scaling
      meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2, 3, 0.5]} />
      <primitive object={chocolateMaterial} attach="material" />
    </mesh>
  );
};

export default FallingChocolate;
