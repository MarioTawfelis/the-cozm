import { CountryData } from '../types';
import { apiBaseUrl } from '../constants';
import { countries } from '../constants';

const getAll = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/locations/countries/`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Version': 'CIBT', 
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return [];
  }
};

const searchCountries = (searchTerm: string) => {
  return new Promise<CountryData[]>((resolve) => {
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    resolve(filteredCountries);
  });
};


export default { 
  getAll,
  searchCountries
};