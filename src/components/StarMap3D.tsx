
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import * as THREE from 'three';

interface StarMap3DProps {
  onBack: () => void;
}

const StarField = () => {
  const starsRef = useRef<THREE.Group>(null);
  
  const starPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 5000; i++) {
      positions.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <group ref={starsRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={2} color="#ffffff" />
      </points>
    </group>
  );
};

const PlanetSphere = ({ position, color, size, name }: { position: [number, number, number], color: string, size: number, name: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const StarMap3D: React.FC<StarMap3DProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="absolute top-6 left-6 z-10">
        <Button 
          onClick={onBack}
          variant="outline" 
          className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Interactive Star Map</CardTitle>
            <CardDescription className="text-xs">
              Click and drag to explore • Scroll to zoom
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-gray-300">
            <p>• Red: Mars</p>
            <p>• Blue: Earth</p>
            <p>• Yellow: Sun</p>
            <p>• Orange: Jupiter</p>
          </CardContent>
        </Card>
      </div>

      <Canvas camera={{ position: [0, 0, 100], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <StarField />
        
        <PlanetSphere position={[0, 0, 0]} color="#ffff00" size={5} name="Sun" />
        <PlanetSphere position={[30, 0, 0]} color="#6b93d6" size={2} name="Earth" />
        <PlanetSphere position={[50, 0, 0]} color="#cd5c5c" size={1.5} name="Mars" />
        <PlanetSphere position={[80, 0, 0]} color="#ffa500" size={4} name="Jupiter" />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.8}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
};

export default StarMap3D;
