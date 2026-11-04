import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { ThreeCanvasWrapper } from '../components/ThreeCanvasWrapper';
import { HexagonalCarousel3D, FloatingParticles3D } from '../components/ThreeComponents';

export const Scene2Services: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 600
  const { fps } = useVideoConfig();

  // Switch between Services Showcase (0 - 300) and Milestone Counters (300 - 600)
  const isServicesPhase = frame < 300;

  // Header spring
  const headerSpring = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });

  // 6 Services
  const services = [
    { title: 'Consultancy & Advisory', desc: 'Project consultancy, institutional & ops support', color: '#00e5ff', tag: '01' },
    { title: 'Outsourcing & Manpower', desc: 'Pre-vetted skilled & semi-skilled staff', color: '#00ff88', tag: '02' },
    { title: 'Digital & IT Solutions', desc: 'Web development, IT infrastructure & support', color: '#3d8bff', tag: '03' },
    { title: 'Research & Survey', desc: 'Baseline surveys, data collection, M&E & analysis', color: '#ffd700', tag: '04' },
    { title: 'Event Management', desc: 'End-to-end planning, logistics & execution', color: '#ff7700', tag: '05' },
    { title: 'Procurement & Supply', desc: 'Supply chain management & trading', color: '#e040fb', tag: '06' },
  ];

  // Milestone Counters (active frame 300 - 600)
  const counterProgress = interpolate(frame, [310, 480], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const yearsCount = Math.floor(counterProgress * 10);
  const projectsCount = Math.floor(counterProgress * 100);
  const manpowerCount = Math.floor(counterProgress * 1500);
  const districtsCount = Math.floor(counterProgress * 64);

  const exitOpacity = interpolate(frame, [570, 600], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#050c18',
        backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(0, 255, 136, 0.08) 0%, rgba(5, 12, 24, 0.98) 75%)',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        opacity: exitOpacity,
      }}
    >
      {/* 3D Scene */}
      <ThreeCanvasWrapper cameraPosition={[0, 0, 7.5]}>
        <FloatingParticles3D count={70} />
        <HexagonalCarousel3D />
      </ThreeCanvasWrapper>

      {/* 2D Glassmorphic Overlay Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '60px 100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            transform: `translateY(${(1 - headerSpring) * -20}px)`,
            opacity: headerSpring,
          }}
        >
          <div
            style={{
              color: '#00e5ff',
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Integrated Capabilities
          </div>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: '#ffffff',
              margin: 0,
            }}
          >
            {isServicesPhase ? (
              <>
                6 Core Disciplines for <span style={{ color: '#00ff88' }}>End-to-End Success</span>
              </>
            ) : (
              <>
                Proven Track Record of <span style={{ color: '#ffd700' }}>Impact & Scale</span>
              </>
            )}
          </h2>
        </div>

        {/* Center Content Section */}
        {isServicesPhase ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginTop: 40,
              maxWidth: 1200,
            }}
          >
            {services.map((s, idx) => {
              const cardSpring = spring({
                frame: Math.max(0, frame - 30 - idx * 25),
                fps,
                config: { damping: 12, stiffness: 85 },
              });

              return (
                <div
                  key={s.title}
                  style={{
                    background: 'rgba(10, 24, 40, 0.72)',
                    border: `1px solid ${s.color}44`,
                    borderRadius: 16,
                    padding: '24px 28px',
                    backdropFilter: 'blur(16px)',
                    boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
                    transform: `translateY(${(1 - cardSpring) * 30}px) scale(${cardSpring})`,
                    opacity: cardSpring,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 20,
                      fontSize: 14,
                      fontWeight: 800,
                      color: s.color,
                      opacity: 0.8,
                    }}
                  >
                    {s.tag}
                  </div>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      color: '#94a3b8',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          /* Phase 2: 4 Large 3D Glass Number Counters */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 30,
              marginTop: 100,
            }}
          >
            {[
              { num: `${yearsCount}+`, label: 'Years of Excellence', color: '#ffd700', sub: 'Established Track Record' },
              { num: `${projectsCount}+`, label: 'Projects Delivered', color: '#00e5ff', sub: 'High Impact Outcomes' },
              { num: `${manpowerCount}+`, label: 'Manpower Deployed', color: '#00ff88', sub: 'Vetted Across 8 Sectors' },
              { num: `${districtsCount}`, label: 'Districts Nationwide', color: '#3d8bff', sub: '100% Geographic Reach' },
            ].map((stat, i) => {
              const statSpring = spring({
                frame: Math.max(0, frame - 300 - i * 35),
                fps,
                config: { damping: 14, stiffness: 85 },
              });

              return (
                <div
                  key={stat.label}
                  style={{
                    background: 'rgba(10, 25, 45, 0.75)',
                    border: `1px solid ${stat.color}55`,
                    borderRadius: 20,
                    padding: '36px 28px',
                    textAlign: 'center',
                    backdropFilter: 'blur(20px)',
                    boxShadow: `0 15px 40px rgba(0,0,0,0.6), inset 0 0 20px ${stat.color}15`,
                    transform: `scale(${statSpring})`,
                    opacity: statSpring,
                  }}
                >
                  <div
                    style={{
                      fontSize: 68,
                      fontWeight: 900,
                      color: stat.color,
                      letterSpacing: -1,
                      textShadow: `0 0 25px ${stat.color}66`,
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: '#ffffff',
                      marginTop: 8,
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      color: '#94a3b8',
                      marginTop: 6,
                    }}
                  >
                    {stat.sub}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Tagline Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 20,
          }}
        >
          <span style={{ color: '#64748b', fontSize: 16, fontWeight: 600 }}>
            Bioscope Limited • Capability & Milestones
          </span>
          <span style={{ color: '#00e5ff', fontSize: 16, fontWeight: 700 }}>
            Result-Oriented Solutions Across Bangladesh
          </span>
        </div>
      </div>
    </div>
  );
};
