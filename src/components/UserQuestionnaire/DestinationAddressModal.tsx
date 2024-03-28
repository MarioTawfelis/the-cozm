import { useState, useEffect } from "react";
import { CompanyAddress, CountryData } from "../../types";
import countryService from "../../services/countries";
import addressService from "../../services/addresses";
import { useDebounce } from 'use-debounce';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: auto;
  min-width: 800px;
  max-width: 70%;
  z-index: 1001;
`;

const FormTitle = styled.h2`
  text-align: left;
  margin-bottom: 32px;
  color: #000;
`;

const FormFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 24px 0;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 
    "companyName country"
    "locations locations" 
    "streetNumber streetName"
    "city postalCode";
    ". buttons";
  grid-gap: 16px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #000;
`;

const FormInput = styled.input`
  display: block;
  width: 80%;
  padding: 12px;
  background-color: white; 
  border: none; 
  border-bottom: 1px solid #CCC;
  margin-bottom: 16px;
  color: #000;
`;

const ButtonsContainer = styled.div`
  grid-area: buttons; 
  display: flex;
  justify-content: right; /* Center buttons horizontally */
`;

const FormButton = styled.button`
  // display: inline-block;
  background-color: #8a2be2;
  color: #FFFFFF;
  border: none;
  padding: 12px 45px;
  margin-right: 30px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #7b29e2;
  }
`;

const SuggestionsContainer = styled.div`
  border: 1px solid #CCC; 
  border-radius: 4px;
  background: white;
  position: absolute; 
  width: 80%
  max-height: 200px;
  overflow-y: auto; 
  z-index: 10; 
`;

const SuggestionItem = styled.div`
  padding: 12px;
  color: black; 
  cursor: pointer; 

  &:hover {
    background-color: #f0f0f0; 
  }
`;


const AddressForm = () => {
  const [companyName, setCompanyName] = useState('');
  // const [countries, setCountries] = useState<CountryData[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [countryInput, setCountryInput] = useState('');
  const [countrySuggestions, setCountrySuggestions] = useState<CountryData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [addresses, setAddresses] = useState<CompanyAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<CompanyAddress | null>(null);
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');


  const [debouncedCountryInput] = useDebounce(countryInput, 500);

  useEffect(() => {
    if (debouncedCountryInput.length > 0) {
      countryService.searchCountries(debouncedCountryInput).then(setCountrySuggestions);
    } else {
      setCountrySuggestions([]);
    }
  }, [debouncedCountryInput]);

  useEffect(() => {
    if (companyName && selectedCountry) {
      addressService.fetchAddresses(companyName, selectedCountry.code).then((addresses) => {
        setAddresses(addresses);
      });
    }
  }, [companyName, selectedCountry]);


  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const address = addresses[parseInt(event.target.value, 10)];
    setSelectedAddress(address);
  }

  useEffect(() => {
    if (selectedAddress !== null) {
      setCompanyName(selectedAddress.companyName)
      setStreetNumber(selectedAddress.streetNumber || '');
      setStreetName(selectedAddress.streetName || '');
      setCity(selectedAddress.city);
      setPostCode(selectedAddress.postCode);
    }

  }, [selectedAddress])

  const handleCountryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryInput(event.target.value);
  };

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country);
    setCountryInput(country.name); // Update the input field to show the selected country's name
    setCountrySuggestions([]); // Clear the suggestions selection
    setIsInputFocused(false); // Hide suggestions after selection
  };


  return (
    <ModalOverlay>
      <ModalContainer>
        <FormFieldset>
          <FormTitle>Destination Company Address</FormTitle>
          <TwoColumnGrid>
            <div style={{ gridArea: 'companyName' }}>
              <FormLabel htmlFor="companyName">Company Name</FormLabel>
              <FormInput
                id="companyName"
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="Enter Company Name"
              />
            </div>

            <div style={{ gridArea: 'locations' }}>
              <FormLabel htmlFor="addressSelect">Locations</FormLabel>
              <FormInput as="select" id="addressSelect" onChange={handleAddressChange}>
                <option value="">Select an Address</option>
                {addresses.map((address, index) => {
                  return (
                    <option key={index} value={index}>
                      {address.companyName}, {address.streetNumber}, {address.streetName}, {address.city}, {address.postCode}
                    </option>
                  )
                })}
              </FormInput>
            </div>

            <div style={{ gridArea: 'streetNumber' }}>
              <FormLabel htmlFor="streetNumber">Street Number</FormLabel>
              <FormInput
                id="streetNumber"
                type="text"
                value={streetNumber}
                onChange={e => setStreetNumber(e.target.value)}
                placeholder="Street Number"
              />

            </div>

            <div style={{ gridArea: 'streetName' }}>
              <FormLabel htmlFor="streetName">Street Name</FormLabel>
              <FormInput
                id="streetName"
                type="text"
                value={streetName}
                onChange={e => setStreetName(e.target.value)}
                placeholder="Street Name"
              />
            </div>

            <div style={{ gridArea: 'city' }}>
              <FormLabel htmlFor="city">City</FormLabel>
              <FormInput
                id="city"
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="City"
              />
            </div>

            <div style={{ gridArea: 'country' }}>
              <FormLabel htmlFor="country">Country</FormLabel>
              <FormInput
                type="text"
                value={countryInput}
                onChange={handleCountryInputChange}
                onFocus={() => setIsInputFocused(true)}
                placeholder="Start typing a country..."
              />
              {countrySuggestions.length > 0 && isInputFocused && (
                <SuggestionsContainer>
                  {countrySuggestions.map((country) => (
                    <SuggestionItem key={country.uuid} onClick={() => handleCountrySelect(country)}>
                      {country.name}
                    </SuggestionItem>
                  ))}
                </SuggestionsContainer>
              )}
            </div>

            <div style={{ gridArea: 'postalCode' }}>
              <FormLabel htmlFor="postCode">Post Code</FormLabel>
              <FormInput
                id="postCode"
                type="text"
                value={postCode}
                onChange={e => setPostCode(e.target.value)}
                placeholder="Post Code"
              />
            </div>
          </TwoColumnGrid>
        </FormFieldset>

        <ButtonsContainer>
          <FormButton type="button" onClick={() => { }}>Close</FormButton>
          <FormButton type="button" onClick={() => { }}>Add More</FormButton>
        </ButtonsContainer>

      </ModalContainer>
    </ModalOverlay>
  );



};

export default AddressForm;

