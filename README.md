# Tarrifik - Live Tariff Data Tracker

A Next.js application that tracks and visualizes live tariff data from government sources.

## Features

- Real-time tariff data from Census Bureau
- Interactive data visualization
- Filtering capabilities
- Multiple view modes (table and chart)

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Census API key:
   ```
   CENSUS_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

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