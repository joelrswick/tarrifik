import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';

interface Series {
  name: string;
  dataKey: string;
  color: string;
}

interface LineChartCardProps {
  data: any[];
  title: string;
  series: Series[];
}

export default function LineChartCard({ data, title, series }: LineChartCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-extrabold text-black mb-4 font-serif">{title}</h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="" vertical={false} />
          <XAxis dataKey="label" stroke="#111" tick={{ fontWeight: 700, fontSize: 18 }} />
          <YAxis stroke="#111" tick={{ fontWeight: 700, fontSize: 18 }} />
          <Tooltip
            contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, color: '#111' }}
            labelStyle={{ color: '#111', fontWeight: 700 }}
            itemStyle={{ color: '#111' }}
            formatter={(value: number) => `$${value}`}
          />
          <Legend
            wrapperStyle={{ color: '#111', fontWeight: 700, fontSize: 18 }}
            iconType="plainline"
            verticalAlign="top"
            align="left"
          />
          {series.map(s => (
            <Line
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              stroke="#2d145d"
              strokeWidth={5}
              dot={{
                r: 10,
                stroke: '#e24d4d',
                strokeWidth: 3,
                fill: '#fff',
              }}
              activeDot={{
                r: 12,
                stroke: '#e24d4d',
                strokeWidth: 4,
                fill: '#fff',
              }}
              name={s.name}
            >
              <LabelList
                dataKey={s.dataKey}
                position="top"
                formatter={(value: number) => `$${value}`}
                style={{ fontWeight: 700, fontSize: 22, fill: '#111' }}
              />
            </Line>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 