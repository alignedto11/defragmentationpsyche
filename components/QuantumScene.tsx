
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// FIX: Import the types file to augment JSX.IntrinsicElements for react-three-fiber components.
import '../types';
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Dodecahedron, Torus, Octahedron, Stars, Cloud, MeshDistortMaterial, Instances, Instance, Icosahedron, MeshTransmissionMaterial, Float, Sparkles, GradientTexture, Tetrahedron } from '@react-three/drei';
import * as THREE from 'three';

// --- HERO SCENE REFINED ---

const HeroCrystal = () => {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Extremely slow, meditative rotation for "Stillness"
            groupRef.current.rotation.y = t * 0.05; 
            groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.02;
        }
    });

    const materialProps = {
        backside: true,
        samples: 6, 
        resolution: 512,
        thickness: 4.5,
        roughness: 0,
        anisotropy: 1.0, // Internal lattice simulation
        chromaticAberration: 15.0, // Extreme dispersion for rainbow edges (Sunlight effect)
        iridescence: 1.0,
        iridescenceIOR: 1.6,
        iridescenceThicknessRange: [100, 4000], // Wide range for rich oil-slick colors
        color: "#ffffff",
        bg: "#000000",
    };

    return (
        <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            <group ref={groupRef}>
                {/* Icosahedron: A 20-sided Platonic solid. Looks like a perfectly cut jewel/crystal. 
                    Replaces sharp triangles/Merkaba for a more stable, awe-inspiring shape. */}
                <Icosahedron args={[2.4, 0]}>
                    <MeshTransmissionMaterial {...materialProps} />
                </Icosahedron>
            </group>
        </Float>
    )
}

const EtherealOrbs = () => {
    const ref = useRef<THREE.Group>(null);
    
    useFrame(() => {
        const scrollY = window.scrollY;
        if (ref.current) {
             // Mid-field parallax: Moves noticeably against scroll
             ref.current.position.y = scrollY * -0.005;
        }
    });

    return (
        <group ref={ref}>
            {/* Soft, glowing orbs instead of sharp debris */}
            <Sparkles 
                count={120}
                scale={30}
                size={20}
                speed={0.4}
                opacity={0.6}
                color="#ffffff"
            />
        </group>
    )
}

const HeroParallaxContent = () => {
    const starsRef = useRef<THREE.Group>(null);
    
    useFrame(() => {
        const scrollY = window.scrollY;
        if (starsRef.current) {
            // Deep background parallax: Rotates the entire cosmos slowly
            starsRef.current.rotation.y = scrollY * 0.0005;
            starsRef.current.position.y = scrollY * 0.001;
        }
    });

    return (
        <group>
            <group ref={starsRef}>
                {/* Dense, deep starfield for awe */}
                <Stars radius={350} depth={100} count={7000} factor={6} saturation={0} fade speed={0.5} />
            </group>
            <EtherealOrbs />
        </group>
    );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        gl={{ antialias: true, alpha: true }} 
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Lighting tuned for "Sunlight through Natural Crystal" */}
        <ambientLight intensity={0.2} />
        {/* Main Sun: Warm, high intensity to force refraction */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={150} color="#fff0d6" castShadow />
        {/* Fill: Cool, low intensity for depth shadows */}
        <pointLight position={[-10, -10, -10]} intensity={5} color="#ccf5ff" />

        <HeroParallaxContent />
        <HeroCrystal />
        
        {/* Ground Caustics: Vibrant rainbow shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial transparent opacity={0.5}>
                <GradientTexture
                    stops={[0, 0.3, 0.8, 1]}
                    colors={['#000000', '#1a1a1a', '#050505', '#000000']} // Subtle grounding shadow
                    size={1024}
                />
            </meshBasicMaterial>
        </mesh>
      </Canvas>
    </div>
  );
};

// --- NAVIGATOR SCENE ---
const Astrolabe = () => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
     if (groupRef.current) {
         groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
         groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
     }
  });
  return (
    <group ref={groupRef}>
        <Torus args={[3, 0.005, 4, 8]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#E4E4E7" transparent opacity={0.4} roughness={0} metalness={1} />
        </Torus>
        <Torus args={[2.8, 0.002, 3, 6]} rotation={[0, Math.PI / 8, 0]}>
             <meshStandardMaterial color="#E4E4E7" transparent opacity={0.2} />
        </Torus>
        <Torus args={[3.2, 0.01, 4, 8]} rotation={[Math.PI/6, Math.PI / 6, 0]}>
             <meshStandardMaterial color="#E4E4E7" emissive="#E4E4E7" emissiveIntensity={0.1} transparent opacity={0.5} />
        </Torus>
    </group>
  )
}

export const NavigatorScene: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-100">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: false }} dpr={[1, 1.25]}>
                <fog attach="fog" args={['#000000', 5, 30]} />
                <ambientLight intensity={0.2} />
                <Stars radius={50} depth={50} count={30} factor={4} saturation={0} fade speed={0.5} />
                <Astrolabe />
            </Canvas>
        </div>
    )
}

// --- MEMORY SCENE ---
const Fragments = () => {
    const fragments = useMemo(() => [...Array(3)].map(() => ({
        pos: [
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 8
        ] as [number, number, number],
        scale: Math.random() * 0.4 + 0.1
    })), []);

    return (
        <group>
            {fragments.map((f, i) => (
                <Dodecahedron key={i} args={[f.scale, 0]} position={f.pos}>
                     <MeshDistortMaterial 
                        color="#E4E4E7"
                        roughness={0.2}
                        metalness={1}
                        distort={0.2} 
                        speed={1}
                        transparent
                        opacity={0.3}
                     />
                </Dodecahedron>
            ))}
            <Cloud opacity={0.05} speed={0.05} bounds={[10, 2, 5]} segments={1} color="#E4E4E7" position={[0, 0, -5]} />
        </group>
    )
}

export const MemoryScene: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true }} dpr={[1, 1.25]}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <Fragments />
            </Canvas>
        </div>
    )
}

// --- TRUST SCENE ---
const NetworkLattice = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if(ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
        }
    });

    const nodes = useMemo(() => [...Array(12)].map((_, i) => {
         const phi = Math.acos(-1 + (2 * i) / 12);
         const theta = Math.sqrt(12 * Math.PI) * phi;
         return [
             3.5 * Math.cos(theta) * Math.sin(phi),
             3.5 * Math.sin(theta) * Math.sin(phi),
             3.5 * Math.cos(phi)
         ] as [number, number, number];
    }), []);

    return (
        <group ref={ref}>
             <Icosahedron args={[4, 0]}>
                  <meshBasicMaterial color="#222" wireframe transparent opacity={0.08} />
             </Icosahedron>
             
             <Instances range={12}>
                <sphereGeometry args={[0.03, 4, 4]} />
                <meshBasicMaterial color="#E4E4E7" />
                {nodes.map((pos, i) => (
                    <Instance key={i} position={pos} />
                ))}
             </Instances>
        </group>
    )
}

export const TrustScene: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-100">
             <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: false }} dpr={[1, 1.25]}>
                <fog attach="fog" args={['#000000', 5, 20]} />
                <ambientLight intensity={0.1} />
                <spotLight position={[5, 5, 5]} angle={0.5} penumbra={1} intensity={2} color="#E4E4E7" />
                <NetworkLattice />
             </Canvas>
        </div>
    )
}

// --- OMNIPRESENCE SCENE (DASHBOARD BACKGROUND) ---
const OmnipresenceGeometry = () => {
    const ref = useRef<THREE.Group>(null);
    const innerRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) {
            ref.current.rotation.y = t * 0.02; // Slow rotation
            ref.current.rotation.z = Math.sin(t * 0.05) * 0.05;
        }
        if (innerRef.current) {
             const scale = 1 + Math.sin(t * 0.4) * 0.05;
             innerRef.current.scale.set(scale, scale, scale);
             innerRef.current.rotation.x = t * 0.1;
        }
    });

    return (
        <group ref={ref}>
            <mesh ref={innerRef}>
                <Icosahedron args={[3, 2]}>
                     <meshStandardMaterial 
                        color="#050505" 
                        wireframe 
                        emissive="#333"
                        emissiveIntensity={0.5}
                        transparent 
                        opacity={0.1} 
                     />
                </Icosahedron>
            </mesh>
            <pointLight position={[0,0,0]} intensity={2} distance={5} color="#E4E4E7" />
        </group>
    )
}

export const OmnipresenceScene: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-100">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true, antialias: false }} dpr={[1, 1.25]}>
                <ambientLight intensity={0.1} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} color="#ccf5ff" />
                <OmnipresenceGeometry />
                <Cloud opacity={0.08} speed={0.01} bounds={[10, 2, 2]} segments={4} color="#050505" />
            </Canvas>
        </div>
    )
}

export const ManifestoScene: React.FC = () => {
    return (
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true }} dpr={[1, 1.25]}>
           <ambientLight intensity={0.5} />
           <Stars radius={80} depth={20} count={40} factor={2} saturation={0} fade speed={0.1} />
        </Canvas>
      </div>
    );
  };
