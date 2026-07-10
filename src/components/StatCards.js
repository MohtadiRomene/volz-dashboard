import React from 'react';

const Card = ({ label, value, sub, color, glow }) => (
  <div className="stat-card" style={glow ? { boxShadow: `0 0 24px -8px ${glow}` } : {}}>
    <div style={{ fontSize: 11, color: '#7d8a9e', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
      {label}
    </div>
    <div style={{ fontSize: 26, fontWeight: 800, color: color || '#e5e7eb', marginTop: 6, fontFamily: "'JetBrains Mono', monospace" }}>
      {value}
    </div>
    <div style={{ fontSize: 11, color: '#4b5768', marginTop: 4 }}>{sub}</div>
  </div>
);

export default function StatCards({ comparaisons, rapport }) {
  const total = comparaisons.length;
  const comparables = comparaisons.filter(c => c.nbSitesDisponibles > 1).length;
  const meilleurPrix = comparaisons.length
    ? Math.min(...comparaisons.map(c => c.moinsCher.prix))
    : 0;
  const economieTotale = comparaisons.reduce((s, c) => s + (c.economie || 0), 0);
  const volzWins = comparaisons.filter(c => c.moinsCher.site === 'volz').length;
  const h24Wins = comparaisons.filter(c => c.moinsCher.site === 'h24voyages').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
      <Card label="Routes analysées" value={total} sub={`${comparables} comparables`} />
      <Card label="Meilleur prix" value={`${meilleurPrix.toLocaleString('fr-FR')} DZD`} color="#22c55e" glow="rgba(34,197,94,0.25)" sub="Toutes routes confondues" />
      <Card label="Économies totales" value={`${economieTotale.toLocaleString('fr-FR')} DZD`} color="#facc15" sub="Si toujours le moins cher choisi" />
      <Card label="Volz gagne" value={volzWins} color="#a78bfa" sub={`sur ${total} routes`} />
      <Card label="H24 gagne" value={h24Wins} color="#22d3ee" sub={`sur ${total} routes`} />
    </div>
  );
}
