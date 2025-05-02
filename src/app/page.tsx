import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Tarrifik</h1>
        <p className="text-xl text-gray-600">Live Tariff Data Tracker</p>
      </header>

      <div className="mb-8">
        <Link 
          href="/tariffs" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Tariff Data
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">USITC DataWeb</h2>
          <p className="text-gray-600 mb-4">Access U.S. tariff schedules and import/export data</p>
          <Link 
            href="https://dataweb.usitc.gov/" 
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Data →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">CBP Data</h2>
          <p className="text-gray-600 mb-4">Tariff classifications and duty rates</p>
          <Link 
            href="https://www.cbp.gov/" 
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Data →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Census Bureau</h2>
          <p className="text-gray-600 mb-4">Import/export data and trade statistics</p>
          <Link 
            href="https://www.census.gov/foreign-trade/index.html" 
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Data →
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-gray-600">
          We're working on integrating live data feeds and interactive charts to help you track and analyze tariff data in real-time.
        </p>
      </div>
    </div>
  )
} 