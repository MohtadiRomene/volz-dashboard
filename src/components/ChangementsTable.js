import React from 'react';

export default function ChangementsTable({ changements }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
        Changements de prix détectés
        <span style={{ marginLeft: 8, background: changements.length > 0 ? '#fef3c7' : '#f3f4f6', color: changements.length > 0 ? '#92400e' : '#9ca3af', borderRadius: 20, padding: '2px 10px', fontSize: 12 }}>
          {changements.length}
        </span>
      </h2>
      {changements.length === 0 ? (
        <p style={{ color: '#aaa', fontSize: 14 }}>Aucun changement détecté aujourd'hui</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['Route','Date vol','Ancien prix','Nouveau prix','Différence'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 12, color: '#6b7280', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {changements.map((c, i) => (
              <tr key={i} style={{ borderTop: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{c.route}</td>
                <td style={{ padding: '10px 12px', color: '#6b7280' }}>{c.date}</td>
                <td style={{ padding: '10px 12px' }}>{c.ancien_prix?.toLocaleString('fr-FR')} DZD</td>
                <td style={{ padding: '10px 12px' }}>{c.nouveau_prix?.toLocaleString('fr-FR')} DZD</td>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: c.difference > 0 ? '#ef4444' : '#10b981' }}>
                  {c.difference > 0 ? '+' : ''}{c.difference?.toLocaleString('fr-FR')} DZD {c.difference > 0 ? '📈' : '📉'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
