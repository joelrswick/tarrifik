import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const commodities = [
  { label: 'Steel', value: 'steel' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Food', value: 'food' },
  { label: 'Apparel', value: 'apparel' },
  { label: 'Autos', value: 'autos' },
];

// Mock data for chart
const mockData: Record<string, { month: string; ppi: number; importValue: number; event: boolean }[]> = {
  steel: [
    { month: '2021-01', ppi: 100, importValue: 200, event: false },
    { month: '2021-06', ppi: 110, importValue: 180, event: true }, // Tariff event
    { month: '2022-01', ppi: 120, importValue: 160, event: false },
    { month: '2022-06', ppi: 130, importValue: 140, event: false },
    { month: '2023-01', ppi: 140, importValue: 120, event: false },
  ],
  electronics: [
    { month: '2021-01', ppi: 100, importValue: 300, event: false },
    { month: '2021-06', ppi: 102, importValue: 290, event: false },
    { month: '2022-01', ppi: 105, importValue: 270, event: true }, // Tariff event
    { month: '2022-06', ppi: 110, importValue: 250, event: false },
    { month: '2023-01', ppi: 115, importValue: 230, event: false },
  ],
  food: [
    { month: '2021-01', ppi: 100, importValue: 400, event: false },
    { month: '2021-06', ppi: 101, importValue: 390, event: false },
    { month: '2022-01', ppi: 103, importValue: 380, event: false },
    { month: '2022-06', ppi: 105, importValue: 370, event: true }, // Tariff event
    { month: '2023-01', ppi: 108, importValue: 360, event: false },
  ],
  apparel: [
    { month: '2021-01', ppi: 100, importValue: 500, event: false },
    { month: '2021-06', ppi: 99, importValue: 480, event: false },
    { month: '2022-01', ppi: 98, importValue: 470, event: false },
    { month: '2022-06', ppi: 97, importValue: 460, event: true }, // Tariff event
    { month: '2023-01', ppi: 96, importValue: 450, event: false },
  ],
  autos: [
    { month: '2021-01', ppi: 100, importValue: 600, event: false },
    { month: '2021-06', ppi: 105, importValue: 590, event: false },
    { month: '2022-01', ppi: 110, importValue: 580, event: false },
    { month: '2022-06', ppi: 120, importValue: 570, event: true }, // Tariff event
    { month: '2023-01', ppi: 130, importValue: 560, event: false },
  ],
};

const insights: Record<string, { priceChange: string; importChange: string; lastEvent: string; context: string }> = {
  steel: {
    priceChange: '+40%',
    importChange: '-40%',
    lastEvent: '2021-06',
    context: 'Steel prices surged after the 2021 tariffs, with import volumes dropping sharply. This has impacted construction and manufacturing costs nationwide.'
  },
  electronics: {
    priceChange: '+15%',
    importChange: '-23%',
    lastEvent: '2022-01',
    context: 'Electronics prices have steadily increased, while import values fell after the 2022 tariff event.'
  },
  food: {
    priceChange: '+8%',
    importChange: '-10%',
    lastEvent: '2022-06',
    context: 'Food prices rose modestly, but import volumes declined after the mid-2022 tariffs.'
  },
  apparel: {
    priceChange: '-4%',
    importChange: '-10%',
    lastEvent: '2022-06',
    context: 'Apparel prices have dropped, but import volumes also fell after tariffs.'
  },
  autos: {
    priceChange: '+30%',
    importChange: '-7%',
    lastEvent: '2022-06',
    context: 'Auto prices jumped after tariffs, with a slight decline in import values.'
  },
};

export default function PriceImpactSection() {
  const [selected, setSelected] = useState('steel');
  const data = mockData[selected];
  const info = insights[selected];

  if (!data || !info) {
    return (
      <section className="max-w-5xl mx-auto mt-12 mb-16 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold font-serif text-gray-900 mb-1">Tariff-Linked Price Impacts by Industry</h2>
        <p className="text-lg text-gray-600 mb-6">How tariffs have influenced prices in key sectors</p>
        <div className="text-red-600 font-semibold">Error: No data available for the selected industry.</div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto mt-12 mb-16 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold font-serif text-gray-900 mb-1">Tariff-Linked Price Impacts by Industry</h2>
      <p className="text-lg text-gray-600 mb-6">How tariffs have influenced prices in key sectors</p>
      <div className="flex flex-wrap gap-3 mb-8">
        {commodities.map(c => (
          <button
            key={c.value}
            className={`px-4 py-2 rounded-full font-semibold border transition-colors duration-150 ${selected === c.value ? 'bg-[#6c47ff] text-white border-[#6c47ff]' : 'bg-white text-[#6c47ff] border-[#6c47ff] hover:bg-[#f3f0ff]'}`}
            onClick={() => setSelected(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Chart Card */}
        <div className="flex-1 bg-[#18192b] rounded-xl p-6 shadow-lg min-w-0">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#23244a" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#b3b3b3" />
              <YAxis yAxisId="left" stroke="#6c47ff" />
              <YAxis yAxisId="right" orientation="right" stroke="#a259ec" />
              <Tooltip
                contentStyle={{ background: '#23244a', border: 'none', borderRadius: 8, color: '#fff' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ color: '#fff' }} iconType="circle" verticalAlign="top" align="right" />
              <Line yAxisId="left" type="monotone" dataKey="ppi" stroke="#6c47ff" strokeWidth={2} dot={false} name="PPI (Price Index)" />
              <Line yAxisId="right" type="monotone" dataKey="importValue" stroke="#a259ec" strokeWidth={2} dot={false} name="Import Value" />
              {data.map((d: { month: string; event: boolean }, i: number) => d.event && (
                <ReferenceLine key={i} x={d.month} stroke="#ff4d4f" strokeDasharray="4 2" label={{ value: 'Tariff', fill: '#ff4d4f', fontSize: 12, position: 'top' }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Insights & Context */}
        <div className="w-full md:w-72 flex flex-col gap-6">
          <div className="bg-[#f7f7fa] rounded-xl p-4 shadow">
            <h3 className="text-lg font-bold mb-2 text-[#6c47ff]">Key Insights</h3>
            <ul className="text-sm text-gray-800 space-y-1">
              <li><span className="font-semibold">% Price Change:</span> {info.priceChange}</li>
              <li><span className="font-semibold">% Import Change:</span> {info.importChange}</li>
              <li><span className="font-semibold">Last Tariff Event:</span> {info.lastEvent}</li>
            </ul>
          </div>
          <div className="bg-[#f7f7fa] rounded-xl p-4 shadow flex-1 flex flex-col justify-between">
            <blockquote className="italic text-gray-700 mb-2">“{info.context}”</blockquote>
            <a href="#" className="text-[#6c47ff] font-semibold hover:underline text-sm">Read more →</a>
          </div>
        </div>
      </div>
    </section>
  );
} 