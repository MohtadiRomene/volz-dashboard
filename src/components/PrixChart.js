import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ROUTES = ['ALG-CDG','ALG-IST','ALG-DXB','ORN-CDG','TUN-CDG'];

export default function PrixChart({ historique }) {
  const [routeSelect, setRouteSelect] = useState('ALG-CDG');

  const data = historique.map(session => {
    const [orig, dest] = routeSelect.split('-');
    const vols = (session.vols || []).filter(v => v.origine === orig && v.destination === dest);
    const prixMin = vols.length ? Math.min(...vols.map(v => v.prix_num)) : null;
    return { date: session.date, prix: prixMin };
  }).filter(d => d.prix !== null);

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>Évolution des prix</h2>
        <select
          value={routeSelect}
          onChange={e => setRouteSelect(e.target.value)}
          style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '6px 12px', fontSize: 13 }}
        >
          {ROUTES.map(r => <option key={r} value={r}>{r.replace('-',' → ')}</option>)}
        </select>
      </div>
      {data.length < 2 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#aaa', fontSize: 14 }}>
          Pas encore assez de données — revenez après quelques jours de scraping 📊
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={v => [`${v?.toLocaleString('fr-FR')} DZD`, 'Prix min']} />
            <Line type="monotone" dataKey="prix" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
