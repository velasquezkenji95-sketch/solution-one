import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { useAnimationPlayback } from '../lib/useAnimationPlayback';

const positions: [number, number, number][] = [
  [-2, 0.9, -0.3], [2, 0.9, -0.3], [-1.85, -1.15, 0], [1.85, -1.15, 0], [0, 2, -0.55],
];

function Person({ position, scale = 1, accent }: { position: [number, number, number]; scale?: number; accent: string }) {
  return (
    <group position={position} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.14, 40]} />
        <meshStandardMaterial color="#9baac4" metalness={0.8} roughness={0.24} />
      </mesh>
      <mesh position={[0, -0.6, 0.09]}>
        <torusGeometry args={[0.58, 0.025, 8, 48]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      <RoundedBox args={[0.88, 0.7, 0.42]} radius={0.2} smoothness={3} position={[0, -0.06, 0.24]}>
        <meshStandardMaterial color={accent} metalness={0.35} roughness={0.23} />
      </RoundedBox>
      <mesh position={[0, 0.6, 0.24]}>
        <sphereGeometry args={[0.29, 28, 20]} />
        <meshStandardMaterial color="#e1edff" metalness={0.55} roughness={0.19} />
      </mesh>
    </group>
  );
}

function Team({ playing }: { playing: boolean }) {
  const group = useRef<THREE.Group>(null);
  const time = useRef(0);
  const { size } = useThree();
  useFrame((state, delta) => {
    if (!group.current || !playing) return;
    time.current += Math.min(delta, 0.04);
    group.current.rotation.y = Math.sin(time.current * 0.32) * 0.17 + state.pointer.x * 0.08;
    group.current.rotation.x = -0.12 + Math.sin(time.current * 0.4) * 0.05;
    group.current.position.y = Math.sin(time.current * 0.7) * 0.1;
  });
  return (
    <group ref={group} scale={size.width < 600 ? 0.64 : 1} rotation={[-0.12, 0, -0.08]}>
      <Person position={[0, -0.2, 0.65]} scale={1.3} accent="#3484ff" />
      {positions.map((position, i) => (
        <group key={i}>
          <Person position={position} scale={0.7} accent={i % 2 ? '#7b69eb' : '#32c9c6'} />
          <mesh position={[position[0] / 2, position[1] / 2 - 0.2, -0.28]} rotation={[0, 0, Math.atan2(position[1], position[0]) - Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, Math.hypot(position[0], position[1]) - 0.45, 8]} />
            <meshBasicMaterial color="#73b9ff" />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.2, -0.65]}>
        <torusGeometry args={[2.15, 0.035, 8, 80]} />
        <meshStandardMaterial color="#5f8fdc" metalness={0.65} roughness={0.28} />
      </mesh>
    </group>
  );
}

export function OperationsHero3D() {
  const host = useRef<HTMLDivElement>(null);
  const visible = useAnimationPlayback(host);
  const reduced = useReducedMotion();
  const playing = visible && !reduced;
  return (
    <div ref={host} className="operations-scene" role="img" aria-label="Animated three-dimensional team connected around a central operations specialist" data-playing={playing}>
      <Canvas camera={{ position: [0, 0, 9], fov: 38 }} dpr={[1, 1.5]} frameloop={playing ? 'always' : 'demand'} gl={{ alpha: true, antialias: true }}>
        <hemisphereLight args={['#d4edff', '#191039', 3]} />
        <directionalLight position={[-3, 4, 5]} intensity={4} />
        <directionalLight position={[4, -2, 3]} color="#a192ff" intensity={3} />
        <Team playing={playing} />
      </Canvas>
    </div>
  );
}
