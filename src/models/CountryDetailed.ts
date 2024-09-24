export interface CountryDetailed {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryDetailed[];
}
