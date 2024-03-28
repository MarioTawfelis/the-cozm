import { apiBaseUrl } from '../constants';
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
  try {
    const response = await fetch(
      `${apiBaseUrl}/personas/address-search?country=${country}&name=${company}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Version': 'CIBT', 
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

    const data  = await response.json();

    return data.map(transformAddresses);
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return [];
  }
};

export default { fetchAddresses };