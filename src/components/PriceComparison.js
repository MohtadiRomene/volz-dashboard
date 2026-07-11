import React, { useState, useMemo } from 'react';

const SITE_LABELS = { volz: 'VOLZ', h24voyages: 'H24 VOYAGES' };
const SITE_COLORS = { volz: '#a78bfa', h24voyages: '#22d3ee' };

const CLASS_LABELS = {
  ECONOMY: 'Économique',
  PREMIUM_ECONOMY: 'Éco Premium',
  BUSINESS: 'Affaires',
  FIRST: 'Première',
};

const formatPax = (p) => {
  if (!p) return '—';
  const parts = [`${p.adults} adulte${p.adults > 1 ? 's' : ''}`];
  if (p.children > 0) parts.push(`${p.children} enfant${p.children > 1 ? 's' : ''}`);
  if (p.infants > 0) parts.push(`${p.infants} bébé${p.infants > 1 ? 's' : ''}`);
  return parts.join(' + ');
};

const selectStyle = {
  background: '#161b22',
  border: '1px solid #1e2733',
  color: '#e5e7eb',
  borderRadius: 6,
  padding: '6px 10px',
  fontSize: 12,
  fontFamily: "'JetBrains Mono', monospace",
};

export default function PriceComparison({ comparaisons }) {
  const [filtreClasse, setFiltreClasse] = useState('');
  const [filtrePax, setFiltrePax] = useState('');

  const classesDisponibles = useMemo(
    () => [...new Set(comparaisons.map(c => c.cabinClass))],
    [comparaisons]
  );

  const paxDisponibles = useMemo(
    () => [...new Set(comparaisons.map(c => formatPax(c.passengers)))],
    [comparaisons]
  );

  const filtered = comparaisons.filter(c =>
    (!filtreClasse || c.cabinClass === filtreClasse) &&
    (!filtrePax || formatPax(c.passengers) === filtrePax)
  );

  const sorted = [...filtered].sort((a, b) => (b.economie || 0) - (a.economie || 0));

  return (
    <div className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb', margin: 0, letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
          DECISION ENGINE — {sorted.length} ROUTES
        </h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <select style={selectStyle} value={filtreClasse} onChange={e => setFiltreClasse(e.target.value)}>
            <option value="">Toutes classes</option>
            {classesDisponibles.map(c => (
              <option key={c} value={c}>{CLASS_LABELS[c] || c}</option>
            ))}
          </select>
          <select style={selectStyle} value={filtrePax} onChange={e => setFiltrePax(e.target.value)}>
            <option value="">Tous passagers</option>
            {paxDisponibles.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <span style={{ fontSize: 11, color: '#4b5768' }}>sorted by max savings</span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="cyber-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Dates</th>
              <th>Classe</th>
              <th>Passagers</th>
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
                <td style={{ color: '#9ca3af', whiteSpace: 'nowrap' }}>
                  {c.departDate} → {c.returnDate || '—'}
                </td>
                <td style={{ color: '#facc15' }}>{CLASS_LABELS[c.cabinClass] || c.cabinClass}</td>
                <td style={{ color: '#9ca3af', whiteSpace: 'nowrap' }}>{formatPax(c.passengers)}</td>
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
    </div>
  );
}
