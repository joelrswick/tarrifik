import React from 'react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Tariff Times</h1>
        <p className="text-gray-600 mt-2">Live tariff data and analysis</p>
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Latest Tariff Data</h2>
          <p className="text-gray-600">Data loading...</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Analysis</h2>
          <p className="text-gray-600">Analysis loading...</p>
        </div>
      </section>
    </div>
  );
} 