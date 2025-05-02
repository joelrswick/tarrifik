'use client';

import React, { useEffect, useState } from 'react';
import { fetchTopTariffs, TariffData } from '../services/censusService';
import TariffChart from '../components/TariffChart';

export default function Home() {
  const [tariffData, setTariffData] = useState<TariffData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTopTariffs();
        setTariffData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Tariff Times</h1>
        <p className="text-gray-600 mt-2">Live tariff data and analysis</p>
      </header>
      
      <section className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Top Tariffs by Value</h2>
          {loading ? (
            <p className="text-gray-600">Loading data...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : (
            <TariffChart 
              data={tariffData} 
              title="Top 10 Tariffs by Value (2023)" 
            />
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Analysis</h2>
          {!loading && !error && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Total value of top 10 tariffs: ${tariffData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
              </p>
              <p className="text-gray-600">
                Average tariff value: ${(tariffData.reduce((sum, item) => sum + item.value, 0) / tariffData.length).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 
