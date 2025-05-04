import React, { useEffect, useState } from 'react';
import LineChartCard from './LineChartCard';

const ITEMS = [
  { key: 'oil_gas', label: 'Oil & Gas' },
  { key: 'lumber', label: 'Lumber' },
  { key: 'beer', label: 'Beer' },
  { key: 'wine', label: 'Wine' },
  { key: 'butter', label: 'Butter' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'bananas', label: 'Bananas' },
  { key: 'avocados', label: 'Avocados' },
  { key: 'rice', label: 'Rice' },
  { key: 'chocolate', label: 'Chocolate' },
];

// TODO: Replace with real API calls for each item
const mockMonthlyData = [
  { label: '2023-01', value: 100 },
  { label: '2023-02', value: 110 },
  { label: '2023-03', value: 120 },
  { label: '2023-04', value: 130 },
  { label: '2023-05', value: 140 },
  { label: '2023-06', value: 135 },
  { label: '2023-07', value: 145 },
  { label: '2023-08', value: 150 },
  { label: '2023-09', value: 155 },
  { label: '2023-10', value: 160 },
  { label: '2023-11', value: 158 },
  { label: '2023-12', value: 162 },
];

function useCommodityData(itemKey: string) {
  // In the future, switch on itemKey and fetch from the correct API
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulate async fetch
    setTimeout(() => {
      setData(mockMonthlyData);
      setLoading(false);
    }, 500);
  }, [itemKey]);

  return { data, loading, error };
}

export default function CommodityChartGrid() {
  return (
    <section>
      <h2 className="text-3xl font-extrabold font-serif text-gray-900 mb-8 text-center">Monthly Price Trends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {ITEMS.map(item => {
          const { data, loading, error } = useCommodityData(item.key);
          return (
            <div key={item.key} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <h3 className="text-lg font-bold mb-2 font-serif text-[#6c47ff]">{item.label}</h3>
              {loading ? (
                <div className="w-full h-64 flex items-center justify-center animate-pulse text-gray-400">Loading...</div>
              ) : error ? (
                <div className="w-full h-64 flex items-center justify-center text-red-500">Error: {error}</div>
              ) : (
                <LineChartCard
                  data={data}
                  title=""
                  series={[{ name: item.label, dataKey: 'value', color: '#6c47ff' }]}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
} 