import React from 'react';

function Card({ label, value, color, sub }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', flex: 1, minWidth: 160, borderLeft: `4px solid ${color}` }}>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default function StatCards({ vols, changements, rapport }) {

  // Dédupliquer les vols par clé unique
  const seen = new Set();
  const volsUniques = vols.filter(v => {
    const key = `${v.origine}-${v.destination}-${v.date_aller}-${v.type}-${v.adultes}-${v.aller?.heure_dep}-${v.prix_dzd}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Parser le prix correctement
  const parsePrix = (v) => {
    if (v.prix_num && v.prix_num > 0) return v.prix_num;
    if (v.prix_dzd) {
      const n = parseFloat(v.prix_dzd.replace(/\s/g, '').replace(',', '.'));
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };

  const prixValides = volsUniques.map(parsePrix).filter(p => p > 0);
  const prixMin = prixValides.length ? Math.min(...prixValides).toLocaleString('fr-FR') : '-';
  const prixMoy = prixValides.length
    ? Math.round(prixValides.reduce((a, b) => a + b, 0) / prixValides.length).toLocaleString('fr-FR')
    : '-';

  const hausses = changements.filter(c => c.difference > 0).length;
  const baisses = changements.filter(c => c.difference < 0).length;

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Card label="Total vols"   value={volsUniques.length}      color="#6366f1" sub={`${rapport?.nb_recherches || 0} recherches`} />
      <Card label="Prix minimum" value={`${prixMin} DZD`}        color="#10b981" sub="Meilleure offre du jour" />
      <Card label="Prix moyen"   value={`${prixMoy} DZD`}        color="#3b82f6" sub="Toutes routes confondues" />
      <Card label="Hausses"      value={hausses}                  color="#ef4444" sub="vs hier" />
      <Card label="Baisses"      value={baisses}                  color="#10b981" sub="vs hier" />
    </div>
  );
}
