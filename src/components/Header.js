import React from 'react';

export default function Header({ rapport }) {
  return (
    <div style={{ background: '#1a1a2e', color: '#fff', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 28 }}>✈️</span>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600 }}>Volz Price Dashboard</h1>
          <p style={{ fontSize: 13, opacity: 0.6 }}>Suivi des prix en temps réel</p>
        </div>
      </div>
      {rapport && (
        <div style={{ textAlign: 'right', fontSize: 13, opacity: 0.8 }}>
          <div>Dernière mise à jour : <strong>{rapport.date}</strong></div>
          <div>{rapport.nb_vols} vols scrapés en {rapport.duree_secondes}s</div>
        </div>
      )}
    </div>
  );
}
