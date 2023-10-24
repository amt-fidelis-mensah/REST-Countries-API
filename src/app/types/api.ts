// A DTO to help with extracting the data
// A DTO to help with extracting the data
export interface Country {
  pipe: any;
  tap(): unknown;
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };

  capital: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  latlng: number[];
  borders: string[];
  area: number;
  flag: string;
  population: number;
  fifa: string;
  continents: string[];
  alpha3Code: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}
export interface CountryResponse {
  borders: string[];
  capital: string[];
  cca3: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  region: string;
  subregion: string;
  tld: string[];
}
