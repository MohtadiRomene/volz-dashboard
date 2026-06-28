import React, { useState, useEffect } from 'react';
import Header           from './components/Header';
import StatCards        from './components/StatCards';
import PrixChart        from './components/PrixChart';
import ChangementsTable from './components/ChangementsTable';
import VolsTable        from './components/VolsTable';

// URL du JSON sur GitHub (remplace TON_USER et TON_REPO)
// Remplace TON_USER par ton vrai username GitHub
const HISTORIQUE_URL = 'https://raw.githubusercontent.com/MohtadiRomene/volz-scraper/main/output/historique.json';
const RAPPORT_URL    = 'https://raw.githubusercontent.com/MohtadiRomene/volz-scraper/main/output/rapport.json';
const VOLS_URL       = 'https://raw.githubusercontent.com/MohtadiRomene/volz-scraper/main/output/tous-les-vols.json';

export default function App() {
  const [vols,       setVols]       = useState([]);
  const [historique, setHistorique] = useState([]);
  const [rapport,    setRapport]    = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [erreur,     setErreur]     = useState(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const [h, r, v] = await Promise.all([
          fetch(HISTORIQUE_URL).then(r => r.json()),
          fetch(RAPPORT_URL).then(r => r.json()),
          fetch(VOLS_URL).then(r => r.json()),
        ]);
        setHistorique(h);
        setRapport(r);
        setVols(v);
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
        <PrixChart  historique={historique} />
        <ChangementsTable changements={dernierChangements} />
        <VolsTable  vols={vols} />
      </div>
    </div>
  );
}
