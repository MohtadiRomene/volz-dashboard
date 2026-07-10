import React from 'react';

const SITE_LABELS = { volz: 'VOLZ', h24voyages: 'H24 VOYAGES' };
const SITE_COLORS = { volz: '#a78bfa', h24voyages: '#22d3ee' };

export default function PriceComparison({ comparaisons }) {
  const sorted = [...comparaisons].sort((a, b) => (b.economie || 0) - (a.economie || 0));

  return (
    <div className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', margin: 0, letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
          DECISION ENGINE — {sorted.length} ROUTES
        </h2>
        <span style={{ fontSize: 11, color: '#4b5768', fontFamily: "'JetBrains Mono', monospace" }}>
          sorted by max savings
        </span>
      </div>

      <table className="cyber-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>Volz</th>
            <th>H24 Voyages</th>
            <th>Best option</th>
            <th>Savings</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => (
            <tr key={i}>
              <td style={{ color: '#e5e7eb', fontWeight: 700 }}>{c.route}</td>
              <td style={{ color: c.moinsCher.site === 'volz' ? '#22c55e' : '#4b5768', fontWeight: c.moinsCher.site === 'volz' ? 700 : 400 }}>
                {c.prix.volz ? `${c.prix.volz.toLocaleString('fr-FR')} DZD` : '—'}
              </td>
              <td style={{ color: c.moinsCher.site === 'h24voyages' ? '#22c55e' : '#4b5768', fontWeight: c.moinsCher.site === 'h24voyages' ? 700 : 400 }}>
                {c.prix.h24voyages ? `${c.prix.h24voyages.toLocaleString('fr-FR')} DZD` : '—'}
              </td>
              <td>
                <span className="badge badge-best" style={{ color: SITE_COLORS[c.moinsCher.site], borderColor: `${SITE_COLORS[c.moinsCher.site]}55`, background: `${SITE_COLORS[c.moinsCher.site]}18` }}>
                  {SITE_LABELS[c.moinsCher.site]}
                </span>
              </td>
              <td style={{ color: c.economie > 0 ? '#facc15' : '#4b5768', fontWeight: 700 }}>
                {c.economie > 0 ? `+${c.economie.toLocaleString('fr-FR')} DZD` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
