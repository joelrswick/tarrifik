import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchMonthlyImportSeries } from '../../services/censusService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { country = 'China', year = '2022', commodity = '' } = req.query;
  try {
    const data = await fetchMonthlyImportSeries({
      country: String(country),
      year: String(year),
      commodity: String(commodity),
    });
    // Cache for 1 hour
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json({ data });
  } catch (error) {
    // Log error details for debugging
    // eslint-disable-next-line no-console
    console.error('API /monthly-imports error:', error);
    res.status(200).json({ data: [], error: (error as Error).message || 'Unknown error' });
  }
} 