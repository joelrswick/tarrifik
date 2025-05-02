import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
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
    <div className="bg-[#18192b] rounded-xl p-6 shadow-lg w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#23244a" strokeDasharray="3 3" />
          <XAxis dataKey="label" stroke="#b3b3b3" />
          <YAxis stroke="#b3b3b3" />
          <Tooltip
            contentStyle={{ background: '#23244a', border: 'none', borderRadius: 8, color: '#fff' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend
            wrapperStyle={{ color: '#fff' }}
            iconType="circle"
            verticalAlign="top"
            align="right"
          />
          {series.map(s => (
            <Line
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
              name={s.name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 