import React, { useState, useEffect } from 'react';
import Header           from './components/Header';
import StatCards        from './components/StatCards';
import PrixChart        from './components/PrixChart';
import ChangementsTable from './components/ChangementsTable';
import VolsTable        from './components/VolsTable';
import PriceComparison  from './components/PriceComparison';

const BASE = 'https://cdn.jsdelivr.net/gh/MohtadiRomene/volz-scraper@main/output';
const HISTORIQUE_URL  = `${BASE}/historique.json`;
const RAPPORT_URL     = `${BASE}/rapport.json`;
const VOLS_URL        = `${BASE}/tous-les-vols.json`;
const COMPARISON_URL  = `${BASE}/comparison.json`;

export default function App() {
  const [vols,          setVols]          = useState([]);
  const [historique,    setHistorique]    = useState([]);
  const [rapport,       setRapport]       = useState(null);
  const [comparaisons,  setComparaisons]  = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [erreur,        setErreur]        = useState(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const [h, r, v, c] = await Promise.all([
          fetch(HISTORIQUE_URL).then(r => r.json()),
          fetch(RAPPORT_URL).then(r => r.json()),
          fetch(VOLS_URL).then(r => r.json()),
          fetch(COMPARISON_URL).then(r => r.json()).catch(() => []),
        ]);
        setHistorique(h);
        setRapport(r);
        setVols(v);
        setComparaisons(c);
      } catch (e) {
        setErreur('Impossible de charger les données. Vérifiez que les fichiers JSON sont bien sur GitHub.');
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  const dernierChangements = historique.length > 0
    ? (historique[historique.length - 1].changements || [])
    : [];

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 40 }}>✈️</div>
      <div style={{ fontSize: 16, color: '#6b7280' }}>Chargement des données...</div>
    </div>
  );

  if (erreur) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 40 }}>⚠️</div>
      <div style={{ fontSize: 16, color: '#ef4444' }}>{erreur}</div>
    </div>
  );

  return (
    <div>
      <Header rapport={rapport} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <StatCards  vols={vols} changements={dernierChangements} rapport={rapport} />
        {comparaisons.length > 0 && <PriceComparison comparaisons={comparaisons} />}
        <PrixChart  historique={historique} />
        <ChangementsTable changements={dernierChangements} />
        <VolsTable  vols={vols} />
      </div>
    </div>
  );
}
