export interface CountryPopulationRequest {
  error: boolean;
  msg: string;
  data: CountryPopulation;
}

export interface CountryPopulation {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCount[];
}

export interface PopulationCount {
  year: number;
  value: number;
}
