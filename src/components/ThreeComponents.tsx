import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import * as THREE from 'three';

// --- Particle Background ---
export const FloatingParticles3D: React.FC<{ count?: number }> = ({ count = 120 }) => {
  const frame = useCurrentFrame();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 24,
        y: (Math.random() - 0.5) * 16,
        z: (Math.random() - 0.5) * 15 - 2,
        size: Math.random() * 0.05 + 0.02,
        speed: Math.random() * 0.015 + 0.005,
        color: i % 3 === 0 ? '#00e5ff' : i % 3 === 1 ? '#FA6955' : '#00ff88',
      });
    }
    return temp;
  }, [count]);

  return (
    <group>
      {particles.map((p, idx) => {
        const yPos = ((p.y + frame * p.speed + 8) % 16) - 8;
        return (
          <mesh key={idx} position={[p.x, yPos, p.z]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial color={p.color} transparent opacity={0.65} />
          </mesh>
        );
      })}
    </group>
  );
};

// --- Scene 1 & Outro: Official Bioscope 3D Aperture Logomark ---
// Accurate replica of the official Bioscope logo:
// 1. Outermost Deep Navy Blue Ring (#002060 / #0b2545)
// 2. Coral / Salmon Accent Ring (#FA6955)
// 3. 32 Curved Turbine / Aperture Shutter Blades
// 4. Inner Emerald Green Ring (#00A86B)
export const Logo3D: React.FC<{ enterFrame?: number }> = ({ enterFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - enterFrame);
  const scale = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const rotY = interpolate(relFrame, [0, 60], [-Math.PI, 0], {
    extrapolateRight: 'clamp',
  }) + Math.sin(frame * 0.015) * 0.15;
  const rotX = Math.sin(frame * 0.02) * 0.12;

  // 32 Curved Shutter Blades matching the official emblem
  const blades = useMemo(() => {
    const list = [];
    const count = 32;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      list.push({ angle });
    }
    return list;
  }, []);

  return (
    <group position={[0, 0.4, 0]} scale={[scale, scale, scale]} rotation={[rotX, rotY, 0]}>
      {/* 1. Outermost Deep Blue Torus Ring */}
      <mesh>
        <torusGeometry args={[1.75, 0.065, 16, 64]} />
        <meshStandardMaterial
          color="#002060"
          metalness={0.9}
          roughness={0.15}
          emissive="#001030"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 2. Coral / Salmon Ring (#FA6955) */}
      <mesh position={[0, 0, 0.02]}>
        <torusGeometry args={[1.56, 0.09, 16, 64]} />
        <meshStandardMaterial
          color="#FA6955"
          metalness={0.8}
          roughness={0.2}
          emissive="#7A291E"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* 3. 32 Rotating Turbine Blades Array (Silver / Graphite) */}
      <group rotation={[0, 0, frame * 0.015]}>
        {blades.map((b, idx) => {
          const rMid = 1.25;
          const x = Math.cos(b.angle) * rMid;
          const y = Math.sin(b.angle) * rMid;
          return (
            <mesh
              key={idx}
              position={[x, y, 0.01]}
              rotation={[0, 0, b.angle + 0.55]}
            >
              <boxGeometry args={[0.35, 0.03, 0.03]} />
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={0.95}
                roughness={0.1}
                emissive="#334155"
                emissiveIntensity={0.4}
              />
            </mesh>
          );
        })}
      </group>

      {/* 4. Inner Emerald Green Ring (#00A86B) */}
      <mesh position={[0, 0, 0.02]}>
        <torusGeometry args={[0.96, 0.07, 16, 64]} />
        <meshStandardMaterial
          color="#00A86B"
          metalness={0.85}
          roughness={0.15}
          emissive="#004D30"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Glowing Inner Center Core */}
      <mesh position={[0, 0, -0.05]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
      </mesh>
    </group>
  );
};

// --- Scene 1: 3D Bangladesh Map & 64 District Beacons ---
export const BangladeshMap3D: React.FC<{ enterFrame?: number }> = ({ enterFrame = 120 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - enterFrame);
  const introSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 12, stiffness: 70 },
  });

  const districts = useMemo(() => {
    const list = [];
    const baseLocations = [
      { name: 'Dhaka', x: 0.1, y: 0.0 },
      { name: 'Chattogram', x: 1.4, y: -0.9 },
      { name: 'Sylhet', x: 1.5, y: 1.2 },
      { name: 'Rajshahi', x: -1.4, y: 0.8 },
      { name: 'Khulna', x: -0.8, y: -1.1 },
      { name: 'Barishal', x: 0.2, y: -1.3 },
      { name: 'Rangpur', x: -1.1, y: 1.9 },
      { name: 'Mymensingh', x: 0.3, y: 1.0 },
      { name: 'CoxsBazar', x: 1.8, y: -1.8 },
      { name: 'Cumilla', x: 0.8, y: -0.3 },
      { name: 'Bogura', x: -0.7, y: 1.1 },
      { name: 'Gazipur', x: 0.15, y: 0.3 },
    ];
    for (let i = 0; i < 64; i++) {
      if (i < baseLocations.length) {
        list.push(baseLocations[i]);
      } else {
        const angle = (i / 64) * Math.PI * 2;
        const radiusX = 1.6 * (0.4 + 0.6 * Math.sin(angle * 2 + 1));
        const radiusY = 1.9 * (0.4 + 0.6 * Math.cos(angle * 3));
        list.push({
          name: `District_${i + 1}`,
          x: Math.sin(angle) * radiusX + (Math.random() - 0.5) * 0.4,
          y: Math.cos(angle) * radiusY + (Math.random() - 0.5) * 0.4,
        });
      }
    }
    return list;
  }, []);

  return (
    <group
      position={[0, -0.2, 0]}
      scale={[introSpring, introSpring, introSpring]}
      rotation={[-0.3, 0.1 + Math.sin(frame * 0.01) * 0.1, 0]}
    >
      <gridHelper args={[8, 16, '#00e5ff', '#092535']} position={[0, -1.8, 0]} />

      {districts.map((d, idx) => {
        const beaconDelay = enterFrame + (idx * 3);
        const beaconRel = Math.max(0, frame - beaconDelay);
        const beaconHeight = spring({
          frame: beaconRel,
          fps,
          config: { damping: 10, stiffness: 90 },
        });

        const isHub = idx < 8;

        return (
          <group key={idx} position={[d.x, -1.8 + d.y * 0.6, (d.y * 0.4)]}>
            <mesh>
              <sphereGeometry args={[isHub ? 0.09 : 0.05, 12, 12]} />
              <meshBasicMaterial color={isHub ? '#ffd700' : '#00e5ff'} />
            </mesh>

            {beaconHeight > 0.05 && (
              <mesh position={[0, (beaconHeight * 1.2) / 2, 0]}>
                <cylinderGeometry args={[0.015, 0.02, beaconHeight * 1.2, 8]} />
                <meshBasicMaterial
                  color={isHub ? '#ffeb3b' : '#00ff88'}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
};

// --- Scene 2: 3D Hexagonal Carousel for 6 Core Services ---
export const HexagonalCarousel3D: React.FC<{ activeIndex?: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const services = [
    { name: 'Consultancy', color: '#00e5ff' },
    { name: 'Outsourcing', color: '#00A86B' },
    { name: 'Digital & IT', color: '#3d8bff' },
    { name: 'Research & Survey', color: '#ffd700' },
    { name: 'Event Mgmt', color: '#FA6955' },
    { name: 'Procurement', color: '#e040fb' },
  ];

  const rotationY = frame * 0.012;

  return (
    <group position={[0, 0, 0]} rotation={[0.2, rotationY, 0]}>
      {services.map((item, idx) => {
        const angle = (idx / 6) * Math.PI * 2;
        const radius = 3.2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        const pop = spring({
          frame: Math.max(0, frame - 480 - idx * 30),
          fps,
          config: { damping: 12, stiffness: 80 },
        });

        return (
          <group key={idx} position={[x, Math.sin(frame * 0.03 + idx) * 0.2, z]} scale={[pop, pop, pop]}>
            <mesh rotation={[0, -angle, 0]}>
              <cylinderGeometry args={[0.7, 0.7, 0.25, 6]} />
              <meshStandardMaterial
                color={item.color}
                metalness={0.7}
                roughness={0.2}
                emissive={item.color}
                emissiveIntensity={0.25}
              />
            </mesh>
            <mesh rotation={[0, -angle, 0]}>
              <torusGeometry args={[0.85, 0.03, 16, 6]} />
              <meshBasicMaterial color={item.color} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// --- Scene 3: 3D Compliance Shield & 8 Category Pillars ---
export const ComplianceShield3D: React.FC<{ enterFrame?: number }> = ({ enterFrame = 1050 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = Math.max(0, frame - enterFrame);

  const shieldScale = spring({
    frame: rel,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const wobble = Math.sin(frame * 0.02) * 0.08;

  return (
    <group position={[-2.4, 0.2, 0]} scale={[shieldScale, shieldScale, shieldScale]} rotation={[0, 0.4 + wobble, 0]}>
      <mesh>
        <cylinderGeometry args={[1.2, 0.2, 2.2, 3]} />
        <meshStandardMaterial
          color="#002060"
          metalness={0.9}
          roughness={0.15}
          emissive="#001030"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[1.26, 0.24, 2.24, 3]} />
        <meshStandardMaterial
          color="#FA6955"
          metalness={0.95}
          roughness={0.2}
          wireframe
        />
      </mesh>
      <mesh position={[0, 0, 0.25]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.5, 0.12, 0.12]} />
        <meshBasicMaterial color="#00A86B" />
      </mesh>
      <mesh position={[-0.2, -0.15, 0.25]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.3, 0.12, 0.12]} />
        <meshBasicMaterial color="#00A86B" />
      </mesh>
    </group>
  );
};

export const CategoryPillars3D: React.FC<{ enterFrame?: number }> = ({ enterFrame = 1200 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const categories = [
    { color: '#00e5ff' },
    { color: '#00A86B' },
    { color: '#ffd700' },
    { color: '#3d8bff' },
    { color: '#FA6955' },
    { color: '#e040fb' },
    { color: '#00b0ff' },
    { color: '#ff5252' },
  ];

  return (
    <group position={[1.4, -0.6, 0]} rotation={[0.35, -0.5, 0]}>
      {categories.map((c, idx) => {
        const row = Math.floor(idx / 4);
        const col = idx % 4;
        const x = (col - 1.5) * 0.9;
        const z = (row - 0.5) * 1.1;

        const rel = Math.max(0, frame - enterFrame - idx * 30);
        const height = spring({
          frame: rel,
          fps,
          config: { damping: 12, stiffness: 85 },
        });

        const actualH = 0.4 + height * 1.5;

        return (
          <group key={idx} position={[x, actualH / 2, z]}>
            <mesh>
              <boxGeometry args={[0.65, actualH, 0.65]} />
              <meshStandardMaterial
                color={c.color}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.88}
                emissive={c.color}
                emissiveIntensity={0.3}
              />
            </mesh>
            <mesh position={[0, actualH / 2 + 0.02, 0]}>
              <boxGeometry args={[0.66, 0.04, 0.66]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// --- Scene 4: 3D Career Portal & Device Mockup ---
export const CareerPortal3D: React.FC<{ enterFrame?: number }> = ({ enterFrame = 1950 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = Math.max(0, frame - enterFrame);

  const phoneScale = spring({
    frame: rel,
    fps,
    config: { damping: 13, stiffness: 75 },
  });

  const rotY = -0.3 + Math.sin(frame * 0.02) * 0.12;

  return (
    <group position={[-1.8, 0, 0]} scale={[phoneScale, phoneScale, phoneScale]} rotation={[0.1, rotY, 0]}>
      <mesh>
        <boxGeometry args={[2.0, 3.8, 0.18]} />
        <meshStandardMaterial color="#0c1825" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[1.85, 3.6]} />
        <meshBasicMaterial color="#06121e" />
      </mesh>
      <mesh position={[0, 1.1, 0.11]}>
        <planeGeometry args={[1.6, 0.5]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.4, 0.11]}>
        <planeGeometry args={[1.6, 0.45]} />
        <meshBasicMaterial color="#00A86B" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -0.3, 0.11]}>
        <planeGeometry args={[1.6, 0.45]} />
        <meshBasicMaterial color="#FA6955" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -1.1, 0.11]}>
        <planeGeometry args={[1.4, 0.45]} />
        <meshBasicMaterial color="#3d8bff" />
      </mesh>
    </group>
  );
};

// --- Scene 5: 3D Golden Compliance Seals ---
export const GoldenSeals3D: React.FC<{ enterFrame?: number }> = ({ enterFrame = 2850 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const seals = [
    { label: 'Govt Approved', pos: [-3.3, 0.2, 0] },
    { label: 'RJSC C-123913', pos: [-1.1, 0.2, 0] },
    { label: 'DIFE Licensed', pos: [1.1, 0.2, 0] },
    { label: 'PPR & CPTU', pos: [3.3, 0.2, 0] },
  ];

  return (
    <group position={[0, 0, 0]}>
      {seals.map((s, idx) => {
        const rel = Math.max(0, frame - enterFrame - idx * 45);
        const sealSpring = spring({
          frame: rel,
          fps,
          config: { damping: 14, stiffness: 85 },
        });

        const rotY = (frame * 0.02) + idx * 0.8;

        return (
          <group
            key={idx}
            position={[s.pos[0] as number, s.pos[1] as number, s.pos[2] as number]}
            scale={[sealSpring, sealSpring, sealSpring]}
            rotation={[0.1, rotY, 0]}
          >
            <mesh>
              <cylinderGeometry args={[0.9, 0.9, 0.12, 32]} />
              <meshStandardMaterial
                color="#ffd700"
                metalness={0.95}
                roughness={0.15}
                emissive="#665200"
                emissiveIntensity={0.3}
              />
            </mesh>
            <mesh position={[0, 0, 0.07]}>
              <cylinderGeometry args={[0.75, 0.75, 0.05, 32]} />
              <meshStandardMaterial
                color="#e5b800"
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>
            <mesh>
              <torusGeometry args={[0.96, 0.04, 16, 32]} />
              <meshBasicMaterial color="#fff4b8" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// --- Scene 6: 3D Outro Logo ---
export const Outro3D: React.FC<{ enterFrame?: number }> = ({ enterFrame = 3240 }) => {
  return <Logo3D enterFrame={enterFrame} />;
};
