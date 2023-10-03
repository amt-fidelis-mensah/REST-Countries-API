export interface Country {
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
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}
