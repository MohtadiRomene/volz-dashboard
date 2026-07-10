import React, { useState, useEffect } from 'react';
import Header           from './components/Header';
import StatCards        from './components/StatCards';
import ComparisonChart  from './components/ComparisonChart';
import PriceComparison  from './components/PriceComparison';

const BASE = 'https://cdn.jsdelivr.net/gh/MohtadiRomene/volz-scraper@main/output';
const RAPPORT_URL    = `${BASE}/rapport.json`;
const COMPARISON_URL = `${BASE}/comparison.json`;

export default function App() {
  const [rapport, setRapport]           = useState(null);
  const [comparaisons, setComparaisons] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [erreur, setErreur]             = useState(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const [r, c] = await Promise.all([
          fetch(RAPPORT_URL).then(r => r.json()).catch(() => null),
          fetch(COMPARISON_URL).then(r => r.json()),
        ]);
        setRapport(r);
        setComparaisons(c);
      } catch (e) {
        setErreur('Impossible de charger les données de comparaison.');
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 16, background: '#0b0f14' }}>
      <div style={{ fontSize: 32, color: '#22d3ee' }}>⚡</div>
      <div style={{ fontSize: 13, color: '#7d8a9e', fontFamily: "'JetBrains Mono', monospace" }}>INITIALIZING...</div>
    </div>
  );

  if (erreur) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 12, background: '#0b0f14' }}>
      <div style={{ fontSize: 32 }}>⚠️</div>
      <div style={{ fontSize: 14, color: '#f43f5e' }}>{erreur}</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0b0f14' }}>
      <Header rapport={rapport} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <StatCards comparaisons={comparaisons} rapport={rapport} />
        <ComparisonChart comparaisons={comparaisons} />
        <PriceComparison comparaisons={comparaisons} />
      </div>
    </div>
  );
}
