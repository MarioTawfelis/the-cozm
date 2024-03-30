import { apiBaseUrl, apiRequestVersion } from '../constants';
import { StoredAddress, CompanyAddress } from '../types';

const transformAddresses = (address: StoredAddress): CompanyAddress => ({
  companyName: address.name,
  streetName: address.street_name || '',
  streetNumber: address.house_number || '',
  postCode: address.postal_code,
  city: address.city,
  country: address.country,
});

const fetchAddresses = async (country: string, company: string): Promise<CompanyAddress[]> => {
  const encodedCountry = encodeURIComponent(country);
  const encodedCompany = encodeURIComponent(company);

  try {
    const response = await fetch(
      `${apiBaseUrl}/personas/address-search?country=${encodedCountry}&name=${encodedCompany}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Version': `${apiRequestVersion}`, 
        },
      });

      if (!response.ok) {
        throw new Error(`API response was not ok: : ${response.status} ${response.statusText}`);
      }

    const data  = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Data format is incorrect, expected an array of addresses.');
    }

    return data.map(transformAddresses);
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return [];
  }
};

export default { fetchAddresses };