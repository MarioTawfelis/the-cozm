import { CountryData } from '../types';
import { apiBaseUrl, apiRequestVersion } from '../constants';
import { countries } from '../constants';

const getAllCountries = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/locations/countries/`,{
      method: 'GET',
      headers: {
        'Version': `${apiRequestVersion}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`API response was not ok: : ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return [];
  }
};


// Temporary hack untill I figure out what's wrong with the API endpoint
const searchCountries = async (searchTerm: string): Promise<CountryData []> => {
  return new Promise<CountryData[]>(() => {
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredCountries;
  });
};


export default { 
  getAllCountries,
  searchCountries
};