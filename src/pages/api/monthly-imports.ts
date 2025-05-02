import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchMonthlyImportSeries } from '../../services/censusService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { country = 'China', year = '2023', commodity = '' } = req.query;
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
    res.status(500).json({ error: (error as Error).message });
  }
} 