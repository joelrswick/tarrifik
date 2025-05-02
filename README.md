# Tariff Times

A Next.js application for tracking and analyzing live tariff data from government sources like the U.S. Census Bureau.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your Census API key:
   ```
   NEXT_PUBLIC_CENSUS_API_KEY=your_census_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- Real-time tariff data from the U.S. Census Bureau
- Data visualization and analysis
- Modern, responsive design

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- U.S. Census Bureau API

## Deployment

This project can be easily deployed to Vercel for free:

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy to Vercel:
   ```bash
   vercel
   ```
4. Set up environment variables in Vercel dashboard:
   - `CENSUS_API_KEY`: Your Census Bureau API key

## Environment Variables

- `CENSUS_API_KEY`: Your Census Bureau API key

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Recharts
- Axios 