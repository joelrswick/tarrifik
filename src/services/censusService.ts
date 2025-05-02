const CENSUS_API_KEY = process.env.NEXT_PUBLIC_CENSUS_API_KEY;
const CENSUS_API_BASE_URL = 'https://api.census.gov/data';

export interface CensusData {
  // Define your Census data interface here
  // This will depend on the specific data you're fetching
}

export async function fetchCensusData(endpoint: string, params: Record<string, string>): Promise<CensusData> {
  const queryParams = new URLSearchParams({
    ...params,
    key: CENSUS_API_KEY || '',
  });

  const response = await fetch(`${CENSUS_API_BASE_URL}/${endpoint}?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Census API error: ${response.statusText}`);
  }

  return response.json();
} 