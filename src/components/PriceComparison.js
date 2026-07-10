import React, { useState } from 'react';

const SITE_LABELS = {
  volz: 'Volz',
  h24voyages: 'H24 Voyages',
};

export default function PriceComparison({ comparaisons }) {
  const [filtreDispo, setFiltreDispo] = useState(false);

  const data = filtreDispo
    ? comparaisons.filter(c => c.nbSitesDisponibles > 1)
    : comparaisons;

  const totalEconomies = comparaisons.reduce((sum, c) => sum + (c.economie || 0), 0);
  const routesComparables = comparaisons.filter(c => c.nbSitesDisponibles > 1).length;

  return (
    <div style={{
      background: '#0d1117',
      borderRadius: 12,
      padding: 24,
      border: '1px solid #1f2937',
      fontFamily: 'monospace',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#22d3ee', margin: 0, letterSpacing: 0.5 }}>
            ⚡ MOTEUR DE COMPARAISON
          </h2>
          <p style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 0' }}>
            {routesComparables} routes comparables sur {comparaisons.length} au total
          </p>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#9ca3af', cursor: 'pointer' }}>
          <input type="checkbox" checked={filtreDispo} onChange={e => setFiltreDispo(e.target.checked)} />
          Routes comparables uniquement
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
        <div style={{ background: '#161b22', borderRadius: 8, padding: 14, border: '1px solid #1f2937' }}>
          <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase' }}>Économies potentielles</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#4ade80', marginTop: 4 }}>
            {totalEconomies.toLocaleString('fr-FR')} DZD
          </div>
        </div>
        <div style={{ background: '#161b22', borderRadius: 8, padding: 14, border: '1px solid #1f2937' }}>
          <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase' }}>Routes analysées</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#e5e7eb', marginTop: 4 }}>
            {comparaisons.length}
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1f2937' }}>
              {['Route', 'Volz', 'H24 Voyages', 'Meilleur choix', 'Économie'].map(h => (
                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', color: '#6b7280', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #161b22' }}>
                <td style={{ padding: '10px', color: '#e5e7eb', fontWeight: 600 }}>{c.route}</td>
                <td style={{ padding: '10px', color: c.moinsCher.site === 'volz' ? '#4ade80' : '#6b7280' }}>
                  {c.prix.volz ? `${c.prix.volz.toLocaleString('fr-FR')} DZD` : '—'}
                </td>
                <td style={{ padding: '10px', color: c.moinsCher.site === 'h24voyages' ? '#4ade80' : '#6b7280' }}>
                  {c.prix.h24voyages ? `${c.prix.h24voyages.toLocaleString('fr-FR')} DZD` : '—'}
                </td>
                <td style={{ padding: '10px' }}>
                  <span style={{
                    background: '#0f2e1f',
                    color: '#4ade80',
                    borderRadius: 6,
                    padding: '3px 8px',
                    fontSize: 11,
                    fontWeight: 600,
                  }}>
                    {SITE_LABELS[c.moinsCher.site] || c.moinsCher.site}
                  </span>
                </td>
                <td style={{ padding: '10px', color: c.economie > 0 ? '#facc15' : '#4b5563', fontWeight: 600 }}>
                  {c.economie > 0 ? `${c.economie.toLocaleString('fr-FR')} DZD` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
