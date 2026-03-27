import { useState, useEffect } from 'react';
import { useDates } from '../hooks/useDates';
import './pages.css';
import { getLastNdays } from '../utils/dateUtils';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
    '#8884d8', 
    '#82ca9d', 
    '#ffc658', 
    '#ff8042', 
    '#8dd1e1', 
    '#d0ed57'
];

function StatisticPage() {
  const { monthEntries, fetchAll } = useDates();
  const [stats, setStats] = useState<{ name: string; value: number }[]>([]);
  const { from, to } = getLastNdays(14);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    const filtered = monthEntries.filter(
      (entry) => entry.date >= from && entry.date <= to
    );

    const counts: Record<string, number> = {};
    filtered.forEach((entry) => {
      const protein = entry.itemId.protein || 'Unknown';
      counts[protein] = (counts[protein] || 0) + 1;
    });

    // Konvertera till array för PieChart
    const chartData = Object.entries(counts).map(([name, value]) => ({ name, value }));
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
          <p>Loading...</p>
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
                fill="#8884d8"
                label
              >
                {stats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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