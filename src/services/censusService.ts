const CENSUS_API_KEY = process.env.NEXT_PUBLIC_CENSUS_API_KEY;
const CENSUS_API_BASE_URL = 'https://api.census.gov/data';

export interface CensusData {
  data: Array<Array<string>>;
  headers: string[];
}

export interface TariffData {
  year: string;
  value: number;
  commodity: string;
  country: string;
  month?: string;
}

function getLast12MonthsRange(): { from: string; to: string } {
  const now = new Date();
  now.setDate(1); // Set to first of month for consistency
  const to = now.getFullYear().toString() + (now.getMonth() + 1).toString().padStart(2, '0');
  const lastYear = new Date(now);
  lastYear.setMonth(now.getMonth() - 11);
  const from = lastYear.getFullYear().toString() + (lastYear.getMonth() + 1).toString().padStart(2, '0');
  return { from, to };
}

export async function fetchTariffData(): Promise<TariffData[]> {
  if (!CENSUS_API_KEY) {
    throw new Error('Census API key is not configured');
  }

  const endpoint = 'timeseries/intltrade/imports';
  const params = {
    get: 'YEAR,MONTH,CTY_CODE,CTY_NAME,GEN_VAL_MO',
    CTY_CODE: '5700', // China
    YEAR: '2023',
    key: CENSUS_API_KEY
  };

  const queryParams = new URLSearchParams(params);
  const url = `${CENSUS_API_BASE_URL}/${endpoint}?${queryParams.toString()}`;
  // eslint-disable-next-line no-console
  console.error('Census API request:', url);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Census API error: ${response.statusText}`);
  }

  const data = await response.json();
  // eslint-disable-next-line no-console
  console.error('Census API raw response:', JSON.stringify(data).slice(0, 500));
  if (!data || !Array.isArray(data) || data.length < 2) {
    throw new Error('No valid data returned from Census API');
  }
  // The first row is headers
  const headers = data[0];
  const rows = data.slice(1);
  return rows.map((row: string[]) => ({
    year: row[0],
    month: row[1],
    country: row[3],
    value: parseFloat(row[4]) || 0,
    commodity: '', // Not used in this query
  }));
}

export async function fetchTopTariffs(limit: number = 10): Promise<TariffData[]> {
  const data = await fetchTariffData();
  return data
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

// New: Fetch monthly import values for a given country (e.g., China) for the last year
export async function fetchMonthlyImportSeries(): Promise<{ label: string; value: number }[]> {
  const data = await fetchTariffData();
  // Group by month
  const byMonth: Record<string, number> = {};
  data.forEach(d => {
    if (d.month) {
      byMonth[d.month] = (byMonth[d.month] || 0) + d.value;
    }
  });
  // Return as sorted array
  return Object.entries(byMonth)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([month, value]) => ({ label: month, value }));
} 