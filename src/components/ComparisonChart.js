import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#0d1117', border: '1px solid #1e2733', borderRadius: 8,
      padding: '10px 14px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
    }}>
      <div style={{ color: '#e5e7eb', fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name} : {p.value?.toLocaleString('fr-FR')} DZD
        </div>
      ))}
    </div>
  );
};

export default function ComparisonChart({ comparaisons }) {
  const data = comparaisons.map(c => ({
    route: c.route,
    volz: c.prix.volz,
    h24voyages: c.prix.h24voyages,
  }));

  return (
    <div className="panel panel-glow-cyan">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#22d3ee', margin: 0, letterSpacing: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
            PRICE COMPARISON MATRIX
          </h2>
          <p style={{ fontSize: 12, color: '#7d8a9e', margin: '4px 0 0' }}>Volz vs H24 Voyages — par route</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2733" vertical={false} />
          <XAxis dataKey="route" tick={{ fill: '#7d8a9e', fontSize: 11 }} axisLine={{ stroke: '#1e2733' }} tickLine={false} />
          <YAxis tick={{ fill: '#7d8a9e', fontSize: 11 }} axisLine={{ stroke: '#1e2733' }} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(34,211,238,0.04)' }} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#7d8a9e' }} />
          <Bar dataKey="volz" name="Volz" fill="#a78bfa" radius={[4, 4, 0, 0]} />
          <Bar dataKey="h24voyages" name="H24 Voyages" fill="#22d3ee" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
