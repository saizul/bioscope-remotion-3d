import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';
import { ThreeCanvasWrapper } from '../components/ThreeCanvasWrapper';
import { Logo3D, BangladeshMap3D, FloatingParticles3D } from '../components/ThreeComponents';

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [15, 45], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 90 } });

  const taglineSpring = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 14, stiffness: 85 } });
  const mapFade = interpolate(frame, [130, 160], [0, 1], { extrapolateRight: 'clamp' });
  const audienceSpring = spring({ frame: Math.max(0, frame - 220), fps, config: { damping: 12, stiffness: 75 } });

  const exitOpacity = interpolate(frame, [420, 450], [1, 0], { extrapolateLeft: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#050b14',
        backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(250, 105, 85, 0.08) 0%, rgba(0, 168, 107, 0.08) 35%, rgba(5, 11, 20, 0.98) 75%)',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        opacity: exitOpacity,
      }}
    >
      {/* 3D Scene Layer with Official Bioscope 3D Emblem & BD Map */}
      <ThreeCanvasWrapper cameraPosition={[0, 0, 8]}>
        <FloatingParticles3D count={80} />
        {frame < 220 ? <Logo3D enterFrame={0} /> : <BangladeshMap3D enterFrame={130} />}
      </ThreeCanvasWrapper>

      {/* Kinetic Typography & 2D Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '70px 100px',
          boxSizing: 'border-box',
          pointerEvents: 'none',
        }}
      >
        {/* Top Header Badge */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${(1 - titleY) * -30}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'rgba(10, 28, 48, 0.75)',
            border: '1px solid rgba(250, 105, 85, 0.4)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            borderRadius: 50,
            padding: '10px 28px',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Official Mini Logomark Icon */}
          <Img
            src={staticFile('assets/bioscope-logomark.svg')}
            style={{ width: 28, height: 28 }}
          />
          <span
            style={{
              color: '#f8fafc',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Bangladesh's Multidisciplinary Partner
          </span>
        </div>

        {/* Center Dynamic Content */}
        {frame < 210 ? (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 340,
            }}
          >
            <h1
              style={{
                fontSize: 68,
                fontWeight: 900,
                color: '#ffffff',
                margin: 0,
                letterSpacing: 1.5,
                textShadow: '0 10px 30px rgba(0,0,0,0.8)',
                opacity: titleOpacity,
              }}
            >
              BIOSCOPE <span style={{ color: '#FA6955' }}>LIMITED</span>
            </h1>

            <div
              style={{
                marginTop: 18,
                display: 'flex',
                gap: 20,
                transform: `scale(${taglineSpring})`,
                opacity: taglineSpring,
              }}
            >
              {[
                { word: 'CONSULTANCY', color: '#ffd700' },
                { word: 'OUTSOURCING', color: '#00A86B' },
                { word: 'IMPACT', color: '#FA6955' },
              ].map((item, i) => (
                <span
                  key={item.word}
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    letterSpacing: 4,
                    color: item.color,
                    textShadow: `0 0 20px ${item.color}55`,
                  }}
                >
                  {item.word} {i < 2 ? '•' : ''}
                </span>
              ))}
            </div>

            <p
              style={{
                color: '#94a3b8',
                fontSize: 22,
                marginTop: 14,
                fontWeight: 500,
                maxWidth: 820,
                lineHeight: 1.5,
                opacity: taglineSpring,
              }}
            >
              Empowering Organizations, Building Better Tomorrow
            </p>
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              top: 180,
              left: 120,
              maxWidth: 580,
              opacity: mapFade,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                color: '#00A86B',
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Nationwide Operational Reach
            </div>
            <h2
              style={{
                fontSize: 54,
                fontWeight: 900,
                color: '#ffffff',
                margin: '0 0 16px 0',
                lineHeight: 1.15,
              }}
            >
              Connecting All <span style={{ color: '#ffd700' }}>64 Districts</span>
            </h2>
            <p
              style={{
                color: '#cbd5e1',
                fontSize: 22,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Delivering verified manpower, high-impact consultancy, and operational excellence across the entire nation.
            </p>
          </div>
        )}

        {/* Bottom Audience Badges */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            transform: `translateY(${(1 - audienceSpring) * 30}px)`,
            opacity: audienceSpring,
          }}
        >
          {['Private Enterprises', 'Government Agencies', 'NGOs & INGOs'].map((item) => (
            <div
              key={item}
              style={{
                padding: '12px 28px',
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 12,
                color: '#f8fafc',
                fontSize: 18,
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              ✓ {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
