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
}

export async function fetchTariffData(year: string = '2023'): Promise<TariffData[]> {
  if (!CENSUS_API_KEY) {
    throw new Error('Census API key is not configured');
  }

  const endpoint = 'timeseries/intltrade/imports';
  const params = {
    get: 'COMMODITY,CTY_CODE,CTY_NAME,GEN_VAL_MO,GEN_VAL_YR',
    for: 'time:' + year,
    key: CENSUS_API_KEY
  };

  const queryParams = new URLSearchParams(params);
  const response = await fetch(`${CENSUS_API_BASE_URL}/${endpoint}?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Census API error: ${response.statusText}`);
  }

  const data: CensusData = await response.json();
  
  // Transform the data into a more usable format
  return data.data.map(row => ({
    year: row[0],
    commodity: row[1],
    country: row[3],
    value: parseFloat(row[4]) || 0
  }));
}

export async function fetchTopTariffs(year: string = '2023', limit: number = 10): Promise<TariffData[]> {
  const data = await fetchTariffData(year);
  return data
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
} 