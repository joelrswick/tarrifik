'use client';

import React, { useEffect, useState } from 'react';
import { fetchTopTariffs, TariffData } from '../services/censusService';
import TariffChart from '../components/TariffChart';
import LineChartCard from '../components/LineChartCard';

const sampleLineData = [
  { label: '13368246', base: 104, priority: 106 },
  { label: '13368254', base: 120, priority: 110 },
  { label: '13368262', base: 150, priority: 130 },
  { label: '13368268', base: 90, priority: 100 },
  { label: '13368275', base: 130, priority: 120 },
];

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
    <div className="min-h-screen bg-[#f7f7fa] font-sans">
      {/* Top Bar */}
      <div className="bg-[#6c47ff] text-white text-xs py-2 px-4 text-center font-semibold tracking-wide">
        Tariff Times | The Latest in Global Trade Data & Analysis
      </div>
      {/* Header */}
      <header className="flex items-center justify-between py-6 px-8 border-b border-gray-200 bg-white shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Tariff Times</h1>
        <nav className="space-x-6 text-base font-medium">
          <a href="#" className="text-[#6c47ff] hover:underline">Home</a>
          <a href="#" className="text-gray-700 hover:text-[#6c47ff] hover:underline">Charts</a>
          <a href="#" className="text-gray-700 hover:text-[#6c47ff] hover:underline">Analysis</a>
          <a href="#" className="text-gray-700 hover:text-[#6c47ff] hover:underline">About</a>
        </nav>
      </header>
      {/* Main Editorial Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-10 px-4 md:px-8">
        {/* Left: Latest News */}
        <aside className="md:col-span-1 space-y-6">
          <h2 className="text-lg font-bold mb-2">Latest News</h2>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:underline font-semibold">US Tariff Policy Update Expected Next Week</a></li>
            <li><a href="#" className="hover:underline">China Trade Surplus Hits New High</a></li>
            <li><a href="#" className="hover:underline">EU Considers New Steel Tariffs</a></li>
            <li><a href="#" className="hover:underline">India Reduces Import Duties on Electronics</a></li>
            <li><a href="#" className="hover:underline">Global Shipping Costs Decline in Q2</a></li>
          </ul>
        </aside>
        {/* Center: Featured Chart & Analysis */}
        <section className="md:col-span-2 flex flex-col gap-8">
          {/* Featured Chart (Dark Line Chart) */}
          <LineChartCard
            data={sampleLineData}
            title="Recent Gas Prices"
            series={[
              { name: 'Base Fee', dataKey: 'base', color: '#6c47ff' },
              { name: 'Min Priority Fee', dataKey: 'priority', color: '#4fd1c5' },
            ]}
          />
          {/* Tariff Bar Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Top Tariffs by Value</h2>
            {loading ? (
              <p className="text-gray-600">Loading data...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : (
              <TariffChart data={tariffData} title="Top 10 Tariffs by Value (2023)" />
            )}
          </div>
          {/* Analysis Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Analysis</h2>
            {!loading && !error && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Total value of top 10 tariffs: ${tariffData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Average tariff value: {(tariffData.length > 0 ? (tariffData.reduce((sum, item) => sum + item.value, 0) / tariffData.length).toLocaleString() : 'N/A')}
                </p>
              </div>
            )}
          </div>
        </section>
        {/* Right: Key Metrics & Newsletter */}
        <aside className="md:col-span-1 space-y-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold mb-4">Key Metrics</h2>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between"><span>Total Imports</span><span className="font-semibold">$1.2T</span></li>
              <li className="flex justify-between"><span>Top Country</span><span className="font-semibold">China</span></li>
              <li className="flex justify-between"><span>Top Commodity</span><span className="font-semibold">Electronics</span></li>
              <li className="flex justify-between"><span>Last Updated</span><span className="font-semibold">May 2025</span></li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold mb-4">Newsletter</h2>
            <p className="text-gray-600 mb-2">Get the daily newsletter that helps thousands of investors understand the markets.</p>
            <form className="flex flex-col gap-2">
              <input type="email" placeholder="Email address" className="rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6c47ff]" />
              <button type="submit" className="bg-[#6c47ff] text-white rounded px-3 py-2 font-semibold hover:bg-[#5436c7]">Subscribe</button>
            </form>
          </div>
        </aside>
      </main>
    </div>
  );
} 
