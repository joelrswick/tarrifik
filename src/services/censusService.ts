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

export async function fetchTariffData(year: string = '2023'): Promise<TariffData[]> {
  if (!CENSUS_API_KEY) {
    throw new Error('Census API key is not configured');
  }

  const endpoint = 'timeseries/intltrade/imports';
  const params = {
    get: 'COMMODITY,CTY_CODE,CTY_NAME,GEN_VAL_MO,GEN_VAL_YR,MONTH',
    for: 'time:' + year,
    key: CENSUS_API_KEY
  };

  const queryParams = new URLSearchParams(params);
  const url = `${CENSUS_API_BASE_URL}/${endpoint}?${queryParams.toString()}`;
  // eslint-disable-next-line no-console
  console.log('Census API request:', url);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Census API error: ${response.statusText}`);
  }

  const data: CensusData = await response.json();
  // eslint-disable-next-line no-console
  console.log('Census API raw response:', JSON.stringify(data).slice(0, 500));
  if (!data || !Array.isArray(data.data)) {
    throw new Error('No valid data returned from Census API');
  }
  // Transform the data into a more usable format
  return data.data.map(row => ({
    year: row[0],
    commodity: row[1],
    country: row[3],
    value: parseFloat(row[4]) || 0,
    month: row[5],
  }));
}

export async function fetchTopTariffs(year: string = '2023', limit: number = 10): Promise<TariffData[]> {
  const data = await fetchTariffData(year);
  return data
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

// New: Fetch monthly import values for a given country (e.g., China) for the last year
export async function fetchMonthlyImportSeries({
  year = '2023',
  country = 'China',
  commodity = '',
}: {
  year?: string;
  country?: string;
  commodity?: string;
}): Promise<{ label: string; value: number }[]> {
  const data = await fetchTariffData(year);
  // Filter by country and/or commodity
  const filtered = data.filter(
    d => (!country || d.country === country) && (!commodity || d.commodity === commodity)
  );
  // Group by month
  const byMonth: Record<string, number> = {};
  filtered.forEach(d => {
    if (d.month) {
      byMonth[d.month] = (byMonth[d.month] || 0) + d.value;
    }
  });
  // Return as sorted array
  return Object.entries(byMonth)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([month, value]) => ({ label: month, value }));
} 