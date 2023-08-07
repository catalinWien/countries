export interface Configs {
  serverUrl: string;
  worldRegions: Regions[];
  store: string;
  formControlName: FormControls;
  bttnActions: BttnActions;
}

interface Regions {
  name: string;
  value: string;
}

interface FormControls {
  searchByText: string;
  filterByRegion: string;
}

interface BttnActions {
  null: string;
  wentBack: string;
}

export const CONFIGS: Configs = {
  serverUrl: 'https://restcountries.com/v3.1/',
  worldRegions: [
    { name: 'All', value: '' }, 
    { name: 'Africa', value: 'Africa' },
    { name: 'America', value: 'Americas' },
    { name: 'Asia', value: 'Asia' },
    { name: 'Europe', value: 'Europe' },
    { name: 'Oceania', value: 'Oceania' }
  ],
  store: 'countries',
  formControlName: {
    searchByText: 'searchByText',
    filterByRegion: 'filterByRegion'
  },
  bttnActions: {
    null: '',
    wentBack: 'wentBack'
  }
}