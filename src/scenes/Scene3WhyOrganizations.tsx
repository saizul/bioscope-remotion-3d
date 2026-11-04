import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { ThreeCanvasWrapper } from '../components/ThreeCanvasWrapper';
import { ComplianceShield3D, CategoryPillars3D, FloatingParticles3D } from '../components/ThreeComponents';

export const Scene3WhyOrganizations: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 900
  const { fps } = useVideoConfig();

  // Phase split:
  // Phase 1 (0 - 360): The Compliance Shield & Value Proposition
  // Phase 2 (360 - 900): 8 Manpower Categories & 63 Positions Grid
  const isPhase1 = frame < 360;

  // Header Animation
  const headerSpring = spring({ frame, fps, config: { damping: 14, stiffness: 85 } });

  // 8 Manpower Categories
  const categories = [
    { id: 1, title: 'Office & Admin', count: 15, color: '#00e5ff' },
    { id: 2, title: 'Cleaning & Housekeeping', count: 7, color: '#00ff88' },
    { id: 3, title: 'Security & Facility', count: 11, color: '#ffd700' },
    { id: 4, title: 'Driving & Delivery', count: 3, color: '#3d8bff' },
    { id: 5, title: 'IT, Software & Media', count: 6, color: '#ff9100' },
    { id: 6, title: 'Engineering & Construction', count: 6, color: '#e040fb' },
    { id: 7, title: 'Sales, Marketing & CS', count: 9, color: '#00b0ff' },
    { id: 8, title: 'Training & Skills Dev', count: 6, color: '#ff5252' },
  ];

  // Client Sectors
  const clientTypes = [
    'Corporate Offices',
    'Industrial Factories',
    'Hospitals & Healthcare',
    'Apartment & Commercial Complexes',
    'Development NGOs',
  ];

  const exitOpacity = interpolate(frame, [870, 900], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#050a16',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 229, 255, 0.09) 0%, rgba(5, 10, 22, 0.98) 80%)',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        opacity: exitOpacity,
      }}
    >
      {/* 3D Scene */}
      <ThreeCanvasWrapper cameraPosition={[0, 0, 7.5]}>
        <FloatingParticles3D count={80} />
        <ComplianceShield3D enterFrame={0} />
        {frame >= 330 && <CategoryPillars3D enterFrame={350} />}
      </ThreeCanvasWrapper>

      {/* 2D Glassmorphic Overlay */}
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
        {/* Header */}
        <div
          style={{
            transform: `translateY(${(1 - headerSpring) * -20}px)`,
            opacity: headerSpring,
          }}
        >
          <div
            style={{
              color: '#00ff88',
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            For Organizations & Employers
          </div>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Why Organizations Request Manpower from{' '}
            <span style={{ color: '#00e5ff' }}>Bioscope Limited</span>
          </h2>
        </div>

        {/* Dynamic Center Stage */}
        {isPhase1 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: 720,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {[
                { title: '100% Compliant & DIFE Licensed', desc: 'Zero regulatory risk with strict adherence to labor laws and RJSC registration.', color: '#00e5ff' },
                { title: 'Strict Payroll Discipline', desc: 'Guaranteed timely disbursement, tax deduction compliance, and complete transparency.', color: '#00ff88' },
                { title: 'Pre-Vetted & Trained Talent', desc: 'Background verified personnel ready to deploy immediately with proper orientation.', color: '#ffd700' },
                { title: 'Rapid Nationwide Replacement', desc: 'Uninterrupted operational support with immediate backup staffing across all 64 districts.', color: '#3d8bff' },
              ].map((item, idx) => {
                const itemSpring = spring({
                  frame: Math.max(0, frame - 30 - idx * 45),
                  fps,
                  config: { damping: 13, stiffness: 85 },
                });

                return (
                  <div
                    key={item.title}
                    style={{
                      background: 'rgba(10, 25, 45, 0.78)',
                      border: `1px solid ${item.color}55`,
                      borderRadius: 16,
                      padding: '20px 28px',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                      transform: `translateX(${(1 - itemSpring) * 60}px)`,
                      opacity: itemSpring,
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 800, color: item.color, marginBottom: 4 }}>
                      ✓ {item.title}
                    </div>
                    <div style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.4 }}>
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Phase 2: 8 Manpower Categories with 63 Job Positions */
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  background: '#00e5ff',
                  color: '#050b14',
                  fontSize: 16,
                  fontWeight: 900,
                  padding: '6px 14px',
                  borderRadius: 8,
                }}
              >
                63 POSITIONS
              </div>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc' }}>
                Pre-Vetted Staff across 8 Major Categories
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 20,
                maxWidth: 1380,
              }}
            >
              {categories.map((c, idx) => {
                const catSpring = spring({
                  frame: Math.max(0, frame - 370 - idx * 25),
                  fps,
                  config: { damping: 12, stiffness: 85 },
                });

                return (
                  <div
                    key={c.title}
                    style={{
                      background: 'rgba(11, 28, 48, 0.75)',
                      border: `1px solid ${c.color}44`,
                      borderRadius: 14,
                      padding: '20px',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      transform: `scale(${catSpring})`,
                      opacity: catSpring,
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
                      <span style={{ fontSize: 13, fontWeight: 800, color: c.color }}>
                        CAT 0{c.id}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: '#ffffff',
                          background: `${c.color}33`,
                          padding: '4px 10px',
                          borderRadius: 20,
                        }}
                      >
                        {c.count} Roles
                      </span>
                    </div>
                    <div style={{ fontSize: 19, fontWeight: 800, color: '#f1f5f9' }}>
                      {c.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Client Sectors Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 18,
          }}
        >
          <span style={{ color: '#64748b', fontSize: 16, fontWeight: 700 }}>
            Serving:
          </span>
          {clientTypes.map((t) => (
            <span
              key={t}
              style={{
                color: '#cbd5e1',
                fontSize: 15,
                fontWeight: 600,
                background: 'rgba(255,255,255,0.06)',
                padding: '6px 16px',
                borderRadius: 20,
              }}
            >
              • {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
