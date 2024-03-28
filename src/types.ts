export interface StoredAddress {
  city: string;
  country: string;
  house_number: string | null;
  name: string;
  phone: string;
  postal_code: string;
  street_name: string | null;
  website: string;
}

export interface CompanyAddress {
  companyName: string,
  streetName: string,
  streetNumber: string,
  postCode: string,
  city: string,
  country: string
}

export interface CountryData {
  uuid: string, 
  name: string,
  code: string,
}

