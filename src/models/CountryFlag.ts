export interface CountryFlagRequest {
  error: boolean;
  msg: string;
  data: CountryFlag;
}

export interface CountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}
