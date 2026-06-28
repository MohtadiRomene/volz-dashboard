import React, { useState } from 'react';

export default function VolsTable({ vols }) {
  const [filtreOrig, setFiltreOrig] = useState('');
  const [filtreDest, setFiltreDest] = useState('');
  const [filtreType, setFiltreType] = useState('');
  const [tri, setTri]               = useState('prix_num');

  // Dédupliquer
  const seen = new Set();
  const volsUniques = vols.filter(v => {
    const key = `${v.origine}-${v.destination}-${v.date_aller}-${v.type}-${v.adultes}-${v.aller?.heure_dep}-${v.prix_dzd}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const origines     = [...new Set(volsUniques.map(v => v.origine))].sort();
  const destinations = [...new Set(volsUniques.map(v => v.destination))].sort();

  const volsFiltres = volsUniques
    .filter(v => !filtreOrig || v.origine     === filtreOrig)
    .filter(v => !filtreDest || v.destination === filtreDest)
    .filter(v => !filtreType || v.type        === filtreType)
    .sort((a, b) => {
      const pa = a.prix_num || parseFloat(a.prix_dzd?.replace(/\s/g,'').replace(',','.')) || 0;
      const pb = b.prix_num || parseFloat(b.prix_dzd?.replace(/\s/g,'').replace(',','.')) || 0;
      return tri === 'prix_num' ? pa - pb : (a[tri] > b[tri] ? 1 : -1);
    })
    .slice(0, 50);

  const sel = {
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: '6px 10px',
    fontSize: 13,
    background: '#fff'
  };

  const parsePrix = (v) => {
    if (v.prix_num && v.prix_num > 0) return v.prix_num;
    if (v.prix_dzd) {
      const n = parseFloat(v.prix_dzd.replace(/\s/g,'').replace(',','.'));
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>
          Tous les vols{' '}
          <span style={{ color: '#9ca3af', fontSize: 13 }}>({volsFiltres.length} affichés)</span>
        </h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select style={sel} value={filtreOrig} onChange={e => setFiltreOrig(e.target.value)}>
            <option value="">Toutes origines</option>
            {origines.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <select style={sel} value={filtreDest} onChange={e => setFiltreDest(e.target.value)}>
            <option value="">Toutes destinations</option>
            {destinations.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select style={sel} value={filtreType} onChange={e => setFiltreType(e.target.value)}>
            <option value="">Tous types</option>
            <option value="OW">Aller simple</option>
            <option value="RT">Aller-retour</option>
          </select>
          <select style={sel} value={tri} onChange={e => setTri(e.target.value)}>
            <option value="prix_num">Trier par prix</option>
            <option value="date_aller">Trier par date</option>
            <option value="origine">Trier par origine</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['Route','Type','Date aller','Départ','Arrivée','Escales','Durée','Prix DZD','Places'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 12, color: '#6b7280', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {volsFiltres.map((v, i) => {
              const prix = parsePrix(v);
              return (
                <tr key={i} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                    {v.origine} → {v.destination}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      background: v.type === 'RT' ? '#ede9fe' : '#e0f2fe',
                      color:      v.type === 'RT' ? '#7c3aed' : '#0369a1',
                      borderRadius: 6, padding: '2px 8px', fontSize: 11
                    }}>
                      {v.type === 'RT' ? 'A/R' : 'Simple'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#6b7280' }}>{v.date_aller}</td>
                  <td style={{ padding: '10px 12px' }}>{v.aller?.heure_dep || '-'}</td>
                  <td style={{ padding: '10px 12px' }}>{v.aller?.heure_arr || '-'}</td>
                  <td style={{ padding: '10px 12px', color: '#6b7280' }}>{v.aller?.nb_stops || '-'}</td>
                  <td style={{ padding: '10px 12px', color: '#6b7280' }}>{v.aller?.duree || '-'}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#6366f1' }}>
                    {prix > 0 ? prix.toLocaleString('fr-FR') + ' DZD' : '-'}
                  </td>
                  <td style={{ padding: '10px 12px', color: v.places > 0 && v.places <= 2 ? '#ef4444' : '#10b981' }}>
                    {v.places > 0 ? `${v.places} 💺` : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
