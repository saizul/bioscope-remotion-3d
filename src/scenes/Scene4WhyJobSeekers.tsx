import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { ThreeCanvasWrapper } from '../components/ThreeCanvasWrapper';
import { CareerPortal3D, FloatingParticles3D } from '../components/ThreeComponents';

export const Scene4WhyJobSeekers: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 900
  const { fps } = useVideoConfig();

  // Header Animation
  const headerSpring = spring({ frame, fps, config: { damping: 14, stiffness: 85 } });

  // 4 Core Benefits for Job Seekers
  const benefits = [
    {
      title: '63 Diverse Job Positions',
      desc: 'Roles in IT, engineering, administration, facilities, customer service, and driving.',
      badge: 'All Skill Levels',
      color: '#00e5ff',
    },
    {
      title: '100% Guaranteed Timely Pay',
      desc: 'Transparent payroll discipline with direct, punctual salary disbursement every month.',
      badge: 'Zero Delay',
      color: '#ffd700',
    },
    {
      title: 'Nationwide Placements',
      desc: 'Opportunities with prestigious companies, NGOs, and institutions across all 64 districts.',
      badge: '64 Districts',
      color: '#00ff88',
    },
    {
      title: 'Zero Hidden Hassle',
      desc: 'Transparent, ethical recruitment process with continuous training and skill development.',
      badge: '100% Ethical',
      color: '#3d8bff',
    },
  ];

  // Featured job roles tag list
  const featuredRoles = [
    'IT & Software Specialists',
    'Graduate Engineers',
    'Office Administrators',
    'Professional Drivers',
    'Security Officers',
    'Customer Care Executives',
  ];

  // 2-Minute Quick Registration UI Animation
  const formProgress = interpolate(frame, [120, 260], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitOpacity = interpolate(frame, [870, 900], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#050c1a',
        backgroundImage: 'radial-gradient(circle at 80% 40%, rgba(255, 215, 0, 0.08) 0%, rgba(5, 12, 26, 0.98) 75%)',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        opacity: exitOpacity,
      }}
    >
      {/* 3D Scene Layer */}
      <ThreeCanvasWrapper cameraPosition={[0, 0, 7.5]}>
        <FloatingParticles3D count={75} />
        <CareerPortal3D enterFrame={0} />
      </ThreeCanvasWrapper>

      {/* 2D Overlay Content */}
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
              color: '#ffd700',
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            For Candidates & Job Seekers
          </div>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Why Job Seekers Trust <span style={{ color: '#00e5ff' }}>Bioscope Limited</span>
          </h2>
        </div>

        {/* Center Stage: Split between 3D Mobile Preview on left & Cards on right */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <div
            style={{
              width: 820,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {/* Quick 2-Minute Banner */}
            <div
              style={{
                background: 'rgba(15, 30, 55, 0.85)',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                borderRadius: 16,
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              }}
            >
              <div>
                <span
                  style={{
                    background: '#00ff88',
                    color: '#050b14',
                    fontSize: 13,
                    fontWeight: 900,
                    padding: '4px 10px',
                    borderRadius: 6,
                    letterSpacing: 1,
                  }}
                >
                  ONLINE PORTAL
                </span>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#ffffff', marginTop: 8 }}>
                  Fast 2-Minute Online Registration
                </div>
                <div style={{ fontSize: 15, color: '#94a3b8', marginTop: 2 }}>
                  Register online via bioscopeltd.net & get matched with top employers
                </div>
              </div>

              {/* Animated Progress Meter */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#00e5ff' }}>
                  {Math.round(formProgress)}%
                </div>
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Profile Ready</div>
              </div>
            </div>

            {/* 4 Value Pillars */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 18,
              }}
            >
              {benefits.map((b, idx) => {
                const bSpring = spring({
                  frame: Math.max(0, frame - 180 - idx * 45),
                  fps,
                  config: { damping: 13, stiffness: 85 },
                });

                return (
                  <div
                    key={b.title}
                    style={{
                      background: 'rgba(10, 24, 42, 0.78)',
                      border: `1px solid ${b.color}44`,
                      borderRadius: 16,
                      padding: '20px',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                      transform: `translateY(${(1 - bSpring) * 30}px) scale(${bSpring})`,
                      opacity: bSpring,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: b.color,
                          background: `${b.color}22`,
                          padding: '3px 8px',
                          borderRadius: 6,
                        }}
                      >
                        {b.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: 19, fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
                      {b.title}
                    </div>
                    <div style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.4 }}>
                      {b.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Featured Talent Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 18,
          }}
        >
          <span style={{ color: '#ffd700', fontSize: 15, fontWeight: 700 }}>
            In Demand Roles:
          </span>
          {featuredRoles.map((role) => (
            <span
              key={role}
              style={{
                color: '#e2e8f0',
                fontSize: 14,
                fontWeight: 600,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '5px 14px',
                borderRadius: 20,
              }}
            >
              ✓ {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
