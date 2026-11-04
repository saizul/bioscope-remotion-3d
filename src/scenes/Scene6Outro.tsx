import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';
import { ThreeCanvasWrapper } from '../components/ThreeCanvasWrapper';
import { Outro3D, FloatingParticles3D } from '../components/ThreeComponents';

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 360
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 13, stiffness: 80 } });
  const ctaSpring = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14, stiffness: 85 } });
  const buttonsSpring = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 12, stiffness: 90 } });
  const contactSpring = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 14, stiffness: 80 } });

  const pulse = Math.sin(frame * 0.1) * 0.03 + 1;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#050a14',
        backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(250, 105, 85, 0.12) 0%, rgba(0, 168, 107, 0.08) 40%, rgba(5, 10, 20, 0.98) 75%)',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 3D Scene */}
      <ThreeCanvasWrapper cameraPosition={[0, 0, 8]}>
        <FloatingParticles3D count={90} />
        <Outro3D enterFrame={0} />
      </ThreeCanvasWrapper>

      {/* 2D Glassmorphic Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '50px 100px 40px 100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {/* Top Company Brand with Official Wordmark / Full Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            transform: `translateY(${(1 - logoSpring) * -30}px) scale(${logoSpring})`,
            opacity: logoSpring,
          }}
        >
          <Img
            src={staticFile('assets/bioscope-logomark.svg')}
            style={{ width: 64, height: 64 }}
          />
          <div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: 2,
              }}
            >
              BIOSCOPE <span style={{ color: '#FA6955' }}>LIMITED</span>
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#00A86B',
                letterSpacing: 3,
                marginTop: 2,
              }}
            >
              CONSULTANCY • OUTSOURCING • IMPACT
            </div>
          </div>
        </div>

        {/* Center Main CTA Headline & Buttons */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 40,
            transform: `scale(${ctaSpring})`,
            opacity: ctaSpring,
          }}
        >
          <h2
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 20px 0',
              textShadow: '0 0 40px rgba(0, 168, 107, 0.4)',
            }}
          >
            Hire Staff or Apply in <span style={{ color: '#00A86B' }}>2 Minutes!</span>
          </h2>

          <div
            style={{
              display: 'flex',
              gap: 30,
              justifyContent: 'center',
              transform: `scale(${buttonsSpring * pulse})`,
              opacity: buttonsSpring,
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #002060 0%, #0040A0 100%)',
                color: '#ffffff',
                border: '1px solid #38bdf8',
                fontSize: 22,
                fontWeight: 900,
                padding: '18px 42px',
                borderRadius: 50,
                boxShadow: '0 10px 30px rgba(0, 32, 96, 0.6), inset 0 2px 4px rgba(255,255,255,0.4)',
                letterSpacing: 0.5,
              }}
            >
              Request Manpower →
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, #FA6955 0%, #E04834 100%)',
                color: '#ffffff',
                fontSize: 22,
                fontWeight: 900,
                padding: '18px 42px',
                borderRadius: 50,
                boxShadow: '0 10px 30px rgba(250, 105, 85, 0.5), inset 0 2px 4px rgba(255,255,255,0.4)',
                letterSpacing: 0.5,
              }}
            >
              Apply for a Job →
            </div>
          </div>
        </div>

        {/* Contact Dashboard with 2 Dhaka Offices */}
        <div
          style={{
            width: '100%',
            maxWidth: 1400,
            background: 'rgba(10, 24, 45, 0.88)',
            border: '1px solid rgba(250, 105, 85, 0.4)',
            borderRadius: 24,
            padding: '24px 40px',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            transform: `translateY(${(1 - contactSpring) * 40}px)`,
            opacity: contactSpring,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.2fr 1.6fr',
              gap: 30,
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ color: '#FA6955', fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>
                OFFICIAL PORTAL
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#ffffff', marginTop: 4 }}>
                bioscopeltd.net
              </div>
              <div style={{ fontSize: 16, color: '#94a3b8', marginTop: 4 }}>
                bioscope.ltd@gmail.com
              </div>
            </div>

            <div>
              <div style={{ color: '#ffd700', fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>
                DIRECT HELPLINE
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                +880 2-48122490
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
                +88 02 55042099
              </div>
            </div>

            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: 24 }}>
              <div style={{ color: '#00A86B', fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>
                DHAKA CORPORATE OFFICES
              </div>
              <div style={{ fontSize: 14, color: '#e2e8f0', marginTop: 6, lineHeight: 1.4 }}>
                <strong style={{ color: '#ffffff' }}>Banani Office:</strong> House-35/D, Road-7, Block-G, Banani, Dhaka
              </div>
              <div style={{ fontSize: 14, color: '#e2e8f0', marginTop: 4, lineHeight: 1.4 }}>
                <strong style={{ color: '#ffffff' }}>Shyamoli Office:</strong> 102, Block-Ka, PC Culture Housing Society, Shyamoli, Dhaka
              </div>
            </div>
          </div>
        </div>

        <div style={{ color: '#64748b', fontSize: 14, fontWeight: 600 }}>
          © Bioscope Limited. All Rights Reserved. Registered with RJSC (C-123913) & DIFE Licensed.
        </div>
      </div>
    </div>
  );
};
