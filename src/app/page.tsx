'use client';

import React, { useEffect, useState } from 'react';
import { fetchTopTariffs, TariffData } from '../services/censusService';
import TariffChart from '../components/TariffChart';
import LineChartCard from '../components/LineChartCard';
import PriceImpactSection from '../components/PriceImpactSection';

function ChartSkeleton() {
  return (
    <div className="bg-[#18192b] rounded-xl p-6 shadow-lg w-full max-w-2xl mx-auto animate-pulse">
      <div className="h-8 w-1/3 bg-[#23244a] rounded mb-6" />
      <div className="h-72 w-full bg-[#23244a] rounded" />
    </div>
  );
}

export default function Home() {
  const [tariffData, setTariffData] = useState<TariffData[]>([]);
  const [lineData, setLineData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [lineLoading, setLineLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lineError, setLineError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('China');
  const [selectedYear] = useState('2022'); // Hardcoded for debugging

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

  useEffect(() => {
    const loadLineData = async () => {
      setLineLoading(true);
      try {
        const res = await fetch(`/api/monthly-imports?year=${selectedYear}&country=${encodeURIComponent(selectedCountry)}`);
        const json = await res.json();
        setLineData(json.data);
        if (typeof window !== 'undefined') {
          console.log('Line chart API data:', json.data);
        }
      } catch (err) {
        setLineError(err instanceof Error ? err.message : 'Failed to load chart data');
      } finally {
        setLineLoading(false);
      }
    };
    loadLineData();
  }, [selectedCountry, selectedYear]);

  return (
    <div className="min-h-screen bg-[#f7f7fa] font-sans">
      {/* Top Bar */}
      <div className="bg-[#6c47ff] text-white text-xs py-2 px-4 text-center font-semibold tracking-wide">
        Tariff Times | The Latest in Global Trade Data & Analysis
      </div>
      {/* Header */}
      <header className="flex items-center justify-between py-6 px-8 border-b border-gray-200 bg-white shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 font-serif">Tariff Times</h1>
        <nav className="space-x-6 text-base font-medium">
          <a href="#" className="text-[#6c47ff] hover:underline transition-colors">Home</a>
          <a href="#" className="text-gray-700 hover:text-[#6c47ff] hover:underline transition-colors">Charts</a>
          <a href="#" className="text-gray-700 hover:text-[#6c47ff] hover:underline transition-colors">Analysis</a>
          <a href="#" className="text-gray-700 hover:text-[#6c47ff] hover:underline transition-colors">About</a>
        </nav>
      </header>
      {/* Main Editorial Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-10 px-4 md:px-8">
        {/* Left: Latest News */}
        <aside className="md:col-span-1 space-y-6">
          <h2 className="text-lg font-bold mb-2 font-serif">Latest News</h2>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:underline font-semibold transition-colors">US Tariff Policy Update Expected Next Week</a></li>
            <li><a href="#" className="hover:underline transition-colors">China Trade Surplus Hits New High</a></li>
            <li><a href="#" className="hover:underline transition-colors">EU Considers New Steel Tariffs</a></li>
            <li><a href="#" className="hover:underline transition-colors">India Reduces Import Duties on Electronics</a></li>
            <li><a href="#" className="hover:underline transition-colors">Global Shipping Costs Decline in Q2</a></li>
          </ul>
        </aside>
        {/* Center: Featured Chart & Analysis */}
        <section className="md:col-span-2 flex flex-col gap-8">
          {/* Featured Chart (Dark Line Chart) */}
          <div className="bg-[#18192b] rounded-xl p-6 shadow-lg w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Monthly Import Value: {selectedCountry} ({selectedYear})</h3>
              <select
                className="rounded px-2 py-1 bg-[#23244a] text-white border border-[#6c47ff] focus:outline-none focus:ring-2 focus:ring-[#6c47ff]"
                value={selectedCountry}
                onChange={e => setSelectedCountry(e.target.value)}
              >
                <option value="China">China</option>
                <option value="Mexico">Mexico</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="India">India</option>
                <option value="France">France</option>
                <option value="Brazil">Brazil</option>
              </select>
            </div>
            {lineLoading ? (
              <ChartSkeleton />
            ) : lineError ? (
              <p className="text-red-400">Error: {lineError}</p>
            ) : (
              <>
                <LineChartCard
                  data={lineData}
                  title=""
                  series={[
                    { name: 'Import Value', dataKey: 'value', color: '#6c47ff' },
                  ]}
                />
                <pre className="text-xs text-white bg-[#23244a] rounded p-2 mt-4 overflow-x-auto">{JSON.stringify(lineData, null, 2)}</pre>
              </>
            )}
          </div>
          {/* Tariff Bar Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4 font-serif">Top Tariffs by Value</h2>
            {loading ? (
              <p className="text-gray-600">Loading data...</p>
            ) : error ? (
              <p className="text-red-600">Error: {error}</p>
            ) : Array.isArray(tariffData) && tariffData.length > 0 ? (
              <TariffChart data={tariffData} title="Top 10 Tariffs by Value (2023)" />
            ) : (
              <p className="text-red-600">No data available.</p>
            )}
          </div>
          {/* Analysis Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4 font-serif">Analysis</h2>
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
            <h2 className="text-lg font-bold mb-4 font-serif">Key Metrics</h2>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between"><span>Total Imports</span><span className="font-semibold">$1.2T</span></li>
              <li className="flex justify-between"><span>Top Country</span><span className="font-semibold">China</span></li>
              <li className="flex justify-between"><span>Top Commodity</span><span className="font-semibold">Electronics</span></li>
              <li className="flex justify-between"><span>Last Updated</span><span className="font-semibold">May 2025</span></li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold mb-4 font-serif">Newsletter</h2>
            <p className="text-gray-600 mb-2">Get the daily newsletter that helps thousands of investors understand the markets.</p>
            <form className="flex flex-col gap-2">
              <input type="email" placeholder="Email address" className="rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6c47ff]" />
              <button type="submit" className="bg-[#6c47ff] text-white rounded px-3 py-2 font-semibold hover:bg-[#5436c7] transition-colors">Subscribe</button>
            </form>
          </div>
        </aside>
      </main>
      <PriceImpactSection />
    </div>
  );
} 
