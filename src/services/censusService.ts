import axios from 'axios';

interface CensusData {
  [key: string]: string | number;
}

interface CensusResponse {
  data: CensusData[];
  metadata: {
    [key: string]: any;
  };
}

export class CensusService {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.census.gov/data/timeseries/intltrade/exports';

  constructor() {
    const apiKey = process.env.CENSUS_API_KEY;
    if (!apiKey) {
      throw new Error('CENSUS_API_KEY environment variable is not set');
    }
    this.apiKey = apiKey;
  }

  private async fetchData(endpoint: string, params: Record<string, string>): Promise<CensusResponse> {
    try {
      const response = await axios.get<CensusData[]>(`${this.baseUrl}/${endpoint}`, {
        params: {
          ...params,
          key: this.apiKey,
        },
      });

      return {
        data: response.data,
        metadata: response.headers,
      };
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Census API Error: ${error.response.data?.error || error.message}`);
      }
      throw error;
    }
  }

  async getExportsByEndUse(params: {
    time: string;
    enduse?: string;
    state?: string;
  }): Promise<CensusResponse> {
    return this.fetchData('enduse', params);
  }

  async getExportsByHS(params: {
    time: string;
    hs?: string;
    state?: string;
  }): Promise<CensusResponse> {
    return this.fetchData('hs', params);
  }

  async getExportsByNAICS(params: {
    time: string;
    naics?: string;
    state?: string;
  }): Promise<CensusResponse> {
    return this.fetchData('naics', params);
  }
} 