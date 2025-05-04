'use client';

import React from 'react';
// @ts-ignore
   import CommodityChartGrid from '../components/CommodityChartGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f7fa] font-sans">
      <header className="flex items-center justify-between py-6 px-8 border-b border-gray-200 bg-white shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 font-serif">Tariff Times</h1>
        <nav className="space-x-6 text-base font-medium">
          <a href="#" className="text-[#6c47ff] hover:underline transition-colors">Home</a>
          <a href="#" className="text-gray-700 hover:text-[#6c47ff] hover:underline transition-colors">Charts</a>
          <a href="#" className="text-gray-700 hover:text-[#6c47ff] hover:underline transition-colors">Analysis</a>
          <a href="#" className="text-gray-700 hover:text-[#6c47ff] hover:underline transition-colors">About</a>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto py-10 px-4 md:px-8">
        <CommodityChartGrid />
      </main>
    </div>
  );
} 
