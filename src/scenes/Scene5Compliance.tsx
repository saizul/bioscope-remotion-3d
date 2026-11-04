import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { ThreeCanvasWrapper } from '../components/ThreeCanvasWrapper';
import { GoldenSeals3D, FloatingParticles3D } from '../components/ThreeComponents';

export const Scene5Compliance: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 390
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 14, stiffness: 85 } });

  const credentials = [
    {
      title: 'Government Approved Vendor',
      sub: 'Enlisted & Trusted Partner',
      badge: 'OFFICIAL',
      color: '#ffd700',
    },
    {
      title: 'RJSC Registered',
      sub: 'Registration No: C-123913',
      badge: 'LEGAL ENTITY',
      color: '#00e5ff',
    },
    {
      title: 'DIFE Licensed',
      sub: 'Labor Law & Inspection Compliant',
      badge: 'MINISTRY ACCREDITED',
      color: '#00ff88',
    },
    {
      title: 'PPR & CPTU Compliant',
      sub: 'Public Procurement Rules Compliant',
      badge: 'PROCUREMENT AUDITED',
      color: '#3d8bff',
    },
  ];

  const exitOpacity = interpolate(frame, [360, 390], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#050a16',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.12) 0%, rgba(5, 10, 22, 0.98) 70%)',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        opacity: exitOpacity,
      }}
    >
      {/* 3D Golden Seals Scene */}
      <ThreeCanvasWrapper cameraPosition={[0, 0, 7.5]}>
        <FloatingParticles3D count={60} />
        <GoldenSeals3D enterFrame={0} />
      </ThreeCanvasWrapper>

      {/* 2D Glass Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '70px 100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${(1 - headerSpring) * -20}px)`,
            opacity: headerSpring,
          }}
        >
          <div
            style={{
              color: '#ffd700',
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Trust, Compliance & Legal Accreditation
          </div>
          <h2
            style={{
              fontSize: 50,
              fontWeight: 900,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Built on <span style={{ color: '#ffd700' }}>Legal Integrity</span> & Government Compliance
          </h2>
        </div>

        {/* 4 Bottom Cards aligned with the 3D rotating golden coins above */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            marginBottom: 20,
          }}
        >
          {credentials.map((c, idx) => {
            const cardSpring = spring({
              frame: Math.max(0, frame - 30 - idx * 45),
              fps,
              config: { damping: 13, stiffness: 85 },
            });

            return (
              <div
                key={c.title}
                style={{
                  background: 'rgba(10, 24, 42, 0.82)',
                  border: `1px solid ${c.color}55`,
                  borderRadius: 18,
                  padding: '24px 20px',
                  textAlign: 'center',
                  backdropFilter: 'blur(20px)',
                  boxShadow: `0 12px 35px rgba(0,0,0,0.5), inset 0 0 15px ${c.color}15`,
                  transform: `translateY(${(1 - cardSpring) * 30}px) scale(${cardSpring})`,
                  opacity: cardSpring,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: c.color,
                    background: `${c.color}22`,
                    border: `1px solid ${c.color}44`,
                    padding: '3px 10px',
                    borderRadius: 20,
                    letterSpacing: 1,
                  }}
                >
                  {c.badge}
                </span>

                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#ffffff',
                    marginTop: 12,
                    lineHeight: 1.3,
                  }}
                >
                  {c.title}
                </div>

                <div
                  style={{
                    fontSize: 14,
                    color: '#94a3b8',
                    marginTop: 6,
                  }}
                >
                  {c.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer reassurance */}
        <div
          style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Zero Legal Exposure • Full Statutory Compliance • Verified Governance
        </div>
      </div>
    </div>
  );
};
