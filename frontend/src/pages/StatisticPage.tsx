import { useState, useEffect } from 'react';
import { useDates } from '../hooks/useDates';
import './pages.css';
import { getLastNdays } from '../utils/dateUtils';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PROTEIN_COLORS, PROTEIN_OPTIONS } from '../types/types';
import type { Protein } from '../types/types';

function StatisticPage() {
  const { monthEntries, fetchAll } = useDates();
  const [stats, setStats] = useState<{ name: Protein; value: number }[]>([]);
  const { from, to } = getLastNdays(14);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    const filtered = monthEntries.filter(
      (entry) => entry.date >= from && entry.date <= to
    );

    const counts: Record<Protein, number> = {} as Record<Protein, number>;
    filtered.forEach((entry) => {
      const protein = entry.itemId.protein as Protein;
      counts[protein] = (counts[protein] || 0) + 1;
    });

    const chartData = PROTEIN_OPTIONS.map((protein) => ({
      name: protein,
      value: counts[protein] || 0,
    }));

    setStats(chartData);
  }, [monthEntries, from, to]);

  return (
    <main>
      <section className="statistic-page">
        <section className="stats-header">
          <h1>Statistik</h1>
          <h5>senaste 14 dagarna</h5>
        </section>

        {stats.length === 0 ? (
          <p className='loading'>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {stats.map((entry) => (
                  <Cell key={entry.name} fill={PROTEIN_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </section>
    </main>
  );
}

export default StatisticPage;