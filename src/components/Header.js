import React from 'react';

export default function Header({ rapport }) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #0d1117 0%, #0b0f14 100%)',
      borderBottom: '1px solid #1e2733',
      padding: '18px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: 'linear-gradient(135deg, #22d3ee22, #a78bfa22)',
          border: '1px solid #1e2733',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}>⚡</div>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: 0.3 }}>
            FLIGHT PRICE INTELLIGENCE
          </h1>
          <p style={{ fontSize: 12, color: '#7d8a9e', margin: '2px 0 0', fontFamily: "'JetBrains Mono', monospace" }}>
            volz.app × h24voyages.com — real-time comparison engine
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#22c55e', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
          <span className="live-dot"></span> LIVE
        </div>
        {rapport && (
          <div style={{ textAlign: 'right', fontSize: 12, color: '#7d8a9e', fontFamily: "'JetBrains Mono', monospace" }}>
            <div>LAST SYNC · {rapport.date}</div>
            <div style={{ color: '#4b5768' }}>{rapport.nb_vols} data points</div>
          </div>
        )}
      </div>
    </div>
  );
}
